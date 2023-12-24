import { useState, useEffect, useMemo } from "react";
import RecipeList from "./RecipeList";
import IngredientsList from "./IngredientsList";
import Banner from "./Banner";
import IngredientSearch from "./IngredientSearch";

import Recipes from "../data/RecipesInitialLoad.json";
import Ingredients from "../data/Ingredients.json";

import { SearchRecipesByIngredients } from "../utils/RecipeSearch";
import { IngredientExpiration } from "../utils/expiration";
import Modal from "./Modal";
import Cart from "./Cart";
import { useAuthState, useDbData, useDbUpdate } from "../utils/firebase";

import "bootstrap/dist/css/bootstrap.min.css";

const RecipePage = () => {
  const [user] = useAuthState();
  const [recipes, setRecipes] = useState(Recipes);
  const [loadedRecipes, setLoadedRecipes] = useState(null);
  const ingredients = Ingredients;
  const recipeList = Object.entries(recipes).map(([k, v]) => v);

  const [userData] = useDbData(
    user ? `/users/${user.uid}/defaultIngredients` : null
  );
  const [updateUserData] = useDbUpdate(user ? `/users/${user.uid}/` : null);
  const [userFavorite] = useDbData(
    user ? `/users/${user.uid}/favorites` : null
  );

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [urgentIngredients, setUrgentIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [showUrgent, setShowUrgent] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  useEffect(() => {}, [showUrgent]);

  useEffect(() => {
    if (userData) {
      setSelectedIngredients(userData);
      setRecipesToLoadedData();
    }
  }, [userData]);

  useEffect(() => {
    if (selectedIngredients) {
      //reset urgent ingredients when selected ingredients changes
      setUrgentIngredients(
        selectedIngredients.filter(
          (i) =>
            IngredientExpiration(i) === "btn-danger" ||
            IngredientExpiration(i) === "btn-warning"
        )
      );
    }
  }, [selectedIngredients]);

  useEffect(() => {
    if (userFavorite) {
      setFavoriteRecipes(userFavorite);
      //setRecipesToLoadedData();
    }
  }, [userFavorite]);

  const setRecipesToLoadedData = () => {
    if (loadedRecipes != null) {
      setRecipes(loadedRecipes);
    }
  };

  const toggleFavorites = () => {
    resetPageNumber();
    setRecipesToLoadedData();
    setShowFavorites(!showFavorites);
  };

  const addToFavorites = (recipeId) => {
    const recipeName = recipes[recipeId].recipe_name;
    const newFavorite = {
      id: recipeId,
      name: recipeName,
    };
    const updateFavorites = [...favoriteRecipes, newFavorite];
    setFavoriteRecipes(updateFavorites);
    updateUserData({ favorites: updateFavorites });
  };

  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  // const GetRecipeData = () => {
  //   if (loadedRecipes != null) {
  //     //only load once
  //     return;
  //   }
  //   fetch("RecipesLimited.json", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (recipeJson) {
  //       console.log("Fetched recipes");
  //       setLoadedRecipes(recipeJson);
  //     });
  // };
  // useEffect(() => {
  //   GetRecipeData();
  // }, []);

  const removeFromFavorites = (recipeId) => {
    const updateFavorites = favoriteRecipes.filter(
      (recipe) => recipe.id !== recipeId
    );
    setFavoriteRecipes(updateFavorites);
    updateUserData({ favorites: updateFavorites });
  };

  const handleAddIngredient = (ingredient) => {
    setRecipesToLoadedData();
    setSelectedIngredients((prevIngredients) => [
      ...prevIngredients,
      ingredient,
    ]);
    resetPageNumber();
  };

  const resetPageNumber = () => {
    setCurrentPage(1);
  };

  const handleDeleteIngredient = (ingredient) => {
    setRecipesToLoadedData();
    const updatedIngredients = selectedIngredients.filter(
      (item) => item !== ingredient
    );
    setSelectedIngredients(updatedIngredients);
    resetPageNumber();
  };

  const getIngredientNames = (ingredients) => {
    return ingredients.map((ingredient) => ingredient["ingredient-name"]);
  };

  const filteredRecipes = useMemo(() => {
    return SearchRecipesByIngredients(
      recipes,
      showUrgent
        ? urgentIngredients.map((i) => i["ingredient-name"])
        : getIngredientNames(selectedIngredients)
    ).sort((x, y) =>
      /*y.ingredients.filter(id => 
        selectedIngredients.filter(i => 
          i['ingredient-name'] === id && i['expiration-date'] !== undefined
        )
      ).length - x.*/
      y.percent_fulfilled !== x.percent_fulfilled
        ? y.percent_fulfilled - x.percent_fulfilled
        : y.ingredients.length - x.ingredients.length
    );
  }, [recipes, selectedIngredients, showUrgent]);
  //sort first by %fulfilled then by #ingredients.

  const recipesToShow = showFavorites
    ? favoriteRecipes.map((favorite) => recipes[favorite.id])
    : selectedIngredients.length === 0
    ? recipeList
    : filteredRecipes;

  const currentRecipes = useMemo(() => {
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    return recipesToShow.slice(indexOfFirstRecipe, indexOfLastRecipe);
  }, [currentPage, recipesToShow]);

  const totalPages = Math.ceil(recipesToShow.length / recipesPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <Banner />
      <button
        className={`btn ${
          showFavorites ? "btn-primary" : "btn-outline-primary"
        } mt-1 mb-2`}
        onClick={toggleFavorites}
      >
        Show Favorites
      </button>
      <button
        className={`btn ${
          showUrgent ? "btn-primary" : "btn-outline-primary"
        } mt-1 mb-2`}
        onClick={() => setShowUrgent(!showUrgent)}
      >
        Show recipes using urgent ingredients
      </button>
      <IngredientSearch
        ingredientOptions={ingredients}
        selectedIngredients={selectedIngredients}
        onIngredientSelect={handleAddIngredient}
      />
      {/* <button className="btn btn-outline-dark" onClick={openModal}><i className="bi bi-cart4"></i></button> */}
      <Modal open={open} close={closeModal}>
        <Cart selectedRecipe={selectedRecipe} Recipes={recipes} />
      </Modal>
      {showUrgent ? (
        <IngredientsList
          selectedIngredients={urgentIngredients}
          onDeleteIngredient={handleDeleteIngredient}
        />
      ) : (
        <IngredientsList
          selectedIngredients={selectedIngredients}
          onDeleteIngredient={handleDeleteIngredient}
        />
      )}
      <RecipeList
        recipes={currentRecipes}
        setSelectedRecipe={setSelectedRecipe}
        openModal={openModal}
        favoriteRecipes={favoriteRecipes}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
      />
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
              style={{ cursor: "pointer" }}
            >
              Previous
            </a>
          </li>
          <li className={"page-item disabled"}>
            <div className="page-link">
              {totalPages == 0 ? 0 : currentPage} / {totalPages}
            </div>
          </li>
          <li
            className={`page-item ${
              recipesToShow.length / recipesPerPage <= currentPage
                ? "disabled"
                : ""
            }`}
          >
            <a
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{ cursor: "pointer" }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default RecipePage;

import "./ProfilePage.css";
import { useState, useEffect } from "react";
import Ingredients from "../data/Ingredients.json";
import IngredientSearch from "./IngredientSearch";
import CustomDatePicker from "./DatePicker";
import DatePickerGPT from "./DatePicker-chatgpt.Brennan"
import ProfileIngredients from "./ProfileIngredients";
import ColorLegend from "./ColorLegend";
import { useAuthState, useDbUpdate, useDbData } from "../utils/firebase";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [user] = useAuthState();
  const [userFavorites] = useDbData(
    user ? `/users/${user.uid}/favorites` : null
  );

  const ingredients = Ingredients;
  let userGroceries = [];

  const [userData] = useDbData(
    user ? `/users/${user.uid}/defaultIngredients` : null
  );
  if (userData) {
    userGroceries = userData;
  } else {
    userGroceries = [
      {
        "ingredient-name": "salt",
        "expiration-date": "9999-12-31",
      },
    ];
  }
  const [selectedIngredients, setSelectedIngredients] = useState(userGroceries);
  const [selectedDate, setSelectedDate] = useState("9999-12-31");

  //Get the user's default ingredients from the database
  useEffect(() => {
    if (userData) {
      setSelectedIngredients(userData);
    }
  }, [userData]);

  const [updateUserData] = useDbUpdate(user ? `/users/${user.uid}/` : null);

  useEffect(() => {
    //only update user data when selected ingredients is done updating state.
    if (userData !== undefined && selectedIngredients !== userData) {
      updateUserData({
        defaultIngredients: selectedIngredients,
      });
    }
  }, [selectedIngredients]);

  //Add ingredient to the user's default ingredients. If the ingredient already exists, update the expiration date
  //Updates it in the DB as well
  const handleAddIngredient = (ingredient) => {
    const existingIndex = selectedIngredients.findIndex(
      (item) => item["ingredient-name"] === ingredient["ingredient-name"]
    );

    if (existingIndex !== -1) {
      selectedIngredients[existingIndex]["expiration-date"] = selectedDate;
      updateUserData({
        //update db
        defaultIngredients: selectedIngredients,
      });
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  //Remove ingredient from the user's default ingredients
  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients(
      selectedIngredients.filter(
        (item) => item["ingredient-name"] !== ingredient["ingredient-name"]
      )
    );
  };

  const [showFavorites, setShowFavorites] = useState(false);
  const sortedIngredients = selectedIngredients.slice().sort((a, b) => {
    const dateA = new Date(a["expiration-date"]);
    const dateB = new Date(b["expiration-date"]);
    return dateA - dateB;
  });
  const removeFromFavorites = (recipeId) => {
    const updateFavorites = userFavorites.filter(
      (recipe) => recipe.id !== recipeId
    );
    updateUserData({ favorites: updateFavorites });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Profile Page</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4" style={{ cursor: "default" }}>
            <div className="card-body">
              <h3 className="card-title">Select New Ingredients</h3>
              {/* <DatePickerGPT
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />  */}
              <CustomDatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <h6 style={{ fontWeight: "bold" }}>Ingredient Search</h6>
              <IngredientSearch
                ingredientOptions={ingredients}
                selectedIngredients={selectedIngredients}
                onIngredientSelect={(selectedIngredient) =>
                  handleAddIngredient(selectedIngredient)
                }
                expiration={selectedDate}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4" style={{ cursor: "default" }}>
            <div className="card-body">
              <h3 className="card-title">Ingredients List</h3>
              <div>
                {sortedIngredients.map((ingredient, index) => (
                  <ProfileIngredients
                    key={index}
                    ingredient={ingredient}
                    handleRemoveIngredient={handleRemoveIngredient}
                  />
                ))}
              </div>
              <ColorLegend />
            </div>
          </div>
          <div className="card" style={{ cursor: "default" }}>
            <div className="card-body">
              <h3 className="card-title">My Recipes</h3>
              {userFavorites &&
                userFavorites.map((recipe, index) => (
                  <div className="recipe-item" key={index}>
                    <span className="recipe-name">{recipe.name}</span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromFavorites(recipe.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <Link to="/" className="back-button">
            <button className="btn btn-secondary mt-3">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

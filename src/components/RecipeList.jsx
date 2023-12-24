import RecipeCard from "./RecipeCard";
import "./RecipeList.css";

const RecipeList = ({
  recipes,
  setSelectedRecipe,
  openModal,
  favoriteRecipes,
  addToFavorites,
  removeFromFavorites,
}) => (
  <div className="card-list">
    {recipes.map((recipe, index) => (
      <RecipeCard
        key={index}
        recipe={recipe}
        setSelectedRecipe={setSelectedRecipe}
        openModal={openModal}
        favoriteRecipes={favoriteRecipes}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
      />
    ))}
  </div>
);

export default RecipeList;

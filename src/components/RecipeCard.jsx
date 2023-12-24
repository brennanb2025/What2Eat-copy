import "./RecipeCard.css";
const RecipeCard = ({
  recipe,
  setSelectedRecipe,
  openModal,
  favoriteRecipes,
  addToFavorites,
  removeFromFavorites,
}) => {
  if (recipe === undefined) {
    //ensure pre-changed db storage method ok
    return;
  }
  const isFavorited = favoriteRecipes.some(
    (fav) => fav.id === recipe.recipe_id
  );
  return (
    <div
      className="card m-1 p-2"
      onClick={() => {
        setSelectedRecipe(recipe.recipe_id);
        openModal();
      }}
    >
      <div className="card-body">
        <h5 className="card-title">{recipe.recipe_name}</h5>
        <button
          name="favorite"
          className="btn btn-outline-secondary"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the card click event
            if (isFavorited) {
              removeFromFavorites(recipe.recipe_id);
            } else {
              addToFavorites(recipe.recipe_id);
            }
          }}
        >
          {isFavorited ? "★" : "☆"}
        </button>
        <p>
          {recipe.time > 60
            ? `${Math.floor(recipe.time / 60)}h ${recipe.time % 60}m`
            : `${recipe.time} min`}
        </p>
        <ul>
          {recipe.ingredients.slice(0, 7).map((ingredientName, index) => (
            <li key={`${ingredientName}-${index}`}>{ingredientName}</li>
          ))}
          {recipe.ingredients.length > 7 && (
            <li className="see-more" style={{ color: "blue" }}>
              More ingredients...
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RecipeCard;

import "./Cart.css";

const Cart = ({ selectedRecipe, Recipes }) => {
  if (selectedRecipe === undefined) {
    return <h2>No selected recipe</h2>;
  }

  const recipe = Recipes[selectedRecipe];
  return (
    <div>
      <h2>{recipe.recipe_name}</h2>
      <br></br>
      <h4>Ingredients:</h4>
      <ul>
        {recipe.ingredients.map((ingredientName, index) => (
          <li key={`${ingredientName}-${index}`}>{ingredientName}</li>
        ))}
      </ul>
      <h4>Instructions:</h4>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={`${step}-${index}`}>{step}</li>
        ))}
      </ol>

      {recipe.recipe_description && (
        <div>
          <h4>Description:</h4>
          <li>{recipe.recipe_description}</li>
        </div>
      )}
    </div>
  );
};

export default Cart;

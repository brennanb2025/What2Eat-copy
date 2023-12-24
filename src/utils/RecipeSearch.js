//import Recipes from '../data/Recipes.json';

//Returns an array of recipes that contains these ingredients (given by id)
export const SearchRecipesByIngredientIds = (ingredientIds) => {
  const recipeMatches = Recipes.filter(
    (r) =>
      r.ingredient_ids.filter((ing_id) => ingredientIds.includes(ing_id))
        .length > 0
  )
    //Filter recipes, keeping ones who have at least one ingredient id in ingredientIds.
    .map((r) => ({
      matched_ingredients: r.ingredient_ids.filter((id) =>
        ingredientIds.includes(id)
      ),
      ingredient_ids: r.ingredient_ids,
      recipe_id: r.recipe_id,
      recipe_name: r.recipe_name,
      recipe_description: r.recipe_description,
      ingredient_names: r.ingredient_names,
      percent_fulfilled:
        r.ingredient_ids.filter((id) => ingredientIds.includes(id)).length /
        r.ingredient_names.length,
    })); //map recipe --> fulfilled ingredients + other fields + fraction fulfilled.

  return recipeMatches;
};

//Returns an array of recipes that contains these ingredients (given by name)
export const SearchRecipesByIngredients = (recipes, ingredients) => {
  console.log("picks", ingredients);
  console.log("biglist", recipes);
  const recipeMatches = Object.entries(recipes)
    .filter(
      ([id, r]) =>
        r.ingredients.filter((ing_id) => ingredients.includes(ing_id)).length >
        0
    )
    //Filter recipes, keeping ones who have at least one ingredient id in ingredientIds.
    .map(([id, r]) => ({
      matched_ingredients: r.ingredients.filter((i) => ingredients.includes(i)),
      ingredients: r.ingredients,
      recipe_id: id,
      recipe_name: r.recipe_name,
      recipe_description: r.recipe_description,
      time: r.time,
      percent_fulfilled:
        r.ingredients.filter((i) => ingredients.includes(i)).length /
        r.ingredients.length,
      steps: r.steps,
      //"n_steps" : r.n_steps,
      //"tags" : r.tags
    })); //map recipe --> fulfilled ingredients + other fields + fraction fulfilled.
  console.log("reshipee", recipeMatches);
  return recipeMatches;
};

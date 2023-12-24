import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { useState } from "react";
import { useDbData } from "../utils/firebase";
import RecipeCard from "./RecipeCard";
import RecipePage from "./RecipePage";
import App from "../App";

const mockRecipe = {
  "recipe_id": "146",
  "recipe_name": "21  apple pie",
  "recipe_description": "from the zaar adopt-a-recipe program, have not tried it yet, but it sounds very good!",
  "ingredients": [
      "all-purpose flour",
      "salt",
      "unsalted butter",
      "ice water",
      "apples",
      "lemons",
      "dark brown sugar",
      "light brown sugar",
      "southern comfort",
      "cinnamon",
      "egg"
  ],
  "steps": [
      "add the cold butter cubes and , with a pastry blender , blend in the flour until mixture becomes mealy ans butter forms peas-size nuggets plainly visible in the flour",
      "the water should be added to the flour slowly to ensure that only the minimum amount of water is used",
      "do not over-mix the dough",
      "when the dough has been mixed just sufficiently to combine the ingredients , form it into a ball and wrap in a piece of plastic wrap and refrigerate for several hours",
      "to prepare the filling , melt the butter in a large saute pan until it begins to brown",
      "add the sliced apples and cook over medium heat until they begin to soften , about 2 to 3 minutes",
      "in a bowl , combine the lemon juice , sugars , southern comfort , and cinnamon",
      "add this mixture to the apples and cook 2 to 3 minutes over medium-high heat until the apples are completely caramelized and covered with all the sugar",
      "remove filling from the heat and allow to cool",
      "preheat the oven to 375 degrees",
      "when ready to use , remove the dough from the refrigerator , lightly flour a pastry board and a rolling pin , and unwrap the dough",
      "divide the dough into 2 equal pieces and begin to roll out into a circle by rolling evenly outward from the center and turning the dough in small 1 / 8th turns to keep the rolling even",
      "when the dough is rolled out to an even thickness and is about 12 inches in diameter and 1 / 8-inch thick , it is ready to be transferred to a 10-inch pie pan or plate",
      "lightly butter the pie plate , partially roll the dough up on the rolling pin , lift the dough and center it in the pie pan and unroll",
      "roll the second half of the pie dough into a round slightly larger than the pie pan",
      "fill the bottom crust with the cooked apples using a slotted spoon to drain the apples",
      "reserve juices if desired , for sauce",
      "brush an egg wash coating over the lip of the dough",
      "this is where it will be sealed to the top crust",
      "cover the apples with the top half of the pie dough",
      "trim any excess from the top crust before using both hands to crimp the edges of the two crust together to seal",
      "with a sharp knife , make several crosshatch slits in the top crust",
      "brush with the egg wash and bake for 35 to 40 minutes",
      "remove from the oven and cool 20 minutes",
      "serve with vanilla ice cream",
      "reserved juices can be reduced with heavy cream for a sauce for the pie"
  ],
  "time": 171
}

const mockFunction = () => {};
const mockList = [];

describe('jade recipe popup', () => {
    it('should display recipe details when a recipe card is clicked', async () => {
      // note: I tried to only render RecipeCard but that didn't work, 
      // since the modal "takes over" the entire page. so the lowest-level
      // child component is RecipePage.

      // render(<RecipeCard 
      //   recipe={mockRecipe}
      //   setSelectedRecipe={mockFunction}
      //   openModal={mockFunction} //CHANGE
      //   favoriteRecipes={mockList}
      //   addToFavorites={mockFunction}
      //   removeFromFavorites={mockFunction} />);
      render(<RecipePage/>);
      screen.getByText(/apple pie/).click();
      await screen.findByText(/add the sliced apples/);
    });
  });
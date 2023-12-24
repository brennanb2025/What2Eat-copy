import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SearchRecipesByIngredients } from "./RecipeSearch";

const mockRecipeList = {
  0: {
    recipe_id: "0",
    recipe_name: "name 0",
    recipe_description: "description 0",
    ingredients: ["butter", "salt"],
    steps: ["step1", "step2"],
    time: 20,
  },
  1: {
    recipe_id: "1",
    recipe_name: "name 1",
    recipe_description: "description 1",
    ingredients: ["flour", "sugar", "eggs", "milk"],
    steps: ["step1", "step2"],
    time: 30,
  },
  2: {
    recipe_id: "2",
    recipe_name: "name 2",
    recipe_description: "description 2",
    ingredients: ["chicken", "onions", "garlic", "pepper"],
    steps: ["step1", "step2"],
    time: 45,
  },
  3: {
    recipe_id: "3",
    recipe_name: "name 3",
    recipe_description: "description 3",
    ingredients: ["potatoes", "salt", "olive oil", "rosemary"],
    steps: ["step1", "step2"],
    time: 40,
  },
  4: {
    recipe_id: "4",
    recipe_name: "name 4",
    recipe_description: "description 4",
    ingredients: ["tomatoes", "salt", "basil", "mozzarella"],
    steps: ["step1", "step2"],
    time: 25,
  },
};

// dataset designed to fail test
const mockRecipeList2 = {
  11: {
    recipe_id: "11",
    recipe_name: "name 11",
    recipe_description: "description 11",
    ingredients: ["chocolate", "flour", "sugar", "eggs"],
    steps: ["step1", "step2"],
    time: 35,
  },
  12: {
    recipe_id: "12",
    recipe_name: "name 12",
    recipe_description: "description 12",
    ingredients: ["broccoli", "carrots", "onions", "garlic"],
    steps: ["step1", "step2"],
    time: 30,
  },
  13: {
    recipe_id: "13",
    recipe_name: "name 13",
    recipe_description: "description 13",
    ingredients: ["apples", "cinnamon", "sugar", "pie crust"],
    steps: ["step1", "step2"],
    time: 40,
  },
};

// Test cases
describe("test1", () => {
  it('should return recipes containing "salt"', () => {
    const ingredients = ["salt"];
    const result = SearchRecipesByIngredients(mockRecipeList, ingredients);
    console.log(result);
    // otherwise, test will pass b/c forEach doesn't execute
    expect(result).not.toEqual([]);
    result.forEach((r) => {
      expect(r.ingredients).toContain("salt");
    });
  });
});

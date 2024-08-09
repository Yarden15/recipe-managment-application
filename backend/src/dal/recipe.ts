import { Recipe } from "../model/recipeModel";

const recipes: Recipe[] = []
let currentId = 1;

export const getRecipes = () => recipes;
export const addRecipe = (recipe: Omit<Recipe, "id">) => {
  const newRecipe = { id: currentId++, ...recipe };
  recipes.push(newRecipe);
  return newRecipe;
};
export const updateRecipe = (id: number, updatedRecipe: Omit<Recipe, "id">) => {
  const index = recipes.findIndex((r) => r.id === id);
  if (index !== -1) {
    recipes[index] = { id, ...updatedRecipe };
    return recipes[index];
  }
  return null;
};
export const deleteRecipe = (id: number) => {
  const index = recipes.findIndex((r) => r.id === id);
  if (index !== -1) {
    return recipes.splice(index, 1);
  }
  return null;
};

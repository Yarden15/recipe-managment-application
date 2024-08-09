import { Router } from 'express';
import { getRecipes, addRecipe, updateRecipe, deleteRecipe } from './dal/recipe';
import { Recipe } from './model/recipeModel';

const router = Router();

router.get('/recipes', (req, res) => {
  const recipes = getRecipes()
  res.json(recipes);
});

router.post('/recipes', (req, res) => {
  const newRecipe: Recipe = addRecipe(req.body);
  res.status(201).json(newRecipe);
});

router.put('/recipes/:id', (req, res) => {
  const updatedRecipe = updateRecipe(parseInt(req.params.id), req.body);
  if (updatedRecipe) {
    res.json(updatedRecipe);
  } else {
    res.status(404).send('Recipe not found');
  }
});

router.delete('/recipes/:id', (req, res) => {
  const deletedRecipe = deleteRecipe(parseInt(req.params.id));
  if (deletedRecipe) {
    res.status(204).send();
  } else {
    res.status(404).send('Recipe not found');
  }
});

export default router;
import { FunctionComponent } from "react";
import axios from "axios";
import { Recipe } from "../../types";
import { Button } from "@mui/material";

type IProps = {
  recipe: Recipe;
  fetchRecipes: () => Promise<void>;
  setEditingRecipe: (recipe: Recipe | null) => void;
};

const RecipeItem: FunctionComponent<IProps> = ({
  recipe,
  fetchRecipes,
  setEditingRecipe,
}) => {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/api/recipes/${recipe.id}`);
    fetchRecipes();
  };

  const handleEdit = (recipe: Recipe) => {
    console.log(recipe);
    setEditingRecipe(recipe);
  };

  return (
    <div>
      <h3>{recipe.title}</h3>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Steps: {recipe.steps}</p>
      <Button variant="outlined" onClick={() => handleEdit(recipe)}>
        Edit
      </Button>
      <Button variant="outlined" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default RecipeItem;

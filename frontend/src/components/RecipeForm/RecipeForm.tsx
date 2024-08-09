import { FunctionComponent, useEffect, useState } from "react";
import { Recipe } from "../../types";
import axios from "axios";
import { Button, Modal, TextField } from "@mui/material";
import { StyledRecipeFormContainer } from "./styled";

type IProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  fetchRecipes: () => Promise<void>;
  editingRecipe: Recipe | null;
  setEditingRecipe: (recipe: Recipe | null) => void;
};

const RecipeForm: FunctionComponent<IProps> = ({
  fetchRecipes,
  editingRecipe,
  setEditingRecipe,
  isOpen,
  setIsOpen,
}) => {

  useEffect(() => {
    if (editingRecipe) {
      setTitle(editingRecipe.title);
      setIngredients(editingRecipe.ingredients);
      setSteps(editingRecipe.steps);
    }
  }, [editingRecipe]);

  const [title, setTitle] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [steps, setSteps] = useState<string>("");
  const handleSubmit = async () => {
    const recipe = {
      title,
      ingredients: ingredients,
      steps: steps,
    };

    if (editingRecipe) {
      await axios.put(
        `http://localhost:3000/api/recipes/${editingRecipe.id}`,
        recipe
      );
      setEditingRecipe(null);
    } else {
      await axios.post("http://localhost:3000/api/recipes", recipe);
    }

    await fetchRecipes();
    setTitle("");
    setIngredients("");
    setSteps("");
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTitle("");
    setIngredients("");
    setSteps("");
    setEditingRecipe(null);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <StyledRecipeFormContainer>
        <TextField
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-field"
        />
        <TextField
          type="text"
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="text-field"
        />
        <TextField
          type="text"
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="text-field"
        />
        <Button onClick={handleSubmit}>
          {editingRecipe ? "Update" : "Add"} Recipe
        </Button>
      </StyledRecipeFormContainer>
    </Modal>
  );
};

export default RecipeForm;

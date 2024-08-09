import { useState, useEffect } from "react";
import axios from "axios";
import RecipeForm from "./components/RecipeForm/RecipeForm";
import RecipeList from "./components/RecipeList/RecipeList";
import { ISearch, Recipe } from "./types";
import { Button } from "@mui/material";
import Search from "./components/Search/Search";
import { TopBarContainer } from "./styled";

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState<ISearch>(null);
  const [sortBy, setSortBy] = useState<"asc" | "desc">('asc');
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

  const fetchRecipes = async () => {
    const response = await axios.get("http://localhost:3000/api/recipes");
    setRecipes(response.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recipe Management</h1>
      <TopBarContainer>
        <Button variant="contained" onClick={() => setFormIsOpen(true)}>
          Add Recipe
        </Button>
        <Search
          filter={search}
          setSearchBy={(searchBy) =>
            searchBy === "none"
              ? setSearch(null)
              : setSearch({ by: searchBy, query: "" })
          }
          setSearchQuery={(query) =>
            setSearch(search ? { ...search, query } : null)
          }
        />
        <Button
          variant="outlined"
          onClick={() => {
            setSortBy((s) => (s !== "asc" ? "asc" : "desc"));
          }}
        >
          Sort By title
        </Button>
      </TopBarContainer>
      <RecipeForm
        fetchRecipes={fetchRecipes}
        editingRecipe={editingRecipe}
        setEditingRecipe={setEditingRecipe}
        isOpen={formIsOpen || editingRecipe !== null}
        setIsOpen={setFormIsOpen}
      />
      <RecipeList
        recipes={recipes}
        fetchRecipes={fetchRecipes}
        setEditingRecipe={setEditingRecipe}
        search={search}
        sortBy={sortBy}
      />
    </div>
  );
};

export default App;

import { FunctionComponent } from "react";
import { ISearch, Recipe } from "../../types";
import RecipeItem from "../RecipeItem/RecipeItem";

type IProps = {
  recipes: Recipe[];
  fetchRecipes: () => Promise<void>;
  setEditingRecipe: (recipe: Recipe | null) => void;
  search: ISearch;
  sortBy: "asc" | "desc" | null;
};

const RecipeList: FunctionComponent<IProps> = ({
  recipes,
  fetchRecipes,
  setEditingRecipe,
  search,
  sortBy,
}) => {
  return (
    <div>
      {recipes
        .filter((recipe) => {
          if (search) {
            if (search.by === "title")
              return recipe.title.toLowerCase().includes(search.query);
            else return recipe.ingredients.toLowerCase().includes(search.query);
          } else return true;
        })
        .sort((a, b) => {
          if (sortBy === "asc") {
            return a.title.localeCompare(b.title);
          } else {
            return b.title.localeCompare(a.title);
          }
        })
        .map((recipe) => (
          <RecipeItem
            key={recipe.id}
            recipe={recipe}
            fetchRecipes={fetchRecipes}
            setEditingRecipe={setEditingRecipe}
          />
        ))}
    </div>
  );
};
export default RecipeList;

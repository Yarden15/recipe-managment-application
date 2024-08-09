import { FunctionComponent } from "react";
import { ISearch } from "../../types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SearchContainer } from "./styled";

type IProps = {
  filter: ISearch;
  setSearchBy: (by: string) => void;
  setSearchQuery: (query: string) => void;
};

const Search: FunctionComponent<IProps> = ({
  filter,
  setSearchBy,
  setSearchQuery,
}) => {
  return (
    <SearchContainer>
      <FormControl>
        <InputLabel>Search By</InputLabel>
        <Select
          value={filter ? filter.by : "none"}
          label="Age"
          onChange={(event) => setSearchBy(event.target.value as string)}
        >
          <MenuItem value={"none"}>None</MenuItem>
          <MenuItem value={"title"}>Title</MenuItem>
          <MenuItem value={"ingredients"}>Ingredients</MenuItem>
        </Select>
      </FormControl>
      {filter && (
        <TextField
          type="text"
          placeholder="Search"
          value={filter ? filter.query : ""}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      )}
    </SearchContainer>
  );
};

export default Search;

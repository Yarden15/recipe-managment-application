export type Recipe = {
  id: number;
  title: string;
  ingredients: string;
  steps: string;
};


export type ISearch = {
  by: string;
  query: string
} | null
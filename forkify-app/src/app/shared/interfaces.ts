export interface Recipe {
  id: string,
  title: string,
  source_url: string,
  image_url: string,
  publisher: string,
  cooking_time: string | number,
  servings: string,
  key:string,
  ingredients: {}[]
}

export interface RecipeResponse {
  status: string,
  results: number
  data : {
    recipes: []
  }
}

export interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}


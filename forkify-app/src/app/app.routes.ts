import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: ()=> import('../app/start-message/start-message.component').then(c => c.StartMessageComponent)
  },
  {
    path: 'search',
    loadComponent: ()=> import('../app/components/pages/search-results/search-results.component').then(c => c.SearchResultsComponent)
  },
  {
    path: 'recipe/:id',
    loadComponent: () => import('../app/components/pages/recipe-details/recipe-details.component').then(c => c.RecipeDetailsComponent)
  },
  {
    path: 'add-recipe',
    loadComponent: () => import('./components/pages/add-recipe/add-recipe.component').then(c => c.AddRecipeComponent)
  }
];

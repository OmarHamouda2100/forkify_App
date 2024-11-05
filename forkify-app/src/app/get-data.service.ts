import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, catchError, Observable, of, switchMap, throwError } from "rxjs";
import { RecipeResponse } from "./shared/interfaces";

@Injectable({
  providedIn: 'root'
})

export class GetDataService {
  #httpClint: HttpClient = inject(HttpClient)
  #searchedWord = new BehaviorSubject<any>('')
  query = this.#searchedWord.asObservable()
  bookmrakedRecipes: any[] = []
  key = '15703102-31e9-448b-9c7f-71ffa3e7d3b4'

  fetchRecipe(id: string): Observable<any> {
    return this.#httpClint.get(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`).pipe(
      catchError((error) => {
        return throwError (() => new Error('Could Not find the recipe, please try again') )
      }))
  }

  setQuery(query: string) {
    this.#searchedWord.next(query)
  }

  getResult(): Observable<any> {
    return this.#searchedWord.pipe(switchMap((query) => {
        const api = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
        return this.#httpClint.get<RecipeResponse>(`${api}?search=${query}&key=${this.key}`).pipe(switchMap((res) => {
          if(res.data.recipes.length === 0) {
            const error = new HttpErrorResponse({
              error: 'No recipes found.',
              status: 404,
              statusText: 'Not Found',
              url: `${api}?search=${query}&key=${this.key}`
          })
          return throwError(() => error)
          }
          return of(res)
        }),
          catchError(error => {
            return throwError (() => new Error('Could Not find the recipe, please try again'))
          })
        );
    }));
}

  postRecipe(recipe: any) {
    const api = 'https://forkify-api.herokuapp.com/api/v2/recipes/'
    return this.#httpClint.post(`${api}?key=${this.key}`, recipe)
  }

  getBookmarked() {
    const bookmarksString = localStorage.getItem('bookmarkedRecipes');
    const bookmarks = bookmarksString ? JSON.parse(bookmarksString) : []
    return this.bookmrakedRecipes = [...bookmarks]
  }

}

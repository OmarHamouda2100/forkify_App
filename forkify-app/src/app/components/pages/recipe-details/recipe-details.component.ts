import { Component, inject, OnInit } from '@angular/core';
import { GetDataService } from '../../../get-data.service';
import { finalize } from 'rxjs';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FractionPipe } from '../../../shared/fraction.pipe';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [
    SpinnerComponent,
    CommonModule,
    FractionPipe,
    NgIf
  ],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit {
  #getDataService: GetDataService = inject(GetDataService)
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  #router: Router = inject(Router)
  recipe: any;
  isLoading: boolean = false
  message = true
  id: any = null
  bookmarked: boolean = false


  ngOnInit(): void {
    this.#activatedRoute.params.subscribe((param) => {
      this.id = param['id']
      this.getRecipe()
    })
  }

  getRecipe() {
    this.isLoading = true
    this.#getDataService.fetchRecipe(this.id).pipe(finalize(() => {
      this.isLoading = false

    })).subscribe({
      next: (res: any) => {
        this.recipe = res.data.recipe
        this.checkIfBookmarked()
      }
    })
  }

  incressServings(serving: number) {
    serving++
    this.recipe.ingredients.forEach((ing: any) => {
      if(ing.quantity === 0) ing.quantity++
      ing.quantity = ing.quantity * serving / this.recipe.servings
    })

    this.recipe.servings = serving
  }

  decressServings(serving: number) {
    if(serving <= 1 ) return

    serving--

    this.recipe.ingredients.forEach((ing: any) => {
        ing.quantity = ing.quantity * serving / this.recipe.servings
    })

    this.recipe.servings = serving
  }

  goBack() {
    this.#router.navigate(['search'])
  }

  bookmark() {
    this.bookmarked = !this.bookmarked
    this.recipe.bookmarked = this.bookmarked

    if(this.bookmarked) {
      this.#saveReciepInLocalstorag(this.recipe)
      this.#getDataService.getBookmarked()
    }else {
      this.#removeFromLocalStorage(this.recipe.id)
      this.#getDataService.getBookmarked()
    }
  }

  checkIfBookmarked() {
    const bookmarkedRecipes = this.#getDataService.getBookmarked()
    this.bookmarked = bookmarkedRecipes.some((bookmarkedRecipe: any) => bookmarkedRecipe.id === this.recipe?.id)
  }

  #saveReciepInLocalstorag(recipe: any) {
    const bookmarkedRecipe = this.#getDataService.getBookmarked()
    bookmarkedRecipe.push(recipe)

    localStorage.setItem('bookmarkedRecipes', JSON.stringify(bookmarkedRecipe))
  }

  #removeFromLocalStorage(id: any) {
    let bookmarkedRecipes = this.#getDataService.getBookmarked()
    bookmarkedRecipes = bookmarkedRecipes.filter((recipe: any) => {
      return recipe.id !== id
    })

    localStorage.setItem('bookmarkedRecipes', JSON.stringify(bookmarkedRecipes))
  }
}

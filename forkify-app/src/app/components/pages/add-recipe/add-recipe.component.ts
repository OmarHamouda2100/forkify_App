import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AddRecipeForm } from './add-recipe-form';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetDataService } from '../../../get-data.service';
import { finalize } from 'rxjs';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SpinnerComponent
  ],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent implements OnInit {
#router: Router = inject(Router)
#getDataService: GetDataService = inject(GetDataService)

@Output() onSendRecipe = new EventEmitter<any>()

addRecipeForm: AddRecipeForm = new AddRecipeForm()
form: any;
isSuccess = false
isLoading = false
message: string = '';

get ingredients() {
  return this.form.get('ingredients') as FormArray
}

ngOnInit(): void {
  this.form = this.addRecipeForm.addRecipeForm()
}

removeIngredient(index: any) {
  this.ingredients.removeAt(index)
}

addIngredient() {
  this.ingredients.push(this.addRecipeForm.createIngredient())
}

onSubmit() {
  this.isLoading = true
  this.#getDataService.postRecipe(this.form.value)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
    next: () => {
      this.onSendRecipe.emit()
      this.isSuccess = true
      this.message= 'Recipe has been uploaded, Thank you for shearing your recipe'
      this.isSuccess = true
    },
    error:(error) => {
      this.message = 'Some thing went wrong, please try again'
      this.isSuccess = true
    }
  })
  this.form.reset()
}

closeWindow() {
  this.#router.navigate(['../'])
}
}

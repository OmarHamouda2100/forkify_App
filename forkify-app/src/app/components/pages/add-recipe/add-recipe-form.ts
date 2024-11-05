import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class AddRecipeForm {
  #fb: FormBuilder = inject(FormBuilder)

  addRecipeForm(): FormGroup {
    return this.#fb.group({
      id:[null],
      title: [null, [Validators.required]],
      source_url: [null, [Validators.required]],
      image_url: [null, [Validators.required]],
      publisher: [null, [Validators.required]],
      cooking_time: [null, [Validators.required]],
      servings: [null, [Validators.required]],
      key:['15703102-31e9-448b-9c7f-71ffa3e7d3b4'],
      ingredients: this.#fb.array([]),
      bookmarked: [true]
    })
  }

  createIngredient() {
    return this.#fb.group({
      quantity: [null, [Validators.required]],
      unit: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
  }
}

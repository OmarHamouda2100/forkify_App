import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetDataService } from '../../get-data.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  #getDataService: GetDataService = inject(GetDataService)
  #router: Router = inject(Router)
  query = ''

  ngOnInit(): void {
    this.#getDataService.getBookmarked()
  }

  get bookmarkedRecipes() {
    return this.#getDataService.bookmrakedRecipes
  }

  onSearch() {
    this.#getDataService.setQuery(this.query)
    this.#router.navigate(['search'])
  }

  addRecipe() {
    this.#router.navigate(['add-recipe'])
  }
}

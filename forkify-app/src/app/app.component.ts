import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GetDataService } from './get-data.service';
import { HeaderComponent } from './components/header/header.component';
import { RecipeDetailsComponent } from './components/pages/recipe-details/recipe-details.component';
import { SearchResultsComponent } from './components/pages/search-results/search-results.component';
import { StartMessageComponent } from "./start-message/start-message.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    RecipeDetailsComponent,
    SearchResultsComponent,
    RouterOutlet,
    StartMessageComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  #getDataService = inject(GetDataService)

}

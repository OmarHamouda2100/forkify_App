import { Component, OnInit, inject } from '@angular/core';
import { GetDataService } from '../../../get-data.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ErrorMessageComponent } from '../../../shared/error-message/error-message.component';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    SpinnerComponent,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ErrorMessageComponent,
    PaginatorModule
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit {
#getDataService: GetDataService = inject(GetDataService)
query = ''
results: any = []
isLoading = false
error = false
errorMessage: any;
currPage: number = 1
rows: number = 10
totalResults: number = 0
paginatedResults: any[] = []


  ngOnInit(): void {
    this.getResult()
  }


  getResult() {
    this.#getDataService.query.subscribe(result =>  {
      this.query = result
      this.fetchResult()
    })
}

fetchResult() {
    this.isLoading = true
    this.error = false
    this.#getDataService.getResult().pipe(
      finalize(() => this.isLoading = false))
    .subscribe({

      next: (res) => {
          this.results = res.data.recipes
          this.totalResults = res.results
          this.paginateResults()
          this.error = false
      },

      error: (err) => {
        this.error = true
        this.errorMessage = err.message
        this.isLoading = false
      }
    })
  }

  paginateResults() {
    const start = (this.currPage - 1 ) * this.rows
    const end = this.currPage * this.rows
    this.paginatedResults = this.results.slice(start, end)
  }


  onPageChange(event: any) {
    this.currPage = event.page + 1
    this.paginateResults()
  }
}

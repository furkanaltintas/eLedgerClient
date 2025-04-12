import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SectionDescriptionComponent } from '../../../layout/section-description/section-description.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from '../../../features/dashboard/paginations/pagination/pagination.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    SectionDescriptionComponent,
    NgxPaginationModule,
    PaginationComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterLink,
    SectionDescriptionComponent,
    NgxPaginationModule,
    PaginationComponent
  ]
})
export class SharedModule { }

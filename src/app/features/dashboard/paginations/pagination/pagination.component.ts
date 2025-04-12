import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgxPaginationModule],
  template: `
    <pagination-controls
      [maxSize]="maxSize"
      [directionLinks]="directionLinks"
      [autoHide]="autoHide"
      (pageChange)="onPageChange($event)"
      previousLabel="Önceki"
      nextLabel="Sonraki">
    </pagination-controls>
  `
})
export class PaginationComponent {
  @Input() maxSize: number = 5;
  @Input() directionLinks: boolean = true;
  @Input() autoHide: boolean = false;
  @Input() currentPage: number = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  onPageChange(event: number) {
    this.pageChange.emit(event);
  }

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-description',
  imports: [],
  templateUrl: './page-description.component.html',
  styleUrl: './page-description.component.css'
})
export class PageDescriptionComponent {
  @Input() pageTitle: string = '';
  @Input() pageDescription: string = '';
}

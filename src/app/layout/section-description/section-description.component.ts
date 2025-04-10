import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-section-description',
  imports: [FormsModule],
  templateUrl: './section-description.component.html',
  styleUrl: './section-description.component.css'
})
export class SectionDescriptionComponent {
  @Input() title: string = '';
  @Input() buttonStatus: boolean = true;
}

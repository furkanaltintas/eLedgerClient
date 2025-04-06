import { Component } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [SearchComponent, HeaderComponent, MenuComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}

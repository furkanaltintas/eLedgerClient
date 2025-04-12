import { Component } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";
import { RouterOutlet } from '@angular/router';
import { PageDescriptionComponent } from "../page-description/page-description.component";

@Component({
  selector: 'app-layout',
  imports: [SearchComponent, HeaderComponent, MenuComponent, RouterOutlet, PageDescriptionComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
 pageTitle: string = 'Admin Paneli';
 pageDescription: string = 'Bu sayfa, sistemin yönetimi için kullanılan admin panelidir.';
}

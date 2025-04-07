import { Component } from '@angular/core';
import { MenuModel } from '../../core/models/menu.model';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  menus: MenuModel[] = [
    {
      title: "Home",
      icon: "",
      url: "/",
      showThisMenuJustAdmin: false,
      subMenus: []
    },
    {
      title: "Users",
      icon: "user",
      url: "/users",
      showThisMenuJustAdmin: true, // Adminin görebileceği sayfalar
      subMenus: []
    },
    {
      title: "Companies",
      icon: "company",
      url: "/companies",
      showThisMenuJustAdmin: true,
      subMenus: []
    }
  ];

  constructor(
    public auth: AuthService
  ) {
    if(!this.auth.user.isAdmin) { // false ise yani admin değilse
      this.menus = this.menus.filter(m => !m.showThisMenuJustAdmin);
    }
  }
}

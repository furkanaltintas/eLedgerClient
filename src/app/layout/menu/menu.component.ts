import { Component } from '@angular/core';
import { MenuModel } from '../../core/models/menu.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isAdmin: boolean = true;
  activeMenu: any = null;
  menus: MenuModel[] = [
    {
      title: "Home",
      icon: "",
      url: "/",
    },
    {
      title: "Users",
      icon: "user",
      url: "/users",
      showThisMenuJustAdmin: true // Adminin görebileceği sayfalar
    },
    {
      title: "Companies",
      icon: "company",
      url: "/companies",
      showThisMenuJustAdmin: true
    },
    {
      title: "Cash Register",
      icon: "cash",
      url: "/cash-registers",
      showThisMenuJustAdmin: true
    },
    {
      title: "Banks",
      icon: "banks",
      url: "/banks",
      showThisMenuJustAdmin: true
    }
  ];

  constructor(
    public auth: AuthService,
    private router: Router
  ) {
    if(!this.auth.user.isAdmin) { // false ise yani admin değilse
      this.menus = this.menus.filter(m => !m.showThisMenuJustAdmin);
    }
  }

  isActive(menu: MenuModel) : boolean {
    return this.router.url === menu.url;
  }
}

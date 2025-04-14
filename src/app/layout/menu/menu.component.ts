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
      title: "Ana Sayfa",
      url: "/",
    },
    {
      title: "Kullanıcılar",
      url: "/users",
      showThisMenuJustAdmin: true // Adminin görebileceği sayfalar
    },
    {
      title: "Şirketler",
      url: "/companies",
      showThisMenuJustAdmin: true
    },
    {
      title: "Kasalar",
      url: "/cash-registers",
      showThisMenuJustAdmin: true
    },
    {
      title: "Bankalar",
      url: "/banks",
      showThisMenuJustAdmin: true
    },
    {
      title: "Cariler",
      url: "/customers",
      showThisMenuJustAdmin: true
    },
    {
      title: "Ürünler",
      url: "/products",
      showThisMenuJustAdmin: true
    },
    {
      title: "Faturalar",
      url: "/invoices",
      showThisMenuJustAdmin: true
    },
    {
      title: "Raporlar",
      url: "",
      noUrl: true,
      showThisMenuJustAdmin: true,
      subMenus: [
        {
          title: "Stok Karlık Raporu",
          url:"/reports/product-profitability-reports",
          showThisMenuJustAdmin: true
        }
      ]
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

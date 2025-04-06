import { Component } from '@angular/core';
import { MenuModel } from '../../models/menu.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  menus: MenuModel[] = [
    {
      title: "Ana Sayfa",
      icon: "",
      url: "/",
      subMenus: []
    },
    {
      title: "Kullanıcılar",
      icon: "user",
      url: "/users",
      subMenus: []
    },
    {
      title: "Giriş Yap",
      icon: "login",
      url: "/login",
      subMenus: []
    }
  ];
}

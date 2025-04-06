import { Component } from '@angular/core';
import { MenuModel } from '../../core/models/menu.model';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
      subMenus: []
    },
    {
      title: "Users",
      icon: "user",
      url: "/users",
      subMenus: []
    },
    {
      title: "Companies",
      icon: "company",
      url: "/companies",
      subMenus: []
    }
  ];
}

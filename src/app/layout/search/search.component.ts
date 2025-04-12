import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  search: string = "";

  constructor(private router: Router) { }

  onSearch() {
    const rawInput = this.search.trim().toLowerCase();

    const normalized = rawInput.replace(/[\s-]+/g, '');

    const routeMap: { [key: string]: string} = {
      'bank': '/banks',
      'banks': '/banks',
      'banka': '/banks',
      'bankalar': '/banks',

      'company': '/companies',
      'companies': '/companies',
      'şirket': '/companies',
      'şirketler': '/companies',
      'sirket': '/companies',
      'sirketler': '/companies',

      'customer': '/customers',
      'customers': '/customers',
      'cari': '/customers',
      'cariler': '/customers',

      'invoice': '/invoices',
      'invoices': '/invoices',
      'fatura': '/invoices',
      'faturalar': '/invoices',

      'product': '/products',
      'products': '/products',
      'ürün': '/products',
      'ürünler': '/products',

      'user': '/users',
      'users': '/users',
      'kullanici': '/users',
      'kullanıcı': '/users',
      'kullanıcılar': '/users',

      'cashregister': '/cash-registers',
      'cashregisters': '/cash-registers',
      'kasa': '/cash-registers',
      'kasalar': '/cash-registers'
    };

    const route = routeMap[normalized];
    if(route) {
      this.router.navigate([route]);
    } else {
      alert('Aradığınız sayfa bulunamadı');
    }
  }
}

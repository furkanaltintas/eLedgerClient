import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit {
  text: string = '';
  path: string = '';

  constructor(private auth: AuthService) { }


  ngOnInit(): void {
    // Kullanıcı oturum açmış mı, ona göre yönlendir
    if(this.auth.isLoggedIn()) {
      this.setNavigation('Dashboard', '/');
    } else {
      this.setNavigation('Login', '/login');
    }
  }

  private setNavigation(text: string, path: string): void {
    this.text = text;
    this.path = path;
  }
}

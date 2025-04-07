import { Component } from '@angular/core';
import { LoginRequest } from '../../../../core/auth/models/auth.model';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model: LoginRequest = new LoginRequest();

  constructor(
    private http: AuthService,
    private router: Router
  ) { }

  login(form: NgForm) {
    if(form.valid) {
      this.http.login(this.model, () => {
        this.router.navigate(['/choose-company']);
      }, () => {
        this.router.navigate(['/login']);
      });
    }
  }

  logout() {
    this.http.logout();
  }
}

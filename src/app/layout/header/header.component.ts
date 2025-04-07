import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { LoginResponse } from '../../core/auth/models/auth.model';
import { HttpService } from '../../core/api/http.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AUTH_CHANGE_COMPANY, TOKEN_KEY } from '../../constants/url-constants';
import { SwalService } from '../../core/swal/swal.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  companyId: string = "";
  companyName : string = "";

  constructor(
    public auth: AuthService,
    private http: HttpService,
    private router: Router,
    private swal: SwalService) {
    console.log(auth.user);
    this.name();
  }

  changeCompany(companyId: string) {
    if(companyId === this.auth.user.companyId) {
      this.swal.callToast("Zaten bu şirket panelindesin", "question");
    } else {
      this.http.post<LoginResponse>(AUTH_CHANGE_COMPANY, {companyId: companyId}, (res) => {
        localStorage.clear();
        localStorage.setItem(TOKEN_KEY, res.value!.token);
        document.location.reload(); // Sayfayı otomatik olarak refresh işlemi yapıyor.
      });
    }
  }

  logout() {
    this.auth.logout();
  }

  name() {
    this.companyName = this.auth.user.companies.find(c => c.Id == this.auth.user.companyId)!.Name;
  }
}

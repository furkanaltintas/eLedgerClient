import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserPipe } from '../../../../pipes/user.pipe';
import { UserModel } from '../../../../models/user.model';
import { HttpService } from '../../../../core/api/http.service';
import { SwalService } from '../../../../core/swal/swal.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,FormsModule, UserPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users : UserModel[] = [];
  search: string = "";

  @ViewChild("createModalCloseBtn") createModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;

  createModel:UserModel = new UserModel();
  updateModel:UserModel = new UserModel();

  constructor(
    private http: HttpService,
    private swal: SwalService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.http.get<UserModel[]>("/Users", (res) => {
      this.users = res.value!;
    })
  }

  get(model: UserModel) {
    this.updateModel = {...model};
  }

  create(form: NgForm) {
    if(form.valid) {
      this.http.post<string>("/Users", this.createModel, (res) => {
        this.swal.callToast(res.value!);
        this.createModel = new UserModel();
        this.createModalCloseBtn?.nativeElement.click();
        this.getAll();
      })
    }
  }

  update(form: NgForm) {
    if(form.valid) {
      if(this.updateModel.password === "") this.updateModel.password = null;

      this.http.post<string>("/Users", this.updateModel, (res) => {
        this.swal.callToast(res.value!);
        this.updateModel = new UserModel();
        this.updateModalCloseBtn?.nativeElement.click();
        this.getAll();
      })
    }
  }

  delete(model: UserModel) {
    this.swal.deleteToast("Kullanıcıyı Sil ?", `${model.fullName} kullanıcısını silmek istiyor musunuz ?`, () => {
      this.http.delete<string>("/Users", {id:model.id}, (res) => {
        this.swal.callToast(res.value!, "info");
        this.getAll();
      })
    })
  }
}

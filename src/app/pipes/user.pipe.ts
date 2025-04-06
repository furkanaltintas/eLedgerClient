import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../models/user.model';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(value: UserModel[], search: string): UserModel[] {
    if(!search) return value;

    return value.filter(v =>
      v.fullName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      v.userName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      v.email.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
}

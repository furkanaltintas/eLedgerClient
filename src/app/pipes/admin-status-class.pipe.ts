import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminStatusClass'
})
export class AdminStatusClassPipe implements PipeTransform {

  transform(isAdmin: boolean): string {
    return isAdmin ? 'text-success' : 'text-danger';
  }
}

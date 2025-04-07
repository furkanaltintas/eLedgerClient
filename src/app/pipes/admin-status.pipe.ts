import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminStatus'
})
export class AdminStatusPipe implements PipeTransform {

  transform(isAdmin: boolean): string {
    return isAdmin  ? 'Yes' : 'No';
  }
}

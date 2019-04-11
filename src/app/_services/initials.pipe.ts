import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let initials = '';
    if (value) {
      const a = value.split(' ');
      initials = a[0].substring(0, 1).toUpperCase();
      if (a.length > 1) {
        initials += a[1].substring(0, 1).toUpperCase();
      }
    }
    return initials;
  }

}

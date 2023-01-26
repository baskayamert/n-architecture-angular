import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'censoredNationalityNo'
})
export class CensoredNationalityNoPipe implements PipeTransform {

  transform(value: string): string {
    let censoredValue = value.substring(0,4);
    censoredValue += "*********"
    return censoredValue;
  }

}

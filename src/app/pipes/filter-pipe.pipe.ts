import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from '../models/patient';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Patient[], filterText: string): Patient[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    return filterText ? value.filter((p:Patient) => p.name.toLocaleLowerCase().indexOf(filterText)!==-1) : value;
  }

}

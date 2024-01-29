import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experiencia'
})
export class ExperienciaPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined) {
      return '';
    }
    return `${value} años de experiencia`;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumFormat',
})
export class EnumFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .toLowerCase()
      .split('_')                                                 // divide por underscore
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitaliza cada palavra
      .join(' ');                                                 // junta com espaço
  }
}

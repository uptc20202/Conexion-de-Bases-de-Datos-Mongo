import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => {
      return (
        (filter.code ? item.code_article.toLowerCase().includes(filter.code.toLowerCase()) : true) &&
        (filter.name ? item.name_article.toLowerCase().includes(filter.name.toLowerCase()) : true) &&
        (filter.category ? item.category.toLowerCase().includes(filter.category.toLowerCase()) : true)
      );
    });
  }
}

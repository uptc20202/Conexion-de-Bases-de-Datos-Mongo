import { Component, Input } from '@angular/core';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';

@Component({
  selector: 'app-targeta-areas',
  templateUrl: './targeta-areas.component.html',
  styleUrls: ['./targeta-areas.component.scss']
})
export class TargetaAreasComponent {
  @Input() backgroundImage: string = '../../../assets/grid_topics/example_grid_1.png';
  @Input() labelText: string = 'MUJER';
  @Input() buttonText: string = 'VER MÁS';

  @Input() height: string = '300px'; // Valor por defecto para la altura
  @Input() width: string = '100%'; // Valor por defecto para el ancho


  articles: any[] = [];

  constructor(private articleService:ArticlesService) { }

  ngOnInit(): void {
    // Obtener todos los artículos
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
    });
  }
}

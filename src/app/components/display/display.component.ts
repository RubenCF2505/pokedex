import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from '../../environments';
import { HeaderComponent } from '../header/header.component';
import { LeftMenuComponent } from '../left-menu/left-menu.component';
import { Pokemon } from '../../pokemon';
import { Data } from '../../data';

/**
 * To Do:
 * Create a select element to show pokemons from different habitats
 * create a select element to choose between different languages
 * Create a differents routes to navigate into side bar menus items
 * Add data to the display like type or id
 */

@Component({
    selector: 'app-display',
    imports: [
        HeaderComponent, LeftMenuComponent
    ],
    templateUrl: './display.component.html',
    styleUrl: './display.component.css'
})
export class DisplayComponent {
  constructor(private router: Router) {}
  url = 'https://pokeapi.co/api/v2/';
  httpClient = inject(HttpClient);
  typeImg = Environment.typeImg;
  urlImg = Environment.urlImg;
  data?: any;
  limit = 20;


  @ViewChild('scrollableDiv', { static: false }) scrollableDiv!: ElementRef;
  ngOnInit(): void {
    this.getData(this.limit);
  }

  getData(limit:number) {
    this.httpClient
      .get(`${this.url}pokemon?limit=${limit}`)
      .subscribe((data: any) => {
        this.data = data.results;
      });
      
  }

  onClick(name:any ) {
    
    this.router.navigate([`pokemon/${name}`]);
  }

  getType() {
    this.data?.results.forEach((pokemon: any) => {
      this.httpClient.get(pokemon.url).subscribe((data: any) => {
        pokemon.types = data.types;
      });
    });
  }
  @HostListener('scroll', ['$event'])
  onDivScroll(event: Event) {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop; // Posición actual del scroll
    const scrollHeight = target.scrollHeight; // Altura total del contenido del div
    const divHeight = target.clientHeight; // Altura visible del div

    // Comprobar si el scroll está cerca del final (menos de 100px para llegar)
    const nearBottom = scrollTop + divHeight >= scrollHeight - 200;

    if (nearBottom ) {
      this.limit += 10;
      this.getData(this.limit); // Llamada para obtener más datos
    }
  }
}

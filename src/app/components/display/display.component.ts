import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../../pokemon';
import { Environment } from '../../environments';
import { HeaderComponent } from '../header/header.component';
import { LeftMenuComponent } from '../left-menu/left-menu.component';
import { fromEvent, map, tap } from 'rxjs';
/**
 * To Do:
 * Create a select element to show pokemons from different habitats
 * create a select element to choose between different languages
 * Create a differents routes to navigate into side bar menus items
 * Add data to the display like type or id
 */

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [HttpClientModule, HeaderComponent, LeftMenuComponent],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent {
  constructor(private router: Router) {}
  url = 'https://pokeapi.co/api/v2/';
  httpClient = inject(HttpClient);
  typeImg = Environment.typeImg;
  urlImg = Environment.urlImg;
  data: any;
  AmountPokemon = 20;
  countPokemon!: number;
  getCount() {
    this.httpClient
      .get(`${this.url}pokemon?limit=100000&offset=0`)
      .subscribe((data: any) => {
        this.countPokemon = data.count;
      });
  }
  @ViewChild('scrollableDiv', { static: false }) scrollableDiv!: ElementRef;
  ngOnInit(): void {
    this.getCount();
    this.getData();
  }

  getData() {
    this.httpClient
      .get(`${this.url}pokemon?limit=${this.AmountPokemon}&offset=0`)
      .subscribe((data: any) => {
        this.data = data.results;
      });
      
  }

  onClick(id: number) {
    this.router.navigate([`pokemon:${id}`]);
  }

  getType() {
    this.data.forEach((pokemon: any) => {
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

    if (nearBottom && this.AmountPokemon < this.countPokemon) {
      this.AmountPokemon += 10; // Incrementar la variable AmountPokemon
      this.getData(); // Llamada para obtener más datos
    }
  }
}

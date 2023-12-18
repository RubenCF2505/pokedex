import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, HostListener, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent {
  constructor(private router: Router) {}
  url = 'https://pokeapi.co/api/v2/';
  httpClient = inject(HttpClient);
  urlImg = '';
  data: any;
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.httpClient
      .get(`${this.url}pokemon?limit=1017&offset=0`)
      .subscribe((data: any ) => {
        this.urlImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`;
        this.data = data.results;
      });
  }

  onClick(id: number) {
    console.log(id);
    this.router.navigate([`pokemon:${id}`]);
  }
}

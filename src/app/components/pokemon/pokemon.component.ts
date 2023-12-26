import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../pokemon';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
})
export class PokemonComponent {
  url = 'https://pokeapi.co/api/v2/';
  urlImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`;
  httpClient = inject(HttpClient);
  id: any = this.route.snapshot.params['id'].replace('pokemon:', '');
  pokemonData: Pokemon | undefined;
  loading: boolean = true;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.timeout();
    this.getInfo(this.id);
  }
  getInfo(id: number) {
    this.httpClient.get(`${this.url}pokemon/${id}`).subscribe((data: any) => {
      this.pokemonData = data;
    });
  }
  pokemonBefore() {
    this.loading = true;
    this.timeout();
    this.id -= 1;
    this.router.navigate([`pokemon:${this.id}`]);
    this.getInfo(this.id);
  }
  pokemonAfter() {
    this.loading = true;
    this.timeout();
    this.id = parseInt(this.id) + 1;

    this.router.navigate([`pokemon:${this.id}`]);
    this.getInfo(this.id);
  }
  timeout() {
    setTimeout(() => {
      this.loading = false;
    }, 800);
  }
}

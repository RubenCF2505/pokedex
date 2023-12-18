import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route: ActivatedRoute) {}
  id = this.route.snapshot.params['id'].replace('pokemon:', '');
  pokemonData: Pokemon | undefined;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getInfo();
    this.httpClient.get("https://pokeapi.co/api/v2/evolution-chain/1/").subscribe((data)=>{
      console.log(data);
      
    })
    
  }
  getInfo() {
    this.httpClient
      .get(`${this.url}pokemon/${this.id}`)
      .subscribe((data: any) => {
        this.pokemonData = data;
      });
  }
}

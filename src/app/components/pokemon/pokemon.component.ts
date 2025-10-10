import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Pokemon } from '../../pokemon';
import { HeaderComponent } from '../header/header.component';
import { Environment } from '../../environments';
import { Specie } from '../../specie';
import { VersioningService } from '../../services/versioning.service';
import { SelectComponent } from '../select/select.component';
import { switchMap } from 'rxjs';
import { EvolutionChain } from '../../evolution';
@Component({
  selector: 'app-pokemon',
  imports: [
    // TODO: `HttpClientModule` should not be imported into a component directly.
    // Please refactor the code to add `provideHttpClient()` call to the provider list in the
    // application bootstrap logic and remove the `HttpClientModule` import from this component.
    HeaderComponent,
    SelectComponent,
    RouterLink,
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
})
export class PokemonComponent {
  url = Environment.ApiUrl;
  urlImg = Environment.urlImg;
  urlType = Environment.typeImg;
  urlSpecies = Environment.urlSpecie;
  httpClient = inject(HttpClient);
  typeList: string[] = [];
  id: any = this.route.snapshot.params['id'].replace('pokemon:', '');
  pokemonData?: Pokemon;
  idOrName!: string;
  textList: string[] = [];
  loading: boolean = true;
  pokemonSpecie?: Specie;
  evolutionChain?: string[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public service: VersioningService
  ) {}
  ngOnInit(): void {
    this.service.versionChange.subscribe(() => {
      this.getText();
    });

    this.route.params.subscribe((params) => {
      this.idOrName = params['id'];
      this.getInfo(this.idOrName);
    });

    this.timeout();
    this.getText();
  }
  ngAfterViewInit() {
    this.getInfo(this.id);
    this.getPokemonType();
  }
  getInfo(idOrName: number | string) {
    this.httpClient
      .get(`${this.url}pokemon/${idOrName}`)
      .subscribe((data: any) => {
        this.pokemonData = data;
        this.typeList = [];
        this.getPokemonType();

        this.httpClient
          .get(`${this.url}pokemon-species/${data.id}`)
          .pipe(
            switchMap((specie: Specie | any) => {
              this.pokemonSpecie = specie;
              return this.httpClient.get(specie?.evolution_chain.url);
            })
          )
          .subscribe((specie: any) => {
            this.evolutionChain = this.getEvolutionChain(specie);
            console.log(this.evolutionChain);

            this.getText();
          });
      });
  }
  onClick(url: string) {
    console.log(url);
    
    this.router.navigate([`pokemon/${this.getPokemonId(url)}`]);
  }
  getPokemonId(url: string) {
    const m = url.match(/\/pokemon-species\/(\d+)(?:\/|$)/);
    return m ? Number(m[1]) : null;
  }

  getText() {
    const entries = this.pokemonSpecie?.flavor_text_entries || [];

    const seen = new Set<string>();

    this.textList = entries

      .filter(
        (entry) =>
          entry.language.name === 'en' &&
          entry.version.name === this.service.versionChange.value
      )
      .map((entry) => entry.flavor_text.replace(/\s+/g, ' ').trim())
      .filter((text) => {
        if (seen.has(text)) return false;
        seen.add(text);
        return true;
      });
  }
  getEvolutionChain(chain: EvolutionChain) {
    const urls: string[] = [];
    let current = chain?.chain;

    while (current) {
      urls.push(current.species.url);
      current = current.evolves_to[0];
    }

    return urls;
  }
  prevPokemon() {
    if (this.pokemonData!.id > 1) {
      this.loading = true;
      this.timeout();

      const prevId = this.pokemonData!.id - 1;

      this.httpClient
        .get(`${this.url}pokemon/${prevId}`)
        .subscribe((data: any) => {
          const prevName = data.name;
          this.router.navigate([`/pokemon/${prevName}`]);
        });
    }
  }

  nextPokemon() {
    this.loading = true;
    this.timeout();

    const nextId = this.pokemonData!.id + 1;

    this.httpClient
      .get(`${this.url}pokemon/${nextId}`)
      .subscribe((data: any) => {
        const nextName = data.name;
        this.router.navigate([`/pokemon/${nextName}`]);
      });
  }

  timeout() {
    setTimeout(() => {
      this.loading = false;
    }, 800);
  }
  getPokemonType() {
    for (let tipo of this.pokemonData?.types ?? []) {
      let cadena = tipo.type.url;
      const partes = cadena.split('/');
      const id = partes[partes.length - 2];

      this.typeList.push(id);
    }
  }
}

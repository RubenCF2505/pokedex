import { Routes } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';

export const routes: Routes = [
  { path: '', component: DisplayComponent },
  { path: ':id', component: PokemonComponent },
];

import { Routes } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { TypesComponent } from './components/types/types.component';

export const routes: Routes = [
  { path: '', component: DisplayComponent },
  { path: ':id', component: PokemonComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path:"types",component:TypesComponent },
];

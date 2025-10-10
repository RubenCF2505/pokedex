export interface EvolutionChain {
  id: number;
  baby_trigger_item: null;
  chain: Chain;
}

export interface Chain {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolveTo[];
  is_baby: boolean;
  species: Species;
}

export interface EvolveTo {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolveTo[]; // Recursivo
  is_baby: boolean;
  species: Species;
}

export interface Species {
  name: string;
  url: string;
}

export interface EvolutionDetail {
  base_form_id: number | null;
  gender: number | null;
  held_item: string | null;
  item: string | null;
  known_move: string | null;
  known_move_type: string | null;
  location: string | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: string | null;
  party_type: string | null;
  region_id: number | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: string | null;
  trigger: {
    name: string;
    url: string;
  };
  turn_upside_down: boolean;
}

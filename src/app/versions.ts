export interface Versions {
  count: number;
  next: string | null;
  previous: string | null;
  results: VersionEntry[];
}

export interface VersionEntry {
  name: string;
  url: string;
}

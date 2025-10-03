export interface Version {
  id: number;
  name: string;
  names: NameEntry[]; // es un array con varios idiomas
  version_group: VersionGroup;
}

export interface NameEntry {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}

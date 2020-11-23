export enum EResourceTypes {
  People = "people",
  Films = "films",
  Planets = "planets",
  Species = "species",
  Starships = "starships",
  Vehicles = "vehicles",
}
export enum EHasResourceNames {
  false = "false",
  true = "true",
  loading = "loading",
}
export interface IValues {
  people: CPerson[];
  planets: CPlanet[];
  films: CFilm[];
  species: CSpecie[];
  starships: CStarship[];
  vehicles: CVehicle[];
  resourceToShow: EResourceTypes;
}
export interface ISwapiGetAll<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IGetList {
  resource: EResourceTypes;
  id: number;
  done: boolean;
  target?: {
    resource: EResourceTypes;
    id: number;
  };
}
export interface ICards {
  cardOpen: boolean;
  url: string;
  id: number;
  hasResourceNames: EHasResourceNames;
}
export interface INamedResource {
  name: string;
  url: string;
  id: number;
  resource: EResourceTypes;
}
export class CNamedResource {
  name: string;
  url: string;
  id: number;
  resource: EResourceTypes;
  constructor(name: string, url: string, id: number, resource: EResourceTypes) {
    this.name = name;
    this.url = url;
    this.id = id;
    this.resource = resource;
  }
}

export interface IPerson extends ICards {
  name: string;
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  skin_color: string;
  species: string[];
  starships: string[];
  vehicles: string[];
}
export class CPerson implements IPerson {
  name: string;
  firstName: string;
  lastName: string;
  url: string;
  id: number;
  birth_year: string;
  eye_color: string;
  films: string[];
  filmsList: CNamedResource[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  homeworldObj: CNamedResource;
  mass: string;
  skin_color: string;
  species: string[];
  speciesList: CNamedResource[];
  starships: string[];
  starshipsList: CNamedResource[];
  vehicles: string[];
  vehiclesList: CNamedResource[];
  cardOpen: boolean;
  hasResourceNames: EHasResourceNames;
  constructor(people: IPerson) {
    this.name = people.name;
    this.firstName = people.name.includes(" ")
      ? people.name.slice(0, people.name.indexOf(" "))
      : people.name;
    this.lastName = people.name.includes(" ")
      ? people.name.slice(people.name.indexOf(" "))
      : "";
    this.id = people.id;
    this.url = people.url;
    this.birth_year = people.birth_year;
    this.eye_color = people.eye_color;
    this.films = people.films;
    this.filmsList = [] as CNamedResource[];
    this.gender = people.gender;
    this.hair_color = people.hair_color;
    this.height = people.height;
    this.homeworld = people.homeworld;
    this.homeworldObj = {} as CNamedResource;
    this.mass = people.mass;
    this.skin_color = people.skin_color;
    this.species = people.species;
    this.speciesList = [] as CNamedResource[];
    this.starships = people.starships;
    this.starshipsList = [] as CNamedResource[];
    this.vehicles = people.vehicles;
    this.vehiclesList = [] as CNamedResource[];
    this.cardOpen = false;
    this.hasResourceNames = EHasResourceNames.false;
  }
}

export interface IPlanets extends ICards {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
}
export class CPlanet implements IPlanets {
  name: string;
  id: number;
  url: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  residentsList: CNamedResource[];
  films: string[];
  filmsList: CNamedResource[];
  cardOpen: boolean;
  hasResourceNames: EHasResourceNames;
  constructor(planet: IPlanets) {
    this.name = planet.name;
    this.id = planet.id;
    this.url = planet.url;
    this.rotation_period = planet.rotation_period;
    this.orbital_period = planet.orbital_period;
    this.diameter = planet.diameter;
    this.climate = planet.climate;
    this.gravity = planet.gravity;
    this.terrain = planet.terrain;
    this.surface_water = planet.surface_water;
    this.population = planet.population;
    this.residents = planet.residents;
    this.residentsList = [] as CNamedResource[];
    this.films = planet.films;
    this.filmsList = [] as CNamedResource[];
    this.cardOpen = false;
    this.hasResourceNames = EHasResourceNames.false;
  }
}

export interface IFilms extends ICards {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
}
export class CFilm implements IFilms {
  id: number;
  url: string;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  charactersList: CNamedResource[];
  planets: string[];
  planetsList: CNamedResource[];
  species: string[];
  speciesList: CNamedResource[];
  starships: string[];
  starshipsList: CNamedResource[];
  vehicles: string[];
  vehiclesList: CNamedResource[];
  cardOpen: boolean;
  hasResourceNames: EHasResourceNames;
  constructor(film: IFilms) {
    this.id = film.id;
    this.url = film.url;
    this.title = film.title;
    this.episode_id = film.episode_id;
    this.opening_crawl = film.opening_crawl;
    this.director = film.director;
    this.producer = film.producer;
    this.release_date = film.release_date;
    this.characters = film.characters;
    this.charactersList = [] as CNamedResource[];
    this.planets = film.planets;
    this.planetsList = [] as CNamedResource[];
    this.species = film.species;
    this.speciesList = [] as CNamedResource[];
    this.starships = film.starships;
    this.starshipsList = [] as CNamedResource[];
    this.vehicles = film.vehicles;
    this.vehiclesList = [] as CNamedResource[];
    this.cardOpen = false;
    this.hasResourceNames = EHasResourceNames.false;
  }
}

export interface ISpecies extends ICards {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  hair_colors: string;
  skin_colors: string;
  eye_colors: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
}
export class CSpecie implements ISpecies {
  name: string;
  id: number;
  url: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  hair_colors: string;
  skin_colors: string;
  eye_colors: string;
  homeworld: string;
  homeworldList: CNamedResource;
  language: string;
  people: string[];
  peopleList: CNamedResource[];
  films: string[];
  filmsList: CNamedResource[];
  cardOpen: boolean;
  hasResourceNames: EHasResourceNames;
  constructor(specie: ISpecies) {
    this.name = specie.name;
    this.id = specie.id;
    this.url = specie.url;
    this.classification = specie.classification;
    this.designation = specie.designation;
    this.average_height = specie.average_height;
    this.average_lifespan = specie.average_lifespan;
    this.hair_colors = specie.hair_colors;
    this.skin_colors = specie.skin_colors;
    this.eye_colors = specie.eye_colors;
    this.homeworld = specie.homeworld;
    this.homeworldList = {} as CNamedResource;
    this.language = specie.language;
    this.people = specie.people;
    this.peopleList = [] as CNamedResource[];
    this.films = specie.films;
    this.filmsList = [] as CNamedResource[];
    this.cardOpen = false;
    this.hasResourceNames = EHasResourceNames.false;
  }
}

export interface IStarships extends ICards {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
}
export class CStarship implements IStarships {
  name: string;
  id: number;
  url: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  pilotsList: CNamedResource[];
  films: string[];
  filmsList: CNamedResource[];
  cardOpen: boolean;
  hasResourceNames: EHasResourceNames;
  constructor(starship: IStarships) {
    this.name = starship.name;
    this.id = starship.id;
    this.url = starship.url;
    this.model = starship.model;
    this.manufacturer = starship.manufacturer;
    this.cost_in_credits = starship.cost_in_credits;
    this.length = starship.length;
    this.max_atmosphering_speed = starship.max_atmosphering_speed;
    this.crew = starship.crew;
    this.passengers = starship.passengers;
    this.cargo_capacity = starship.cargo_capacity;
    this.consumables = starship.consumables;
    this.hyperdrive_rating = starship.hyperdrive_rating;
    this.MGLT = starship.MGLT;
    this.starship_class = starship.starship_class;
    this.pilots = starship.pilots;
    this.pilotsList = [] as CNamedResource[];
    this.films = starship.films;
    this.filmsList = [] as CNamedResource[];
    this.cardOpen = false;
    this.hasResourceNames = EHasResourceNames.false;
  }
}

export interface IVehicles extends ICards {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
}
export class CVehicle implements IVehicles {
  name: string;
  id: number;
  url: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  pilotsList: CNamedResource[];
  films: string[];
  filmsList: CNamedResource[];
  cardOpen: boolean;
  hasResourceNames: EHasResourceNames;
  constructor(vehicle: IVehicles) {
    this.name = vehicle.name;
    this.id = vehicle.id;
    this.url = vehicle.url;
    this.model = vehicle.model;
    this.manufacturer = vehicle.manufacturer;
    this.cost_in_credits = vehicle.cost_in_credits;
    this.length = vehicle.length;
    this.max_atmosphering_speed = vehicle.max_atmosphering_speed;
    this.crew = vehicle.crew;
    this.passengers = vehicle.passengers;
    this.cargo_capacity = vehicle.cargo_capacity;
    this.consumables = vehicle.consumables;
    this.vehicle_class = vehicle.vehicle_class;
    this.pilots = vehicle.pilots;
    this.pilotsList = [] as CNamedResource[];
    this.films = vehicle.films;
    this.filmsList = [] as CNamedResource[];
    this.cardOpen = false;
    this.hasResourceNames = EHasResourceNames.false;
  }
}

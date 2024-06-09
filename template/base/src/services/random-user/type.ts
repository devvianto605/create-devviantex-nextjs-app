export type User = {
    results: UserResult[];
    info: Info;
  }
  
  export type UserResult = {
    gender: string;
    name: Name;
    location: Location;
    email: string;
    login: Login;
    dob: Dob;
    registered: Registered;
    phone: string;
    cell: string;
    id: Id;
    picture: Picture;
    nat: string;
  }
  
  export type Name = {
    title: string;
    first: string;
    last: string;
  }
  
  export type Location = {
    street: Street;
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: Coordinates;
    timezone: Timezone;
  }
  
  export type Street = {
    number: number;
    name: string;
  }
  
  export type Coordinates = {
    latitude: string;
    longitude: string;
  }
  
  export type Timezone = {
    offset: string;
    description: string;
  }
  
  export type Login = {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  }
  
  export type Dob = {
    date: string;
    age: number;
  }
  
  export type Registered = {
    date: string;
    age: number;
  }
  
  export type Id = {
    name: string;
    value: string;
  }
  
  export type Picture = {
    large: string;
    medium: string;
    thumbnail: string;
  }
  
  export type Info = {
    seed: string;
    results: number;
    page: number;
    version: string;
  }
  
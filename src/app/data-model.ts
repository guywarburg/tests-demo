export class Hero {
  id = 0;
  name = '';
}

export class Address {
  street = '';
  city   = '';
  state  = '';
  zip    = '';
}

export const heroes: Hero[] = [
  {
    id: 1,
    name: 'Whirlwind'
  },
  {
    id: 2,
    name: 'Bombastic'
  },
  {
    id: 3,
    name: 'Magneta'
  },
];

export const states = ['CA', 'MD', 'OH', 'VA'];

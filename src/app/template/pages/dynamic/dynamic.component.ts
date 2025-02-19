import { Component } from '@angular/core';
import { Favorites, Person } from '../../interfaces/dynamic.interfaces';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styles: [
  ]
})
export class DynamicComponent {
  public person: Person = {
    name: 'David Ferrer',
    favorites: [
      { id: 1, name: 'Batman' },
      { id: 2, name: 'Spider-Man' }
    ]
  }

  public newGame: string = ''

  constructor() { }

  addGame = () => {
    const newFavorite: Favorites = {
      id: this.person.favorites.length + 1,
      name: this.newGame
    }

    this.person.favorites.push({ ...newFavorite })
    this.newGame = ''
  }

  delete = (index: number) => {
    this.person.favorites.splice(index, 1)
  }

  save = () => {
    console.log('enviado')
  }
}

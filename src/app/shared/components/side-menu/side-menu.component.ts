import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [`li { cursor: pointer; }`]
})
export class SideMenuComponent {

  public reactiveMenu: MenuItem[] = [
    { title: 'Básicos', route: './reactive/basic' },
    { title: 'Dinámicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
    { title: 'Selectors', route: './reactive/selectors' }
  ];

  public authMenu: MenuItem[] = [
    { title: 'Registro', route: './auth' }
  ];

  public templateMenu: MenuItem[] = [
    { title: 'Básicos', route: './template/basics' },
    { title: 'Dinámicos', route: './template/dynamic' },
    { title: 'Switches', route: './template/switches' }
  ]

}

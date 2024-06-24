import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from '../interfaces/menu-item.interface';
import { ModuleEnum } from '../enums/module.enum';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private reactiveMenuItems: MenuItem[] = [
    {
      title: 'Básicos',
      route: '/reactive/basic'
    },
    {
      title: 'Dinámicos',
      route: '/reactive/dynamic'
    },
    {
      title: 'Switches',
      route: '/reactive/switches'
    },
  ];

  public authMenuItems: MenuItem[] = [
    {
      title: 'Registro',
      route: 'auth/sign-up'
    }
  ]

  constructor(private http: HttpClient) { }

  public checkEmail(email: string): Observable<boolean> {
    return this.http.post<boolean>(`https://localhost:7154/check-email?email=${email}`, null);
  }

  public getMenuItemsByModule(module: ModuleEnum): Observable<MenuItem[]> {
    return new Observable<MenuItem[]>((subscriber) => {
      const menuItems: MenuItem[] = module === ModuleEnum.reactive
        ? this.reactiveMenuItems
        : this.authMenuItems;

      subscriber.next(menuItems);
      subscriber.complete();
    });
  }
}

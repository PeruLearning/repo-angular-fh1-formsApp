import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { BackendService } from '../../services/backend.service';
import { ModuleEnum } from '../../enums/module.enum';

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent implements OnInit {
  private _reactiveMenuItems: MenuItem[] = [];
  private _autMenuItems: MenuItem[] = [];

  constructor(private service: BackendService) {}

  public ngOnInit(): void {
    this.service.getMenuItemsByModule(ModuleEnum.reactive).subscribe((items) => {
      this._reactiveMenuItems = items;
    });

    this.service.getMenuItemsByModule(ModuleEnum.auth).subscribe((items) => {
      this._autMenuItems = items;
    });
  }

  public get reactiveMenuItems(): MenuItem[] {
    // return [...this._reactiveMenuItems]; // spread operator sí funciona
    return structuredClone(this._reactiveMenuItems);  // No funciona :(
  }

  public get authMenuItems(): MenuItem[] {
    // return [...this._autMenuItems];  // spread operator sí funciona
    return structuredClone(this._autMenuItems); // No funciona :(
  }

}

import { Injectable } from '@angular/core';
import { AuthService } from '@auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  home: any = [
    {
      titulo: 'Home',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard', icon: 'dashboard'},
        { titulo: 'Perfil', url: '/profile', icon: 'person'},
        { titulo: 'Logout', url: '/login', icon: 'power_settings_new'}
      ]
    }
  ];

  menu: any[] = [];

  constructor(private authService: AuthService) {}

  cargarMenu(): void{
    this.menu = this.authService.menu;
  }
}

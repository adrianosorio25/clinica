import { Component, OnInit } from '@angular/core';
import { Usuario } from '@models/usuario.model';
import { AuthService } from '@auth/service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./header.component.scss']
})
export class UserComponent implements OnInit {

  usuario: Usuario;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as screenfull from 'screenfull';
import { Router } from '@angular/router';
import { AuthService } from '@auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  admin: any;

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  private get screenfull(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }

  constructor(private router: Router, private authService: AuthService) {
    this.admin = this.authService.usuario.role === 'ADMIN_ROLE';
  }

  ngOnInit(): void {}

  buscar( termino: string ): void {
    this.router.navigate(['/busqueda', termino]);
  }

  toggleSideBar(): void {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  // TODO:
  toggleFullscreen(): void {
    if (this.screenfull.isEnabled) {
      this.screenfull.toggle();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { SidebarService } from '@shared/sidebar/service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public sidebar: SidebarService ) { }

  ngOnInit(): void {
    this.sidebar.cargarMenu();
  }

}

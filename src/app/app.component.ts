import { Component, OnInit,ViewChild } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { MatSidenav } from '@angular/material';
import { SidebarService } from './services/sidebar/sidebar.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sidebarService: SidebarService
  public currentUrl: string;
  @ViewChild('sidenav') public sidenav: MatSidenav;
  public isConnected :boolean = false;
  
  constructor(public electronService: ElectronService, private sbService: SidebarService, private router: Router) {

    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.childProcess);
    } else {
      console.log('Mode web');
    }

    this.sidebarService = sbService;
    
  }

  ngOnInit() {
    this.sidebarService.setSidenav(this.sidenav);
    }
}

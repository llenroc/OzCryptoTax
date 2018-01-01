import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatListModule,
  MatSortModule,
  MatExpansionModule,
  MatLineModule,
  MatTooltipModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatStepperModule,
} from '@angular/material';


import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DonateComponent } from './pages/donate/donate.component';

//Shared
import { NavbarComponent } from './shared/navbar/navbar.component';
//services
import { SidebarService } from './services/sidebar/sidebar.service';
import { ElectronService } from './providers/electron.service';
import { StyleManagerService } from './services/style-manager/style-manager.service';
import { ThemeStorageService } from './services/theme-storage/theme-storage.service';

//Routing
import { AppRoutingModule } from './app-routing.module';

import { Wallet } from './shared/classes/wallet';
import { HistoryComponent } from './pages/history/history.component';
import { ThemePickerComponent } from './shared/theme-picker/theme-picker';
import { HelpComponent } from './pages/help/help.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    DashboardComponent,
    DonateComponent,
    HistoryComponent,
    ThemePickerComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
    MatExpansionModule,
    MatLineModule,
    MatTooltipModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    ReactiveFormsModule,
  ],
  providers: [
    ElectronService,
    SidebarService,
    StyleManagerService,
    ThemeStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
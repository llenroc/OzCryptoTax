import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  MatSnackBarModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatStepperModule,
  MatSelectModule,
  MatTableModule,
} from '@angular/material';

//Pages
import { AppComponent } from './app.component';

//Pages
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { ProCalculatorComponent } from './pages/pro-calculator/pro-calculator.component';
import { DonateComponent } from './pages/donate/donate.component';
import { HistoryComponent } from './pages/history/history.component';
import { HelpComponent } from './pages/help/help.component';

//Shared
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ThemePickerComponent } from './shared/theme-picker/theme-picker';

//Services
import { SidebarService } from './services/sidebar/sidebar.service';
import { ElectronService } from './providers/electron.service';
import { StyleManagerService } from './services/style-manager/style-manager.service';
import { ThemeStorageService } from './services/theme-storage/theme-storage.service';

//Routing
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    CalculatorComponent,
    ProCalculatorComponent,
    DonateComponent,
    HistoryComponent,
    ThemePickerComponent,
    HelpComponent,
  ],
  entryComponents: [
    EnabledCurrenciesDialogueComponent
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
    MatSnackBarModule,
    MatDialogModule,
    AmChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
  ],
  providers: [
    ElectronService,
    SidebarService,
    StyleManagerService,
    ThemeStorageService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
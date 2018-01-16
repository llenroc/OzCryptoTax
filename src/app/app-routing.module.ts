import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { DonateComponent } from './pages/donate/donate.component';
import { HistoryComponent } from './pages/history/history.component';
import { HelpComponent } from 'app/pages/help/help.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path:'about',
        component: AboutComponent
    },    
    {
        path:'calculator',
        component: CalculatorComponent
    },
    {
        path: 'donate',
        component: DonateComponent
    },
    {
        path: 'history',
        component: HistoryComponent
    },
    {
        path: 'help',
        component: HelpComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/pages/home/home.component';
import { LabComponent } from 'app/pages/lab/lab.component';
import { PageNotFoundComponent } from 'app/pages/page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'lab', component: LabComponent },
  { path: '**', component: PageNotFoundComponent }

]

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

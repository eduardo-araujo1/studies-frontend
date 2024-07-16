import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CarsListComponent } from './components/cars-list/cars-list.component';

export const routes: Routes = [
  
  {path: "", redirectTo: "dashboard", pathMatch: "full"},
  {path: "dashboard", component: DashboardComponent},
  {path: "carros", component: CarsListComponent}
];

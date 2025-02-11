import { Routes } from '@angular/router';
import { BuildingsMainComponent } from './pages/buildings-main/buildings-main.component';
import { EditBuildingComponent } from './core/edit-building/floor-list.component';
import { EditBuildingMainComponent } from './pages/edit-building-main/edit-building-main.component';
import { CreateFloorModalComponent } from './modal/add-floor-modal/add-floor-modal.component';

export const routes: Routes = [
{path:'building' , component:BuildingsMainComponent},
{path:'edit/:id' , component:EditBuildingMainComponent},
{path:'edit-modal' , component:CreateFloorModalComponent},
{path:'' , redirectTo:'/building' , pathMatch:'full'},
];

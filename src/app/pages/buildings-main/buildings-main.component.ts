import { Component } from '@angular/core';
import { SidebarComponent } from "../../core/sidebar/sidebar.component";
import { BuildingListComponent } from "../../core/building-list/building-list.component";
import { CreateBuildingModalComponent } from "../../modal/create-building-modal/create-building-modal.component";

@Component({
  selector: 'app-buildings-main',
  imports: [BuildingListComponent, CreateBuildingModalComponent],
  templateUrl: './buildings-main.component.html',
  styleUrl: './buildings-main.component.css'
})
export class BuildingsMainComponent {

}

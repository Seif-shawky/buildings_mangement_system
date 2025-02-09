import { Component } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CreateBuildingModalComponent } from "./create-building-modal/create-building-modal.component";
import { BuildingListComponent } from "./building-list/building-list.component";

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, CreateBuildingModalComponent, BuildingListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'building-management';
}

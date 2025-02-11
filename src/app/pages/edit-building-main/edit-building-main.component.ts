import { Component } from '@angular/core';
import { EditBuildingComponent } from "../../core/edit-building/floor-list.component";
import { building, Floor } from '../../_models/buildings';
import { CreateFloorModalComponent } from "../../modal/add-floor-modal/add-floor-modal.component";

@Component({
  selector: 'app-edit-building-main',
  imports: [EditBuildingComponent, CreateFloorModalComponent],
  templateUrl: './edit-building-main.component.html',
  styleUrl: './edit-building-main.component.css'
})
export class EditBuildingMainComponent {
  buildings: building = 
    new building(1, 'Building A', 'School X', false, [
      new Floor(1, 'Floor 1', 1),
      new Floor(2, 'Floor 2', 1)
    ])
  
}

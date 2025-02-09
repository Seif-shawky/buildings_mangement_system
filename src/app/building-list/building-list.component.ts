import { NgFor, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { building } from '../_models/buildings';
import { CreateBuildingModalComponent } from "../create-building-modal/create-building-modal.component";
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-building-list',
  imports: [NgFor, CreateBuildingModalComponent , FormsModule],
  templateUrl: './building-list.component.html',
  styleUrl: './building-list.component.css'
})
export class BuildingListComponent {
  allSelected: boolean = false;

add(newBuilding: building) {
    const nextId = this.buildings.length > 0 
      ? Math.max(...this.buildings.map(b => b.id)) + 1 
      : 1;

    this.buildings.push({ ...newBuilding, id: nextId, selected: false });
  }

toggleAll() {
  this.allSelected = !this.allSelected;
    this.buildings.forEach(building => building.selected = this.allSelected);
}
  buildings: building[] = [

  ]

   
  deleteBuilding(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this building?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.buildings = this.buildings.filter(building => building.id !== id);
        Swal.fire('Deleted!', 'The building has been removed.', 'success');
      }
    });

}}

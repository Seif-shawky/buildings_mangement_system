import { NgFor, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { building, Floor } from '../../_models/buildings';
import { CreateBuildingModalComponent } from "../../modal/create-building-modal/create-building-modal.component";
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-building-list',
  imports: [NgFor, CreateBuildingModalComponent , FormsModule ],
  templateUrl: './building-list.component.html',
  styleUrl: './building-list.component.css'
})

export class BuildingListComponent {
    constructor(private router: Router) {}

editbuilding(id: number) {
  console.log("edit")
  this.router.navigateByUrl(`edit/${id}`)
}
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
    new building(1, 'Building A', 'School X', false, [
      new Floor(1, 'Floor 1', 1),
      new Floor(2, 'Floor 2', 1)
    ]),
    new building(2, 'Building B', 'School Y', false, [
      new Floor(3, 'Floor 1', 2),
      new Floor(4, 'Floor 2', 2),
      new Floor(5, 'Floor 3', 2)
    ])
  ];

   
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

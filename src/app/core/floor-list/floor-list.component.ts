import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { building, Floor } from '../../_models/buildings';
import { CreateFloorModalComponent } from "../../modal/add-floor-modal/add-floor-modal.component";

@Component({
  selector: 'app-edit-building',
  standalone: true,
  imports: [FormsModule, CommonModule, CreateFloorModalComponent],
  templateUrl: './floor-list.component.html',
  styleUrl: './floor-list.component.css'
})
export class EditBuildingComponent implements OnInit {
  buildingId: number | null = null;
  building: building | null = null;
  floors: Floor[] = [];
  allSelected: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.buildingId = +params['id'];
      if (this.buildingId) {
        this.loadBuildingData();
        this.loadFloors();
      }
    });
  }

  loadBuildingData() {
    if (this.buildingId) {
      this.apiService.getBuildingById(this.buildingId).subscribe({
        next: (data) => {
          this.building = data;
        },
        error: (err) => console.error("Error loading building:", err)
      });
    }
  }

  loadFloors() {
    if (this.buildingId) {
      this.apiService.getFloorsByBuilding(this.buildingId).subscribe({
        next: (data) => {
          this.floors = data;
        },
        error: (err) => console.error("Error loading floors:", err)
      });
    }
  }

  deleteFloor(id: number) {
    if (confirm("Are you sure you want to delete this floor?")) {
      this.apiService.deleteFloor(id).subscribe({
        next: () => {
          this.floors = this.floors.filter(f => f.id !== id);
        },
        error: (err) => console.error("Error deleting floor:", err)
      });
    }
  }
   onFloorAdded(newFloor: Floor) {
    this.loadFloors(); // Refresh the floor list
  }
}

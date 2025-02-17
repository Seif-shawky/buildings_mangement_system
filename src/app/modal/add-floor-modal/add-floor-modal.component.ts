import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ApiService } from '../../services/api.service';
import { Floor } from '../../_models/buildings';
import { ReusableModalComponent } from "../../core/reusable-modal/reusable-modal.component";

@Component({
  selector: 'app-add-floor-modal',
  templateUrl: './add-floor-modal.component.html',
  styleUrls: ['./add-floor-modal.component.css'],
  imports: [ReusableModalComponent, FormsModule]
})
export class CreateFloorModalComponent implements OnInit {
  @Output() floorAdded: EventEmitter<Floor> = new EventEmitter<Floor>();
  @ViewChild('floorForm') floorForm!: NgForm;

  floorName: string = '';
  buildingId!: number; // Store building ID from URL

  newFloor: Floor = {
    id: 0,
    name: '',
    buildingId: 0 // Will be set dynamically
  };

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Extract building ID from URL
    this.route.params.subscribe(params => {
      this.buildingId = +params['id']; // Convert ID to number
      this.newFloor.buildingId = this.buildingId; // Assign it to the new floor
      console.log("Building ID from URL:", this.buildingId);
    });
  }

  save() {
    console.log('Adding floor to building ID:', this.newFloor.buildingId);
    
    this.apiService.addFloor(this.newFloor).subscribe({
      next: (createdFloor) => {
        this.floorAdded.emit(createdFloor);
        this.resetForm();
      },
      error: (err) => console.error('Error adding floor:', err)
    });
  }

  resetForm() {
    this.floorName = '';
    if (this.floorForm) {
      this.floorForm.resetForm();
    }
  }
}

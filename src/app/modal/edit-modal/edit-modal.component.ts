import { Component, EventEmitter, Input, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { building, School } from '../../_models/buildings';
import { ReusableModalComponent } from "../../core/reusable-modal/reusable-modal.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-modal',
  imports: [ReusableModalComponent, FormsModule, CommonModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css'
})
export class EditBuildingModalComponent implements OnChanges {
  @Input() building!: building; // Selected building data
  @Output() buildingUpdated: EventEmitter<building> = new EventEmitter<building>();
  @ViewChild('buildingForm') buildingForm!: NgForm;

  editedBuilding: building = { id: 0, name: '', schoolId: 0, floors: [] };
  schools: School[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadSchools();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['building'] && this.building) {
      // Create a copy of the building to avoid direct mutation
      this.editedBuilding = { ...this.building };
    }
  }

  loadSchools() {
    this.apiService.getSchools().subscribe({
      next: (data) => (this.schools = data),
      error: (err) => console.error('Error fetching schools:', err)
    });
  }

  save() {
    console.log('Saving changes for:', this.editedBuilding);
    this.apiService.updateBuilding(this.editedBuilding.id, this.editedBuilding).subscribe({
      next: (updatedBuilding) => {
        this.buildingUpdated.emit(updatedBuilding);
        console.log('Updated building emitted');
      },
      error: (err) => console.error('Error updating building:', err)
    });
  }
}

import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { building, School } from '../../_models/buildings';
import { ReusableModalComponent } from "../../core/reusable-modal/reusable-modal.component";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-create-building-modal',
  standalone: true,
  imports: [FormsModule, ReusableModalComponent],
  templateUrl: './create-building-modal.component.html',
  styleUrls: ['./create-building-modal.component.css']
})
export class CreateBuildingModalComponent {
  
  @Output() buildingAdded: EventEmitter<building> = new EventEmitter<building>();
  @ViewChild('buildingForm') buildingForm!: NgForm;

  newBuilding: building = {
    id: 0,
    name: '',
    schoolId: 0,
    floors: []
  };

  schools: School[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadSchools();
  }

  loadSchools() {
    this.apiService.getSchools().subscribe({
      next: (data) => (this.schools = data),
      error: (err) => console.error('Error fetching schools:', err)
    });
  }

  save() {
    console.log('Fetching highest building ID...');
    
    // First, get all buildings to determine the highest ID
    this.apiService.getBuildings().subscribe({
      next: (buildings) => {
        const maxId = buildings.length > 0 ? Math.max(...buildings.map(b => b.id)) : 0;
        this.newBuilding.id = maxId + 1; // Increment the highest ID
        console.log(`New building ID assigned: ${this.newBuilding.id}`);

        // Now create the new building with the updated ID
        this.apiService.addBuilding(this.newBuilding).subscribe({
          next: (createdBuilding) => {
            this.buildingAdded.emit(createdBuilding);
            console.log('Building created and event emitted');
            this.resetForm();
          },
          error: (err) => console.error('Error adding building:', err)
        });
      },
      error: (err) => console.error('Error fetching buildings:', err)
    });
  }

  resetForm() {
    this.newBuilding = { id: 0, name: '', schoolId: 0, floors: [] };
    if (this.buildingForm) {
      this.buildingForm.resetForm();
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { building, Floor, School } from '../../_models/buildings';
import { CreateFloorModalComponent } from "../../modal/add-floor-modal/add-floor-modal.component";
import { EditBuildingComponent } from "../../core/floor-list/floor-list.component";

@Component({
  selector: 'app-edit-building-main',
  imports: [CreateFloorModalComponent, EditBuildingComponent],
  templateUrl: './edit-building-main.component.html',
  styleUrl: './edit-building-main.component.css'
})
export class EditBuildingMainComponent implements OnInit {
  building: building | null = null;  
  school: School | null = null; // Store the school object

  @ViewChild(EditBuildingComponent) editBuildingComponent!: EditBuildingComponent;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Get building ID from URL
    if (id) {
      this.getBuildingById(Number(id));
    }
  }

  getBuildingById(id: number) {
    this.apiService.getBuildingById(id).subscribe({
      next: (data) => {
        this.building = data; 
        this.getSchoolById(data.schoolId); // Fetch the school details
      },
      error: (err) => console.error('Error fetching building:', err)
    });
  }

  getSchoolById(schoolId: number) {
    this.apiService.getSchoolById(schoolId).subscribe({
      next: (schoolData) => {
        this.school = schoolData;
      },
      error: (err) => console.error('Error fetching school:', err)
    });
  }

  onFloorAdded() {
    if (this.editBuildingComponent) {
      this.editBuildingComponent.loadFloors(); // Reload floors from API
    }
  }
}

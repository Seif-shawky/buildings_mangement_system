import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { building, Floor } from '../../_models/buildings';

@Component({
  selector: 'app-edit-building',
  imports: [FormsModule , CommonModule],
  templateUrl: './floor-list.component.html',
  styleUrl: './floor-list.component.css'
})
export class EditBuildingComponent implements OnInit{
deletfloor(arg0: number) {
throw new Error('Method not implemented.');
}

  floors: Floor[] = [    
      new Floor(1, 'Floor 1', 1),
      new Floor(2, 'Floor 2', 1)]
  
 buildingId: number | null = null;
  building: building | null = null;


  constructor(private route: ActivatedRoute) {}

    allSelected: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.buildingId = +params['id']; // Get the building ID from the route parameter
      if (this.buildingId) {
        this.loadBuildingData(); // Load the building data based on the ID
      }
    });
  }

  loadBuildingData() {
    // Simulate fetching building data (replace with actual API call)
    const mockBuildings: building[] = [
    ];

    this.building = mockBuildings.find(b => b.id === this.buildingId) || null;
  }
}

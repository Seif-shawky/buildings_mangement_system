import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { building } from '../../_models/buildings';
import { ReusableModalComponent } from "../../core/reusable-modal/reusable-modal.component";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-create-building-modal',
  imports: [FormsModule, ReusableModalComponent],
  templateUrl: './create-building-modal.component.html',
  styleUrls: ['./create-building-modal.component.css']
})
export class CreateBuildingModalComponent {
  
  @Output() buildingadded: EventEmitter<building> = new EventEmitter<building>();
  @ViewChild('buildingForm') buildingForm!: NgForm;
 constructor(public apiServ: ApiService){}
  newbuilding: building = {
    id: 0, building: '', school: '', selected: false, floors: []
  };

  save() {
    // this.apiServ.addFloor()
    this.buildingadded.emit(this.newbuilding);
    this.resetForm();
  }

  resetForm() {
    this.newbuilding = new building(0, '', '', false);
    if (this.buildingForm) {
      this.buildingForm.resetForm();
    }
  }
}

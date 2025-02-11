import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ReusableModalComponent } from "../../core/reusable-modal/reusable-modal.component";

@Component({
  selector: 'app-add-floor-modal',
  templateUrl: './add-floor-modal.component.html',
  styleUrls: ['./add-floor-modal.component.css'],
  imports: [ReusableModalComponent , FormsModule]
})
export class CreateFloorModalComponent {
  @Output() floorAdded: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('floorForm') floorForm!: NgForm;

  floorName: string = '';

  save() {
    if (this.floorName.trim()) {
      this.floorAdded.emit(this.floorName);
      this.resetForm();
    }
  }

  resetForm() {
    this.floorName = '';
    if (this.floorForm) {
      this.floorForm.resetForm();
    }
  }
}

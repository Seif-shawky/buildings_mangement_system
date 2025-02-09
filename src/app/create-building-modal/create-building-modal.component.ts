import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { building } from '../_models/buildings';

@Component({
  selector: 'app-create-building-modal',
  imports: [FormsModule],
  templateUrl: './create-building-modal.component.html',
  styleUrl: './create-building-modal.component.css'
})
export class CreateBuildingModalComponent {
 @Output() buildingadded : EventEmitter<building>  =  new EventEmitter<building>();
   @ViewChild('buildingForm') buildingForm!: NgForm;

newbuilding  : building ={id:0 , building:'' , school:'' , selected:false}
save() {
    this.buildingadded.emit(this.newbuilding);
    this.resetForm();
    this.closeModal();
  }

  resetForm() {
    this.newbuilding = new building(0, '', '' ,false);
    if (this.buildingForm) {
      this.buildingForm.resetForm();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('createBuildingModal');
    if (modalElement) {
      (modalElement as any).classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.style.display = 'none';

      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
}}}

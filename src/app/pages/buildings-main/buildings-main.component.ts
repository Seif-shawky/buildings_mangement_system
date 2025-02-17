import { Component, ViewChild } from '@angular/core';
import { BuildingListComponent } from "../../core/building-list/building-list.component";
import { CreateBuildingModalComponent } from "../../modal/create-building-modal/create-building-modal.component";
import { TemplatePDFComponent } from "../../core/template-pdf/template-pdf.component";

@Component({
  selector: 'app-buildings-main',
  imports: [BuildingListComponent, CreateBuildingModalComponent , TemplatePDFComponent],
  templateUrl: './buildings-main.component.html',
  styleUrl: './buildings-main.component.css'
})
export class BuildingsMainComponent {
printTable() {
    this.buildingList.printTable();
}
exportToPDF() {
    this.buildingList.exportToPDF();
}
exportToExcel() {
    this.buildingList.exportToExcel();
}
  @ViewChild(BuildingListComponent) buildingList!: BuildingListComponent;
  @ViewChild(TemplatePDFComponent) pdftemp!: TemplatePDFComponent;
}
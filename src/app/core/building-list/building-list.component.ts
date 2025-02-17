import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { building } from '../../_models/buildings';
import { CreateBuildingModalComponent } from "../../modal/create-building-modal/create-building-modal.component";
import { EditBuildingModalComponent } from '../../modal/edit-modal/edit-modal.component';
import * as XLSX from 'xlsx'; // For Excel export
import { saveAs } from 'file-saver'; // For downloading files
import jsPDF from 'jspdf'; // For PDF export
import 'jspdf-autotable'; // For table formatting in PDF
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-building-list',
  imports: [NgFor, FormsModule, CreateBuildingModalComponent, EditBuildingModalComponent],
  templateUrl: './building-list.component.html',
  styleUrl: './building-list.component.css'
})
export class BuildingListComponent implements OnInit {
  
  buildings: building[] = [];
  selectedBuilding!: building;
  currentDate = new Date().toLocaleDateString();


  constructor(private router: Router, private apiService: ApiService) {}
  
  ngOnInit() {
    this.loadBuildings();
  }

  loadBuildings() {
    this.apiService.getBuildings().subscribe({
      next: (data) => {
        console.log("Buildings from API:", data);
        this.buildings = data;
      },
      error: (err) => console.error("Error fetching buildings:", err)
    });
  }

  openFloorPage(id: number) {
    console.log("edit");
    this.router.navigateByUrl(`edit/${id}`);
  }

  openEditModal(building: building) {
    this.selectedBuilding = { ...building };
  }

  updateBuilding(updatedBuilding: building) {
    const index = this.buildings.findIndex(b => b.id === updatedBuilding.id);
    if (index !== -1) {
      this.buildings[index] = updatedBuilding;
    }
  }

  add(newBuilding: building) {
    this.apiService.addBuilding(newBuilding).subscribe({
      next: (addedBuilding) => {
        this.buildings.push(addedBuilding);
      },
      error: (err) => console.error("Error adding building:", err)
    });
  }

  deleteBuilding(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this building?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteBuilding(id).subscribe({
          next: () => {
            this.buildings = this.buildings.filter(building => building.id !== id);
            Swal.fire('Deleted!', 'The building has been removed.', 'success');
          },
          error: (err) => console.error("Error deleting building:", err)
        });
      }
    });
  }

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.buildings.map(b => ({
      ID: b.id,
      Name: b.name,
      School: `School ${b.schoolId}`
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Buildings');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Buildings.xlsx');
  }

exportToPDF() {
    const content = document.getElementById('pdfContent');
    if (!content) {
      console.error("Element with ID 'pdfContent' not found.");
      return;
    }

    // Temporarily show the content
    content.style.display = 'block';

    console.log("Capturing content:", content.innerHTML); // Debugging: Log the content
    html2canvas(content, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // Width of A4 page in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Buildings_Report.pdf');

      // Hide the content again after generating the PDF
      content.style.display = 'none';
    }).catch(error => {
      console.error("Error generating PDF:", error);
      // Ensure the content is hidden even if there's an error
      content.style.display = 'none';
    });
  }

  printTable() {
    const printContent = document.querySelector('.table-responsive')?.innerHTML;
    if (printContent) {
      const newWindow = window.open('', '', 'width=800,height=600');
      newWindow?.document.write('<html><head><title>Print</title></head><body>');
      newWindow?.document.write(printContent);
      newWindow?.document.write('</body></html>');
      newWindow?.document.close();
      newWindow?.print();
    }
  }
}

import { Component, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-template-pdf',
  templateUrl: './template-pdf.component.html',
  styleUrl: './template-pdf.component.css'
})
export class TemplatePDFComponent {
  @Input() buildings: any[] = [];
  @Input() currentDate: string = new Date().toLocaleDateString();

  
}
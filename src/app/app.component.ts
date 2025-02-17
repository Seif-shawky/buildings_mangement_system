import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./core/sidebar/sidebar.component";
import { HeaderComponent } from "./core/header/header.component";
import { BuildingListComponent } from "./core/building-list/building-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, BuildingListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'building-management';
}

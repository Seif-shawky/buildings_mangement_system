import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { building, Floor, School } from '../_models/buildings';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  // Get all schools
  getSchools(): Observable<School[]> {
    return this.http.get<School[]>(`${this.apiUrl}/schools`);
  }

  // Get a school by ID
getSchoolById(id: number): Observable<School> {
  return this.http.get<School>(`${this.apiUrl}/schools/${id}`);
}


  // Get all buildings
  getBuildings(): Observable<building[]> {
    return this.http.get<building[]>(`${this.apiUrl}/buildings`);
  }

  // Get a building by ID
getBuildingById(id: number): Observable<building> {
  return this.http.get<building>(`${this.apiUrl}/buildings/${id}`);
}


  // Get all floors
  getFloors(): Observable<Floor[]> {
    return this.http.get<Floor[]>(`${this.apiUrl}/floors`);
  }

  // Get floors by building ID
  getFloorsByBuilding(buildingId: number): Observable<Floor[]> {
    return this.http.get<Floor[]>(`${this.apiUrl}/floors?buildingId=${buildingId}`);
  }

  // Add a new building
  addBuilding(building: building): Observable<building> {
    return this.http.post<building>(`${this.apiUrl}/buildings`, building);
  }

  // Update an existing building
  updateBuilding(id: number, building: building): Observable<building> {
    return this.http.put<building>(`${this.apiUrl}/buildings/${id}`, building);
  }

  // Delete a building
  deleteBuilding(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/buildings/${id}`);
  }

  // Add a new floor
  addFloor(floor: Floor): Observable<Floor> {
    return this.http.post<Floor>(`${this.apiUrl}/floors`, floor);
  }

  // Update an existing floor
  updateFloor(id: number, floor: Floor): Observable<Floor> {
    return this.http.put<Floor>(`${this.apiUrl}/floors/${id}`, floor);
  }

  // Delete a floor
  deleteFloor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/floors/${id}`);
  }
}

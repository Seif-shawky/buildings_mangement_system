import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Floor } from '../_models/buildings';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getSchools(): Observable<any> {
    return this.http.get(`${this.apiUrl}/schools`);
  }

  getBuildings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/buildings`);
  }

  getFloors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/floors`);
  }

  addBuilding(building: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/buildings`, building);
  }

  addFloor(floor: Floor): Observable<any> {
    return this.http.post(`${this.apiUrl}/floors`, floor);
  }
}

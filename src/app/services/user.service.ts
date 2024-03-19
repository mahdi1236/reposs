import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offre } from 'app/class/offre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  offre: Offre;
  API_URL = 'http://localhost:8081/appel_offre/create';

  constructor(private http: HttpClient) {}

  addoffre(offre: any): Observable<any> {
    return this.http.post(`${this.API_URL}`, offre);
  }
}
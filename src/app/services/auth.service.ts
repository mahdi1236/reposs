import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

Injectable({
  providedIn: 'root'
})
const AUTH_API = 'http://localhost:8081/api/v1/auth/authenticate';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { 
  }
  login(email : string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API ,
      {
        email,
        password,
      },
      httpOptions
    );
  }
  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}

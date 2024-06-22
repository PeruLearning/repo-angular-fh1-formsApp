import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  public checkEmail(email: string): Observable<boolean> {
    return this.http.post<boolean>(`https://localhost:7154/check-email?email=${email}`, null);
  }
}

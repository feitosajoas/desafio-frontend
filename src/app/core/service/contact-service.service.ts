import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactServiceService {
  endpoint = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/contacts`).pipe(take(1));
  }

  create(data: any) {
    return this.http.post(`${this.endpoint}/contacts`, data);
  }

  getById(id: number) {
    return this.http.get<any>(`${this.endpoint}/contacts/${id}`).pipe(take(1));
  }

  update(id: number, data: any) {
    return this.http.put(`${this.endpoint}/contacts/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.endpoint}/contacts/${id}`);
  }
}

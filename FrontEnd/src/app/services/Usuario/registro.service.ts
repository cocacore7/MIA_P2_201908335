import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private URL: String = "http://localhost:5000/usuario";

  constructor(private http: HttpClient) { }

  registrar(users:any) {
    return this.http.post(`${this.URL}/registrar`, users);
  }

  cargar_usrs() {
    return this.http.get(`${this.URL}/cargar/usrs`);
  }
}

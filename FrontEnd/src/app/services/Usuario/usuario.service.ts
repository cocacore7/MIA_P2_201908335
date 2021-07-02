import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  Usuario = ""
  private URL: String = "http://localhost:5000/usuario";

  constructor(private http: HttpClient) { }

  login(user:any) {
    return this.http.post(`${this.URL}/login`, user);
  }

  cargar_usrs() {
    return this.http.get(`${this.URL}/cargar/usrs`);
  }

}

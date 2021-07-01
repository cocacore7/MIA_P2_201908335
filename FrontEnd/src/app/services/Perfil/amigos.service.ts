import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AmigosService {

  private URL: String = "http://localhost:5000/usuario";

  constructor(private http: HttpClient) { }

  cargar_amigo(usr_act:any) {
    return this.http.post(`${this.URL}/cargar/amigo`, usr_act);
  }
}

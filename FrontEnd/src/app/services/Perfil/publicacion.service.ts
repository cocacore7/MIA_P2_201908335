import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private URL: String = "http://localhost:5000/usuario";

  constructor(private http: HttpClient) { }

  crear_publicacion(publicacion:any) {
    return this.http.post(`${this.URL}/crear/publicacion`, publicacion);
  }

  ingresar_tag(publicacion_tag:any) {
    return this.http.post(`${this.URL}/crear/publicacion/tag`, publicacion_tag);
  }

  cargar_publicacion(usr:any) {
    return this.http.post(`${this.URL}/cargar/publicacion`,usr);
  }

  cargar_publicacion_tag(datos:any) {
    return this.http.post(`${this.URL}/cargar/publicacion/tag`,datos);
  }

  cargar_tags(ident:any) {
    return this.http.post(`${this.URL}/cargar/tags`,ident);
  }
}

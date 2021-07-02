import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  private URL: String = "http://localhost:5000/usuario";

  constructor(private http: HttpClient) { }

  crear_solicitud(solicitud:any) {
    return this.http.post(`${this.URL}/crear/solicitud`, solicitud);
  }

  elim_solicitud(solicitud:any) {
    return this.http.post(`${this.URL}/elim/solicitud`, solicitud);
  }

  acep_solicitud(solicitud:any) {
    return this.http.post(`${this.URL}/acept/solicitud`,solicitud);
  }

  cargar_solicitudes(usr_act:any) {
    return this.http.post(`${this.URL}/cargar/solicitudes`,usr_act);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGuard } from '../guards/auth-guard.service';
import { environment } from 'src/environments/environment';
import { IPlataforma } from './tienda.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  urlAPI = environment.urlAPI;
  constructor(private http: HttpClient, private authGuard: AuthGuard) { }

  // JUEGOS
  




  // PLATAFORMAS
  getPlataformas(): Observable<IPlataforma[]> {
    const headers = this.getHeaders();
    return this.http.get<IPlataforma[]>(`${this.urlAPI}plataformas`, { headers });
  }
  // DESARROLLADORAS


  // CATEGORÍAS

  // ----
  getHeaders(): HttpHeaders {
    const token = this.authGuard.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return headers;
  }
}

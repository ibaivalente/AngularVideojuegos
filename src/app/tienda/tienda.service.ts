import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AuthGuard } from '../guards/auth-guard.service';
import { environment } from 'src/environments/environment';
import { IJuego, IPlataforma, ICategoria, IDesarrolladora } from './tienda.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  urlAPI = environment.urlAPI;
  constructor(private http: HttpClient, private authGuard: AuthGuard) { }

  // JUEGOS
  getJuegos(): Observable<IJuego[]> {
    const headers = this.getHeaders();
    return this.http.get<IJuego[]>(`${this.urlAPI}juegos`, { headers });
  }

  addJuego(juego: IJuego): Observable<IJuego> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('Nombre', juego.nombre);
    formData.append('Precio', juego.precio.toString());
    formData.append('Disponible', juego.disponible ? 'true' : 'false');
    formData.append('Lanzamiento', new Date(juego.lanzamiento).toISOString());
    formData.append('Pegi', juego.pegi.toString());
    formData.append('IdCategoria', juego.idCategoria.toString());
    formData.append('IdPlataforma', juego.idPlataforma.toString());
    formData.append('IdDesarrolladora', juego.idDesarrolladora.toString());
  
    formData.forEach((value, key) => {
      console.log(key + " - " + value);
    });
  
    return this.http.post<IJuego>(`${this.urlAPI}juegos`, formData, { headers });
  }
  

  updateJuego(juego: IJuego): Observable<IJuego> {
    const headers = this.getHeaders();
    return this.http.put<IJuego>(`${this.urlAPI}juegos`, juego, {
      headers
    });
  }

  deleteJuego(idJuego: number): Observable<IJuego> {
    const headers = this.getHeaders();
    return this.http.delete<IJuego>(`${this.urlAPI}juegos/${idJuego}`, {
      headers
    });
  }

  // PLATAFORMAS
  getPlataformas(): Observable<IPlataforma[]> {
    const headers = this.getHeaders();
    return this.http.get<IPlataforma[]>(`${this.urlAPI}plataforma`, { headers });
  }

  // DESARROLLADORAS
  getDesarrolladoras(): Observable<IDesarrolladora[]> {
    const headers = this.getHeaders();
    return this.http.get<IDesarrolladora[]>(`${this.urlAPI}desarrolladoras/ObtenerDesarrolladoras`, { headers });
  }

  // CATEGORÍAS
  getCategorias(): Observable<ICategoria[]>{
    const headers = this.getHeaders();
    return this.http.get<ICategoria[]>(`${this.urlAPI}categorias`, {headers});
  }
  // ----
  getHeaders(): HttpHeaders {
    const token = this.authGuard.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return headers;
  }
}

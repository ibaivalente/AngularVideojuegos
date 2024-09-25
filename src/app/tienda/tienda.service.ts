import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGuard } from '../guards/auth-guard.service';
import { environment } from 'src/environments/environment';
import { ICategoria, IDesarrolladora, IPlataforma } from './tienda.interfaces';

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

// Aqui voy a recuperar desarroladoras

getDesarrolladoras(): Observable<IDesarrolladora[]> {
  const headers = this.getHeaders();
  return this.http.get<IDesarrolladora[]>(`${this.urlAPI}Desarrolladoras/ObtenerDesarrolladoras`, { headers });
}

addDesarrolladora(desarrolladora: IDesarrolladora): Observable<IDesarrolladora> {
  const headers = this.getHeaders();
  return this.http.post<IDesarrolladora>(`${this.urlAPI}Desarrolladoras/nuevaDesarroladoraDTO`,
     desarrolladora,{ headers });
}

updateDesarroladora(desarrolladora: IDesarrolladora): Observable<IDesarrolladora> {
  const headers = this.getHeaders();
  return this.http.put<IDesarrolladora>(`${this.urlAPI}Desarrolladoras/HacerMdoificacionNombreUsandoDTO`,
      desarrolladora,      { headers});
}

  // Delete desarrolladora 
  deleteDesarrolladora(id: number): Observable<IDesarrolladora> {
  const headers = this.getHeaders();
  return this.http.delete<IDesarrolladora>(`${this.urlAPI}Desarrolladoras/${id}`,  { headers  });
}

/// Acaba DESARROLLADORAS



  




  // CATEGORÍAS

  getCategorias(): Observable<ICategoria[]>{
    const headers = this.getHeaders();
    return this.http.get<ICategoria[]>(`${this.urlAPI}categorias`, {headers});
  }

  addCategoria(categoria: ICategoria): Observable<ICategoria>{
    const headers = this.getHeaders();
    return this.http.post<ICategoria>(`${this.urlAPI}categorias`, categoria, {headers});
  }

  updateCategoria(categoria: ICategoria): Observable<ICategoria>{
    const headers = this.getHeaders();
    return this.http.put<ICategoria>(`${this.urlAPI}categorias`, categoria, {headers});
  }

  deleteCategoria(id: number): Observable<ICategoria>{
    const headers = this.getHeaders();
    return this.http.delete<ICategoria>(`${this.urlAPI}categorias/${id}`, {headers});
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

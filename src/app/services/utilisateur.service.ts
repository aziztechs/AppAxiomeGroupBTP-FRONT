import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UtilisateurRequest, UtilisateurResponse } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = `${environment.apiUrl}/utilisateurs`;

  constructor(private http: HttpClient) { }

  getAllUtilisateurs(): Observable<UtilisateurResponse[]> {
    return this.http.get<UtilisateurResponse[]>(this.apiUrl);
  }

  getUtilisateurById(id: number): Observable<UtilisateurResponse> {
    return this.http.get<UtilisateurResponse>(`${this.apiUrl}/${id}`);
  }

  getUtilisateursByRole(role: string): Observable<UtilisateurResponse[]> {
    return this.http.get<UtilisateurResponse[]>(`${this.apiUrl}/role/${role}`);
  }

  createUtilisateur(utilisateur: UtilisateurRequest): Observable<UtilisateurResponse> {
    return this.http.post<UtilisateurResponse>(this.apiUrl, utilisateur);
  }

  updateUtilisateur(id: number, utilisateur: UtilisateurRequest): Observable<UtilisateurResponse> {
    return this.http.put<UtilisateurResponse>(`${this.apiUrl}/${id}`, utilisateur);
  }

  deleteUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ChantierRequest, ChantierResponse, ChantierDetailResponse } from '../models/chantier.model';

@Injectable({
  providedIn: 'root'
})
export class ChantierService {
  private apiUrl = `${environment.apiUrl}/chantiers`;

  constructor(private http: HttpClient) { }

  getAllChantiers(): Observable<ChantierResponse[]> {
    return this.http.get<ChantierResponse[]>(this.apiUrl);
  }

  getChantierById(id: number): Observable<ChantierResponse> {
    return this.http.get<ChantierResponse>(`${this.apiUrl}/${id}`);
  }

  getChantierDetails(id: number): Observable<ChantierDetailResponse> {
    return this.http.get<ChantierDetailResponse>(`${this.apiUrl}/${id}/details`);
  }

  getChantiersByStatut(statut: string): Observable<ChantierResponse[]> {
    return this.http.get<ChantierResponse[]>(`${this.apiUrl}/statut/${statut}`);
  }

  getChantiersEnRetard(): Observable<ChantierResponse[]> {
    return this.http.get<ChantierResponse[]>(`${this.apiUrl}/retard`);
  }

  createChantier(chantier: ChantierRequest): Observable<ChantierResponse> {
    return this.http.post<ChantierResponse>(this.apiUrl, chantier);
  }

  updateChantier(id: number, chantier: ChantierRequest): Observable<ChantierResponse> {
    return this.http.put<ChantierResponse>(`${this.apiUrl}/${id}`, chantier);
  }

  deleteChantier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


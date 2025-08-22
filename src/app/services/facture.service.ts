import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FactureRequest, FactureResponse } from '../models/facture.model';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = `${environment.apiUrl}/factures`;

  constructor(private http: HttpClient) { }

  getAllFactures(): Observable<FactureResponse[]> {
    return this.http.get<FactureResponse[]>(this.apiUrl);
  }

  getFactureById(id: number): Observable<FactureResponse> {
    return this.http.get<FactureResponse>(`${this.apiUrl}/${id}`);
  }

  getFacturesByChantier(chantierId: number): Observable<FactureResponse[]> {
    return this.http.get<FactureResponse[]>(`${this.apiUrl}/chantier/${chantierId}`);
  }

  getFacturesByStatut(statut: string): Observable<FactureResponse[]> {
    return this.http.get<FactureResponse[]>(`${this.apiUrl}/statut/${statut}`);
  }

  createFacture(facture: FactureRequest): Observable<FactureResponse> {
    return this.http.post<FactureResponse>(this.apiUrl, facture);
  }

  updateFacture(id: number, facture: FactureRequest): Observable<FactureResponse> {
    return this.http.put<FactureResponse>(`${this.apiUrl}/${id}`, facture);
  }

  deleteFacture(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


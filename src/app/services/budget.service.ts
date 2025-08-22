import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BudgetRequest, BudgetResponse } from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = `${environment.apiUrl}/budgets`;

  constructor(private http: HttpClient) { }

  getAllBudgets(): Observable<BudgetResponse[]> {
    return this.http.get<BudgetResponse[]>(this.apiUrl);
  }

  getBudgetById(id: number): Observable<BudgetResponse> {
    return this.http.get<BudgetResponse>(`${this.apiUrl}/${id}`);
  }

  getBudgetByChantier(chantierId: number): Observable<BudgetResponse> {
    return this.http.get<BudgetResponse>(`${this.apiUrl}/chantier/${chantierId}`);
  }

  createBudget(budget: BudgetRequest): Observable<BudgetResponse> {
    return this.http.post<BudgetResponse>(this.apiUrl, budget);
  }

  updateBudget(id: number, budget: BudgetRequest): Observable<BudgetResponse> {
    return this.http.put<BudgetResponse>(`${this.apiUrl}/${id}`, budget);
  }

  deleteBudget(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


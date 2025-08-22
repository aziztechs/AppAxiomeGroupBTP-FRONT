import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  DashboardSummary, 
  ChantierStatistic, 
  IncidentStatistic, 
  FinancialReport, 
  PerformanceReport,
  RecentActivity
} from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/reporting`;

  constructor(private http: HttpClient) { }

  getDashboardSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.apiUrl}/dashboard-summary`);
  }

  getChantierStatistics(): Observable<ChantierStatistic[]> {
    return this.http.get<ChantierStatistic[]>(`${this.apiUrl}/chantier-statistics`);
  }

  getIncidentStatistics(): Observable<IncidentStatistic[]> {
    return this.http.get<IncidentStatistic[]>(`${this.apiUrl}/incident-statistics`);
  }

  getFinancialReport(): Observable<FinancialReport> {
    return this.http.get<FinancialReport>(`${this.apiUrl}/financial-report`);
  }

  getPerformanceReport(): Observable<PerformanceReport> {
    return this.http.get<PerformanceReport>(`${this.apiUrl}/performance-report`);
  }

  getRecentActivities(limit: number = 10): Observable<RecentActivity[]> {
    return this.http.get<RecentActivity[]>(`${this.apiUrl}/recent-activities?limit=${limit}`);
  }
}


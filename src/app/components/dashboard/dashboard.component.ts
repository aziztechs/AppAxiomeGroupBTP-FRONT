import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardSummary, RecentActivity } from '../../models/dashboard.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: DashboardSummary = {
    totalChantiers: 0,
    chantiersActifs: 0,
    chantiersTermines: 0,
    budgetTotal: 0,
    incidentsOuverts: 0
  };
  
  recentActivities: RecentActivity[] = [];
  loading = true;
  error = false;

  constructor(
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = false;
    
    // Charger les données du tableau de bord
    this.dashboardService.getDashboardSummary().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données du tableau de bord', err);
        this.error = true;
        this.loading = false;
        this.snackBar.open('Erreur lors du chargement des données', 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
    
    // Charger les activités récentes
    this.dashboardService.getRecentActivities(5).subscribe({
      next: (data) => {
        this.recentActivities = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des activités récentes', err);
      }
    });
  }

  getProgressValue(value: number, total: number): number {
    if (total === 0) return 0;
    return (value / total) * 100;
  }
}

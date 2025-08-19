import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stats = {
    totalChantiers: 24,
    chantiersActifs: 8,
    chantiersTermines: 12,
    budgetTotal: 1250000,
    incidentsOuverts: 3
  };

  recentActivities = [
    { action: 'Nouveau chantier créé', user: 'Jean Dupont', time: '2 min ago' },
    { action: 'Document uploadé', user: 'Marie Martin', time: '5 min ago' },
    { action: 'Incident résolu', user: 'Pierre Durand', time: '10 min ago' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getProgressValue(completed: number, total: number): number {
    return total > 0 ? (completed / total) * 100 : 0;
  }
}

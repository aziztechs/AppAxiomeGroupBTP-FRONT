export interface DashboardSummary {
  totalChantiers: number;
  chantiersActifs: number;
  chantiersTermines: number;
  budgetTotal: number;
  incidentsOuverts: number;
}

export interface ChantierStatistic {
  id: number;
  nom: string;
  statut: string;
  progression: number;
  budgetConsomme: number;
  budgetTotal: number;
}

export interface IncidentStatistic {
  id: number;
  titre: string;
  statut: string;
  priorite: string;
  chantierId: number;
  chantierNom: string;
}

export interface FinancialReport {
  budgetTotal: number;
  budgetConsomme: number;
  facturesPendantes: number;
  facturesPayees: number;
  montantFacturesPendantes: number;
  montantFacturesPayees: number;
}

export interface PerformanceReport {
  chantiersEnRetard: number;
  chantiersATemps: number;
  tauxCompletionMoyen: number;
  tauxIncidentsMoyen: number;
}

export interface RecentActivity {
  id: number;
  action: string;
  user: string;
  time: string;
  entityType: string;
  entityId: number;
}


import { UtilisateurResponse } from './utilisateur.model';
import { BudgetResponse } from './budget.model';

export interface ChantierRequest {
  nom: string;
  description?: string;
  adresse: string;
  dateDebut: string;
  dateFin: string;
  statut: string;
  responsableId?: number;
  budgetId?: number;
}

export interface ChantierResponse {
  id: number;
  nom: string;
  description?: string;
  adresse: string;
  dateDebut: string;
  dateFin: string;
  statut: string;
  responsableId?: number;
  budgetId?: number;
  dateCreation: string;
  dateModification: string;
}

export interface ChantierDetailResponse extends ChantierResponse {
  responsable?: UtilisateurResponse;
  budget?: BudgetResponse;
}


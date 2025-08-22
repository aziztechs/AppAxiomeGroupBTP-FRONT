export interface BudgetRequest {
  nom: string;
  description?: string;
  montant: number;
  chantierId?: number;
}

export interface BudgetResponse {
  id: number;
  nom: string;
  description?: string;
  montant: number;
  depense: number;
  chantierId?: number;
  dateCreation: string;
  dateModification: string;
}


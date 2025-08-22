export interface FactureRequest {
  numero: string;
  description?: string;
  date: string;
  montant: number;
  statut: string;
  chantierId: number;
}

export interface FactureResponse {
  id: number;
  numero: string;
  description?: string;
  date: string;
  montant: number;
  statut: string;
  chantierId: number;
  dateCreation: string;
  dateModification: string;
}


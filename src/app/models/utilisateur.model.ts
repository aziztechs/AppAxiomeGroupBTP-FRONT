export interface UtilisateurRequest {
  nom: string;
  prenom: string;
  email: string;
  motDePasse?: string;
  statut: string;
  roles: string[];
}

export interface UtilisateurResponse {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  statut: string;
  roles: string[];
  dateCreation: string;
  dateModification: string;
}


export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface LoginResponse {
  token: string;
  utilisateur: UtilisateurResponse;
}

export interface UtilisateurResponse {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  statut: string;
  roles: string[];
}


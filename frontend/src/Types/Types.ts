// ============================================================
// ENUMS
// ============================================================

export type Role = "ADMIN" | "USER";

export type StatutBien  =
  | "DISPONIBLE"
  | "RESERVE"
  | "VENDU"
  | "LOUE"
  | "" | string;

export type TypeBien =
  | "APPARTEMENT"
  | "TERRAIN"
  | "LOCAL"
  | "VILLA"
  | "" | string;

export type ServiceBien =
  | "LOCATION"
  | "VENTE"
  | "" | string;

export type StatutDemande =
  | "EN_ATTENTE"
  | "CONTACTE"
  | "VISITE_CONFIRMEE"
  | "TERMINEE"
  | "ANNULEE"
  | "" | string;


// ============================================================
// USER
// ============================================================

export interface User {
  id: string;
  firstName : string;
  lastName : string;
  email: string;
  role: Role;
  favoris : Bien[],
  createdAt: string;
  updatedAt: string;
}


// ============================================================
// BIEN
// ============================================================

export interface Bien {
  id: string;

  nom: string;

  description: string;

  prix: number;

  negociable: boolean;

  statut: StatutBien;

  localisation: string;

  superficie: number;

  type: TypeBien;

  service: ServiceBien;

  features: string[];

  images: string[];

  localisationMap: string;

  createdAt: string;

  updatedAt: string;
}


// ============================================================
// DEMANDE DE VISITE
// ============================================================

export interface DemandeVisite {
  id: string;

  nom: string;

  email: string;

  telephone: string;

  dateSouhaitee: string;

  message: string | null;

  statut: StatutDemande;

  bienId: string;

  bien?: Bien;

  createdAt: string;

  updatedAt: string;
}


// ============================================================
// PAGINATION
// ============================================================

export interface Pagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}


// ============================================================
// API RESPONSE - BIENS
// ============================================================

export interface GetBiensResponse {
  success: boolean;

  data: Bien[];

  pagination: Pagination;
}


// ============================================================
// API RESPONSE - BIEN UNIQUE
// ============================================================

export interface GetBienResponse {
  success: boolean;

  data: Bien;
}


// ============================================================
// API RESPONSE - USER
// ============================================================

export interface UserResponse {
  success: boolean;

  data: User;
}

export interface BienFilterType {

  service?: ServiceBien | string;
  type?: TypeBien | string;

  prixMin?: number;
  prixMax?: number;

  search?: string;
}

export interface BiensStats {
    totalBiens: number;
    biensParType: {
        APPARTEMENT: number;
        TERRAIN: number;
        LOCAL: number;
        VILLA: number;
    };
}
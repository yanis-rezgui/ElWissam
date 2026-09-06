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

export interface Testimonial {
    id: string;
    fullName: string;
    message: string;
    rating: number;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface Agency {
  id: number;
  name: string;
  phone: string[];
  email: string | null;
  address: string;
  mapsUrl: string | null;
  socialLinks: SocialLink[] | null;
  createdAt: string;
  updatedAt: string;
}


export type NotificationType =
    | "NEW_VISITE"
    | "NEW_USER"
    | "NEW_BIEN"
    | "STATUS_CHANGED"
    | "NEW_TESTIMONIAL"
    | "SECURITY";


export interface Notification {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    read: boolean;
    userId: string;
    createdAt: string;
}

export interface NotificationsPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface NotificationsStats {
    total: number;
    unread: number;
    read: number;
}
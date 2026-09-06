import { createContext, useContext, useEffect, useState } from "react";
import type { DemandeVisite, Notification } from "../Types/Types";
import { useAuthContext } from "../Contexts/AuthContext";


// =========================================================
// TYPES
// =========================================================

interface BiensDashboardStats {
    total: number;
    parType: {
        APPARTEMENT: number;
        TERRAIN: number;
        LOCAL: number;
        VILLA: number;
    };
    parStatut: {
        DISPONIBLE: number;
        RESERVE: number;
        VENDU: number;
        LOUE: number;
    };
    parService: {
        LOCATION: number;
        VENTE: number;
    };
    valeurCatalogue: number;
    nouveauxCetteSemaine: number;
    topLocalisations: { localisation: string; total: number }[];
}

interface VisitesDashboardStats {
    total: number;
    parStatut: {
        EN_ATTENTE: number;
        CONTACTE: number;
        VISITE_CONFIRMEE: number;
        TERMINEE: number;
        ANNULEE: number;
    };
    nouvellesCetteSemaine: number;
    recentes: DemandeVisite[];
}

interface UsersDashboardStats {
    total: number;
    parRole: {
        ADMIN: number;
        USER: number;
    };
}

interface NotificationsDashboardStats {
    total: number;
    nonLues: number;
    recentes: Notification[];
}

interface TestimonialsDashboardStats {
    total: number;
    inactifs: number;
    noteMoyenne: number;
}

interface DashboardStats {
    biens: BiensDashboardStats;
    visites: VisitesDashboardStats;
    users: UsersDashboardStats;
    notifications: NotificationsDashboardStats;
    testimonials: TestimonialsDashboardStats;
}

interface DashboardContextType {
    dashboardStats: DashboardStats;
    loadingDashboardStats: boolean;
    getDashboardStats: () => Promise<void>;
    msg: string | null;
}


// =========================================================
// VALEURS PAR DEFAUT
// =========================================================

const emptyStats: DashboardStats = {
    biens: {
        total: 0,
        parType: { APPARTEMENT: 0, TERRAIN: 0, LOCAL: 0, VILLA: 0 },
        parStatut: { DISPONIBLE: 0, RESERVE: 0, VENDU: 0, LOUE: 0 },
        parService: { LOCATION: 0, VENTE: 0 },
        valeurCatalogue: 0,
        nouveauxCetteSemaine: 0,
        topLocalisations: [],
    },
    visites: {
        total: 0,
        parStatut: {
            EN_ATTENTE: 0,
            CONTACTE: 0,
            VISITE_CONFIRMEE: 0,
            TERMINEE: 0,
            ANNULEE: 0,
        },
        nouvellesCetteSemaine: 0,
        recentes: [],
    },
    users: {
        total: 0,
        parRole: { ADMIN: 0, USER: 0 },
    },
    notifications: {
        total: 0,
        nonLues: 0,
        recentes: [],
    },
    testimonials: {
        total: 0,
        inactifs: 0,
        noteMoyenne: 0,
    },
};


// =========================================================
// CONTEXT
// =========================================================

const DashboardContext = createContext<DashboardContextType | null>(null);


// =========================================================
// PROVIDER
// =========================================================

export const DashboardProvider = ({
    children
}: {
    children: React.ReactNode
}) => {

    const { token } = useAuthContext();

    const [dashboardStats, setDashboardStats] =
        useState<DashboardStats>(emptyStats);

    const [loadingDashboardStats, setLoadingDashboardStats] =
        useState<boolean>(false);

    const [msg, setMsg] =
        useState<string | null>(null);


    const getDashboardStats = async () => {

        try {

            setLoadingDashboardStats(true);
            setMsg(null);

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/dashboard/`,
                {
                    method: "GET",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await res.json();

            if (!res.ok) {

                setMsg(
                    data.error ||
                    data.message ||
                    "Erreur lors de la récupération du dashboard"
                );

                throw new Error(
                    data.error ||
                    data.message ||
                    "Error in getting dashboard stats"
                );

            }

            console.log("Dashboard stats : ", data.data);

            setDashboardStats(data.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoadingDashboardStats(false);

        }

    };


    useEffect(() => {

        if (!token) return;

        getDashboardStats();

    }, [token]);


    return (
        <DashboardContext.Provider
            value={{
                dashboardStats,
                loadingDashboardStats,
                getDashboardStats,
                msg
            }}
        >
            {children}
        </DashboardContext.Provider>
    );

};


// =========================================================
// HOOK
// =========================================================

export const useDashboardContext = () => {

    const context = useContext(DashboardContext);

    if (!context) {

        throw new Error(
            "Please use useDashboardContext inside the DashboardProvider"
        );

    }

    return context;

};
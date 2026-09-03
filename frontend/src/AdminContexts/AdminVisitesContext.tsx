import { createContext, useContext, useEffect, useState } from "react";
import type { DemandeVisite } from "../Types/Types";
import { useAuthContext } from "../Contexts/AuthContext";


interface VisitesStats {
    total: number;
    enAttente: number;
    contacte: number;
    visiteConfirmee: number;
    terminee: number;
    annulee: number;
}

interface AdminVisitesContextType{

    visites : DemandeVisite[];
    loadingDemandeVsites : boolean;
    getVisites : ()=>Promise<void>;
    search : string;
    setSearch : (s : string)=>void;
    statut : string ;
    setStatut : (s : string)=>void;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    limit: number;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    total: number;
    totalPages: number;

    updateStatut : (id: string, statut : string)=>Promise<void>;
    loadingUpdateStatut : boolean;
    msg : string |null;

    deleteVisite : (id : string) => Promise<void>;
    loadingDeleteVisite: boolean;

    deleteTerminee : ()=>Promise<void>;
    loadingDeleteTerminee: boolean;
    
    deleteAnnulee : ()=>Promise<void>;
    loadingDeleteAnnulee: boolean;
    visitesStats: VisitesStats;
getVisitesStats: () => Promise<void>;
loadingVisitesStats: boolean;

showDeletePop: boolean;
setShowDeletePop: (b: boolean) => void;
visiteDelete: DemandeVisite | null;
setVisiteDelete: (v: DemandeVisite | null) => void;
}


const AdminVisitesContext = createContext<AdminVisitesContextType | null>(null);

export const AdminVisitesProvider = ({children} : {children : React.ReactNode}) => {

    const [visites, setVisites] = useState<DemandeVisite[]>([]);
    const [loadingDemandeVsites, setLoadingDemandeVsites] = useState<boolean>(false);
    const [msg, setMsg] = useState<string | null>(null);

    const {token} = useAuthContext();

    const [search, setSearch] = useState<string>(()=>{

        const saved = localStorage.getItem('search');

        return saved ? JSON.parse(saved) : "";
    });

    const [loadingUpdateStatut, setLoadingUpdateStatut] = useState<boolean>(false);
    const [loadingDeleteVisite, setLoadingDeleteVisite] = useState<boolean>(false);
    const [loadingDeleteTerminee, setLoadingDeleteTerminee] = useState<boolean>(false);
    const [loadingDeleteAnnulee, setLoadingDeleteAnnulee] = useState<boolean>(false);

    const [showDeletePop, setShowDeletePop] = useState(false);
    const [visiteDelete, setVisiteDelete] = useState<DemandeVisite | null>(null);

    useEffect(()=>{
        localStorage.setItem('search', JSON.stringify(search));
    }, [search]);

    const [statut, setStatut] = useState<string>(()=>{
        const saved = localStorage.getItem('statut');

        return saved ? JSON.parse(saved) : "";
    });

    useEffect(()=>{
        localStorage.setItem('statut', JSON.stringify(statut));
    }, [statut]);

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [visitesStats, setVisitesStats] = useState<VisitesStats>({
    total: 0,
    enAttente: 0,
    contacte: 0,
    visiteConfirmee: 0,
    terminee: 0,
    annulee: 0,
});

const [loadingVisitesStats, setLoadingVisitesStats] =
    useState<boolean>(false);

        const getVisites = async() => {

        setLoadingDemandeVsites(true)
         try{
            const params = new URLSearchParams();

            params.append("page", page.toString());
            params.append("limit", limit.toString());

            if(search){
                params.append("search", search)
            }

            if(statut){
                params.append("statut", statut)
            }

           

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/visites?${params.toString()}`, {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in fetching data")
            }

            setVisites(data.data)
            console.log("Biens : ", data.data)
            setTotal(data.pagination.total);
            setTotalPages(data.pagination.totalPages);

            
         }catch(err){
            console.error(err);
         }finally{
            setLoadingDemandeVsites(false)
         }

    }

    const updateStatut = async(id : string, statut : string) => {

        try{
            setMsg(null)
             setLoadingUpdateStatut(true);

             const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/visites/${id}`,{
                method: 'PUT',
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                },
                body : JSON.stringify({statut})
             });

             const data = await res.json();

             if(!res.ok){
                setMsg(data.error || data.message || "Error in updating statut")
                throw new Error(data.error || data.message || "Error in updating statut")
             }

             await getVisites();
        }catch(err){
            console.error(err);
        }finally{
            setLoadingUpdateStatut(false);
        }
    }

    const deleteVisite = async(id : string ) => {

        try{
            setLoadingDeleteVisite(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/visites/${id}`, {
                method : "DELETE",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in deleting a visite")
            }

            await getVisites();
        }catch(err){
            console.error(err);
        }finally{
            setLoadingDeleteVisite(false);
        }
    }



    const deleteTerminee = async() => {

        try{

            setLoadingDeleteTerminee(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/visites/terminee`, {
                method : "DELETE",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            });

            const data = await res.json();

            if(!res.ok){
               throw new Error(data.error || data.message || "Error in deleting a visite")
            }

            await getVisites();

        }catch(err){
            console.error(err);
        }finally{
            setLoadingDeleteTerminee(false);
        }
    }

    const deleteAnnulee = async() => {

        try{

            setLoadingDeleteAnnulee(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/visites/annulee`, {
                method : "DELETE",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            });

            const data = await res.json();

            if(!res.ok){
               throw new Error(data.error || data.message || "Error in deleting a visite")
            }

            await getVisites();

        }catch(err){
            console.error(err);
        }finally{
            setLoadingDeleteAnnulee(false);
        }
    }

    const getVisitesStats = async () => {
    setLoadingVisitesStats(true);

    try {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/v1/visites/stats`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error ||
                data.message ||
                "Error in fetching visites stats"
            );
        }

        setVisitesStats(data.data);

    } catch (err) {
        console.error(err);
    } finally {
        setLoadingVisitesStats(false);
    }
};

    useEffect(() => {
    if (!token) return;

    getVisites();
}, [page, limit, search, statut]);

    
     useEffect(() => {
    setPage(1);
}, [search, statut]);



useEffect(() => {
    if (!token) return;

    getVisitesStats();
}, []);

    return <AdminVisitesContext.Provider value={{
            visites,
    loadingDemandeVsites,
    getVisites ,
    search ,
    setSearch,
    statut ,
    setStatut,
    page,
    setPage,
    limit,
    setLimit,
    total,
    totalPages,
    updateStatut,
    loadingUpdateStatut,
    msg,
    deleteVisite,
    loadingDeleteVisite,
    deleteTerminee,
    loadingDeleteTerminee,
    deleteAnnulee,
    loadingDeleteAnnulee,
    visitesStats,
    getVisitesStats,
    loadingVisitesStats,

    showDeletePop,
setShowDeletePop,
visiteDelete,
setVisiteDelete
    }}>
         {children}
    </AdminVisitesContext.Provider>
}


export const useAdminVisitesContext = () => {

    const context = useContext(AdminVisitesContext);

    if(!context){
        throw new Error("Please use the useBiensAdminContext hook inside the BiensAdminProvider");
    }

    return context;
}
import {  createContext, useContext, useEffect, useState } from "react";
import type { Commune } from "../Types/Types";
import { useAuthContext } from "../Contexts/AuthContext";



export interface AdminCommuneContextType{
    communes : Commune[];
    loadingAllCommunes : boolean;

    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    limit: number;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    total: number;
    totalPages: number;

    getAllCommunes : ()=>Promise<void>;
    active : boolean | undefined
    name : string
    setActive : (b : boolean | undefined)=>void;
    setName : (n : string)=>void;
    
    totalCommunes : number;
    totalActive : number;
    totalNotActive : number;


    showCreatePop : boolean;
    setShowCreatePop : (b: boolean)=>void;
    loadingCreateCommune : boolean;
    createCommune : (formData  : FormData)=>Promise<void>;

    showUpdatePop : boolean;
    setShowUpdatePop : (b: boolean)=>void;
    loadingUpdateCommune : boolean;
    updateCommune : (id : string,formData : FormData)=>Promise<void>;

    showDeletePop : boolean;
    setShowDeletePop : (b: boolean)=>void;
    loadingDeleteCommune : boolean;
    deleteCommune : (id : string)=>Promise<void>;
}

const AdminCommuneContext = createContext<AdminCommuneContextType | null>(null);

export const AdminCommuneProvider = ({children} : {children : React.ReactNode}) => {

      
    const [communes, setCommunes] = useState<Commune[]>([]);
    const [loadingAllCommunes, setLoadingAllCommunes] = useState<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [active, setActive] = useState<boolean | undefined>(undefined);
    const [name, setName] = useState<string>("");

    const {token, user} = useAuthContext();
    const [totalCommunes, setTotalCommunes] = useState<number>(0);
    const [totalActive, setTotalActive] = useState<number>(0);
    const [totalNotActive, setTotalNotActive] = useState<number>(0);

    const [showCreatePop, setShowCreatePop] = useState<boolean>(false);
    const [loadingCreateCommune, setLoadingCreateCommune] = useState<boolean>(false);

    const [showUpdatePop, setShowUpdatePop] = useState<boolean>(false);
    const [loadingUpdateCommune, setLoadingUpdateCommune] = useState<boolean>(false);

    const [showDeletePop, setShowDeletePop] = useState<boolean>(false);
    const [loadingDeleteCommune, setLoadingDeleteCommune] = useState<boolean>(false);
    

    const getAllCommunes = async() => {

        try{

            setLoadingAllCommunes(true);

            const params = new URLSearchParams();

            params.append("page", page.toString());
            params.append("limit", limit.toString());

            if(active !== undefined){
               if(active === true){
                params.append("active", "true")
                
               }else{
                params.append("active", "false")
               }
            }

            if(name !== ""){
                params.append("name", name)
            }
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/communes?${params.toString()}`,{
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.message || data.error || "Error in fetching all communes");
            }

            console.log("communes data: ", data);
            setCommunes(data.data.communes);
            setTotal(data.data.pagination.total);
            setTotalPages(data.data.pagination.totalPages);
            setTotalCommunes(data.data.total);
            setTotalActive(data.data.totalActive);
            setTotalNotActive(data.data.totalNotActive);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingAllCommunes(false);
        }
    }

    useEffect(()=>{
        if(!token || user?.role !== "ADMIN") return;
        getAllCommunes();
    }, [page, name, active, limit]);

    useEffect(() => {
    setPage(1);
}, [name, active]);

 
    const createCommune = async(formData: FormData) => {

        try{

            setLoadingCreateCommune(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/communes/`, {
                method : "POST",
                headers : {
                    Authorization : `Bearer ${token}`
                },
                body : formData
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in adding commune");
            }

            await getAllCommunes();
            setShowCreatePop(false);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingCreateCommune(false);
        }
    }

    const updateCommune = async(id : string,formData : FormData) => {

         try{

            setLoadingUpdateCommune(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/communes/${id}`, {
                method : "PUT",
                headers : {
                    Authorization : `Bearer ${token}`
                },
                body : formData
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in adding commune");
            }

            await getAllCommunes();
            setShowUpdatePop(false);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingUpdateCommune(false);
        }
    }


        const deleteCommune = async(id : string) => {

         try{

            setLoadingDeleteCommune(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/communes/${id}`, {
                method : "DELETE",
                headers : {
                    Authorization : `Bearer ${token}`
                },
                
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in adding commune");
            }

            await getAllCommunes();
            setShowDeletePop(false);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingDeleteCommune(false);
        }
    }

    return <AdminCommuneContext.Provider value={{
            communes,
    loadingAllCommunes,

    page,
    setPage,
    limit,
    setLimit,
    total,
    totalPages,

    getAllCommunes ,
    active,
    name,
    setActive,
    setName,
    
    totalCommunes,
    totalActive ,
    totalNotActive,
        showCreatePop,
    setShowCreatePop,
    loadingCreateCommune,
    createCommune ,

    showUpdatePop,
    setShowUpdatePop,
    loadingUpdateCommune,
    updateCommune,

    showDeletePop,
    setShowDeletePop,
    loadingDeleteCommune,
    deleteCommune
    }}>
        {children}
    </AdminCommuneContext.Provider>


}


export const useAdminCommuneContext = () => {

    const context  = useContext(AdminCommuneContext);

    if(!context){
        throw new Error("Please use the useAdminCommuneContext inside the AdminCommuneProvider");
    }

    return context;
}
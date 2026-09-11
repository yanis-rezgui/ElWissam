import { createContext, useContext, useEffect, useState } from "react";
import type { Commune } from "../Types/Types";



interface CommunesContextType{

    communesClient : Commune[];
    loadingCommunes : boolean;
    getClientCommunes : ()=>Promise<void>;
}

const CommunesContext = createContext<CommunesContextType | null>(null);

export const CommunesProvider = ({children} : {children : React.ReactNode}) => {

    const [communesClient, setCommunesClient] = useState<Commune[]>([]);
    const [loadingCommunes, setLoadingCommunes] = useState<boolean>(false);

    const getClientCommunes = async() => {

        try{

            setLoadingCommunes(true);

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/communes/client`,{
                method : "GET"
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in getting communes clients");
            }

            setCommunesClient(data.data);
            console.log("Communes : ", data.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingCommunes(false);
        }
    }

    useEffect(()=>{
        getClientCommunes();
    }, []);

    return <CommunesContext.Provider value={{
        communesClient,
        loadingCommunes,
        getClientCommunes
    }}>
        {children}
    </CommunesContext.Provider>
}


export const useCommunesContext = () => {

    const context = useContext(CommunesContext);

    if(!context){
        throw new Error("Error use the useCommunesContext inside the CommunesProvider");
    }

    return context;
}
import { createContext, useContext, useEffect, useState } from "react";
import type { Agency } from "../Types/Types";
import { useAuthContext } from "../Contexts/AuthContext";




interface AgencyAdminContextType{

    agency : Agency;
    loadingAgencyInfo : boolean;
    getAgencyInformation : ()=>void;

    loadingUpdateAgency : boolean;
    updateAgency : (agency : Agency)=>Promise<boolean>;
    errorMsg : string | null;
    
}


const AgencyAdminContext = createContext<AgencyAdminContextType | null>(null);

export const AgencyAdminProvider = ({children} : {children : React.ReactNode}) => {

    const {token} = useAuthContext();
    const [agency, setAgency] = useState<Agency>(()=>{
        const saved = localStorage.getItem('agency');

        return saved ? JSON.parse(saved) : {
            id : 1,
            name : "El Ahlem",
            phone : ["0550 22 74 73"],
            email: "el.ahlem@gmail.com",
             address: "Saint Charles, Les vergers, Kouba, Alger",
            mapsUrl: "...",
            socialLinks: [
                {
                name: "Facebook",
                url: "..."
                },
                {
                name: "TikTok",
                url: "..."
                }
            ],
              createdAt: "...",
              updatedAt: "..."
          }
    });

    const [loadingAgencyInfo, setLoadingAgencyInfo] = useState<boolean>(false);
    const [loadingUpdateAgency , setLoadingUpdateAgency ] = useState<boolean>(false);

    useEffect(()=>{
        localStorage.setItem('agency', JSON.stringify(agency));
    }, [agency]);

    const getAgencyInformation = async() => {

        try{

            setLoadingAgencyInfo(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/agency/`, {
                method : "GET",
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in fetching agency information");
            }

            console.log('Agency information : ', data.data);
            setAgency(data.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingAgencyInfo(false);
        }
    }


const [errorMsg, setErrorMsg] = useState<string | null>(null);

const updateAgency = async (agency: Agency): Promise<boolean> => {
    try {
        setLoadingUpdateAgency(true);
        setErrorMsg(null);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/agency/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ agency }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || data.error || "Erreur lors de la mise à jour de l'agence");
        }

        await getAgencyInformation();
        return true;
    } catch (err) {
        console.error(err);
        setErrorMsg(err instanceof Error ? err.message : "Une erreur est survenue");
        return false;
    } finally {
        setLoadingUpdateAgency(false);
    }
};

    useEffect(()=>{
        getAgencyInformation();
    }, []);

    return <AgencyAdminContext.Provider value={{
     agency,
    loadingAgencyInfo,
    getAgencyInformation,

    loadingUpdateAgency,
    updateAgency,
    errorMsg
    }}>
        {children}
    </AgencyAdminContext.Provider>
}


export const useAgencyAdminContext = () => {

    const context = useContext(AgencyAdminContext);

    if(!context){
        throw new Error("Please use the useAgencyAdminContext inside the AgencyAdminProvider");
    }

    return context;
}


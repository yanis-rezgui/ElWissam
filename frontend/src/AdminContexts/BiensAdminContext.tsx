import { createContext, useContext, useState } from "react";
import { useAuthContext } from "../Contexts/AuthContext";
import { useBiensContext } from "../Contexts/BiensContext";




interface BiensAdminContextType{

    updateBien : (id : string, formData: FormData)=>Promise<boolean>;
    loadingUpdateBien : boolean;
    errorMsg : string | null;
    addBien : (formData : FormData)=>Promise<boolean>;
    loadingAddBien : boolean;
    loadingDeleteBien : boolean;
    deleteBien : (id : string)=>Promise<void>;
    showDeletePop : boolean;
    setShowDeletePop : (b: boolean )=>void;
    bienDelete: Bien | null;
setBienDelete: (b: Bien | null) => void;

}

const BiensAdminContext = createContext<BiensAdminContextType | null>(null);

export const BiensAdminProvider = ({children} : {children: React.ReactNode}) => {

    const [loadingUpdateBien, setLoadingUpdateBien] = useState<boolean>(false);
    const [loadingAddBien, setLoadingAddBien] = useState<boolean>(false);
    const [loadingDeleteBien, setLoadingDeleteBien] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const {token} = useAuthContext();
    const {getAllBiens} = useBiensContext();
    const [showDeletePop, setShowDeletePop] = useState<boolean>(false);
    const [bienDelete, setBienDelete] = useState<Bien | null>(null);
    


    const updateBien = async (id: string, formData: FormData): Promise<boolean> => {
        try {
            setErrorMsg(null);
            setLoadingUpdateBien(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/biens/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.error || data.message || "Erreur lors de la mise à jour");
                return false;
            }

            await getAllBiens();
            return true;
        } catch (err) {
            console.error(err);
            setErrorMsg("Erreur réseau, veuillez réessayer");
            return false;
        } finally {
            setLoadingUpdateBien(false);
        }
    };

const addBien = async (formData: FormData): Promise<boolean> => {
    try {
        setLoadingAddBien(true);
        setErrorMsg(null);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/biens/new`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        const data = await res.json();

        if (!res.ok) {
            setErrorMsg(data.error || data.message || "Erreur lors de l'ajout du bien");
            return false;
        }

        await getAllBiens();
        return true;
    } catch (err) {
        console.error(err);
        setErrorMsg("Erreur réseau, veuillez réessayer");
        return false;
    } finally {
        setLoadingAddBien(false);
    }
};


    const deleteBien = async(id : string) => {

        try{

            setLoadingDeleteBien(true);
            setErrorMsg(null);

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/biens/${id}`,{
                method : 'DELETE',
                headers : {
                    "Content-Type" : 'application/json',
                    Authorization : `Bearer ${token}`
                }
            });

            const data = await res.json();

            if(!res.ok){
                setErrorMsg(data.error || data.message || "Error in updating bien");
                throw new Error(data.error || data.message || "Error in updating bien");
            }
            await getAllBiens();
            setShowDeletePop(false);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingDeleteBien(false);
        }
    }

    return <BiensAdminContext.Provider value={{
        updateBien,
        loadingUpdateBien, 
        errorMsg,
        addBien,
        loadingAddBien,
        deleteBien,
        loadingDeleteBien,
        setShowDeletePop,
        showDeletePop,
        bienDelete,
        setBienDelete
    }}>
        {children}
    </BiensAdminContext.Provider>
}


export const useBiensAdminContext = () => {

    const context = useContext(BiensAdminContext);

    if(!context){
        throw new Error("Please use the useBiensAdminContext hook inside the BiensAdminProvider");
    }

    return context;
}
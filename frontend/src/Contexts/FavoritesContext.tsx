import { createContext, useContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { useUserContext } from "./UserContext";



interface FavoritesContextType{

    toggleFavorite : (id : string)=>Promise<void>;
    loadingToggleFavorites : boolean;
    msg : string | null
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({children} : {children : React.ReactNode}) => {

    const [loadingToggleFavorites, setLoadingToggleFavorites] = useState<boolean>(false);
    const {token} = useAuthContext();

    const {getUser} = useUserContext();
    const [msg, setMsg] = useState<string | null>(null);

    const toggleFavorite = async(id : string) => {

        try{
            setLoadingToggleFavorites(true);
            setMsg(null);

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/favoris/${id}`,{
                method :'POST',
                headers : {
                    "Content-Type" : 'application/json',
                    Authorization : `Bearer ${token}`
                }
            });

            const data = await res.json();

            if(!res.ok){
                setMsg(data.error || data.message || "Erreure dans l'ajout du favoris")
                throw new Error(data.error || data.message || "Error in adding favorite")
            }


            await getUser();
        }catch(err){
            console.error(err);
        }finally{
            setLoadingToggleFavorites(false);
        }
    }

    return <FavoritesContext.Provider value={{
        toggleFavorite,
        msg,
        loadingToggleFavorites
    }}>
        {children}
    </FavoritesContext.Provider>
}


export const useFavoritesContext = () => {

    const context = useContext(FavoritesContext);

    if(!context){
        throw new Error("Please use the useFavoritesContext hook inside the FavoritesProvider");
    }

    return context;
}
import { createContext, useContext, useState } from "react";



interface VisiteContextType{
    addVisite : (nom  :string,
            email: string,
            telephone : string,
            dateSouhaitee : string,
            message : string,
            bienId : string
        ) => void;
    loadingAddVisite : boolean;
    errorMsg : string | null;
    successMsg : string |  null
}


const VisiteContext = createContext<VisiteContextType | null>(null);

export const VisiteProvider = ({children} : {children : React.ReactNode}) => {

    const [loadingAddVisite, setLoadingAddVisite] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg , setSuccessMsg ] = useState<string | null>(null);
    
    const addVisite = async(nom  :string,
            email: string,
            telephone : string,
            dateSouhaitee : string,
            message : string,
            bienId : string
        ) => {

               setLoadingAddVisite(true);
               setErrorMsg(null);
               setSuccessMsg(null);
               try{
 
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/visites/`, {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json",

                    },
                    body : JSON.stringify({nom  ,email ,telephone  ,dateSouhaitee  ,message  ,bienId  })
                });

                const data = await res.json();

                if(!res.ok){
                    setErrorMsg(data.error || data.message || "Error")
                    throw new Error(data.error || data.message || "Error")
                }

                
                console.log("Current Visite : ", data.data);
                setSuccessMsg("Votre Reservation de viste a été envoyé notre equipe vous contactera dé que possible pour une confirmation")

               }catch(err){
                console.error(err);
               }finally{
                setLoadingAddVisite(false);
               }
            }

    return <VisiteContext.Provider value={{
            addVisite,
            loadingAddVisite,
            errorMsg,
            successMsg,
    }}>
        {children}
    </VisiteContext.Provider>
}


export const useVisiteContext = () => {

    const context = useContext(VisiteContext);

    if(!context){
        throw new Error("Please use the useVisiteContext hook inside the VisiteProvider")
    }

    return context;
}


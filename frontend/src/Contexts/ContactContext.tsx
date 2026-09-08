import { createContext, useContext, useState } from "react";


interface ContactContextType{

    sendMessage : (nom : string, email : string, telephone : string, objet : string, message : string) =>Promise<void>;
    loadingMsg : boolean;
    msg : string | null;
}

const ContactContext = createContext<ContactContextType | null>(null);

export const ContactProvider = ({children} : {children : React.ReactNode}) => {

    const [loadingMsg, setLoandingMsg] = useState<boolean>(false);
    const [msg, setMsg] = useState<string | null>(null);

    const sendMessage = async(nom : string, email : string, telephone : string, objet : string, message : string) => {

        try{

            setLoandingMsg(true);
            setMsg(null);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/contact/`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    
                },
                body : JSON.stringify({nom, email,telephone, objet,message})
            });

            const data = await res.json();

            if(!res.ok){
                setMsg(data.error || data.message || "Erreur dans l'envois du message");
                throw new Error(data.error || data.message || "Erreur dans l'envois du message")
            }

            setMsg("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais. ✓")

        }catch(err){
            console.error(err);
        }finally{
            setLoandingMsg(false);
        }
    }


    return <ContactContext.Provider value={{
        sendMessage,
        msg,
        loadingMsg
    }}>
        {children}
    </ContactContext.Provider>
}


export const useContactContext = () => {

    const context = useContext(ContactContext);

    if(!context){
        throw new Error("Please use the useContactContext hook inside the ContactProvider");
    }

    return context;
}
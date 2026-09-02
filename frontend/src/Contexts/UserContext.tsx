import { createContext, useContext, useEffect,  useState } from "react";
import { useAuthContext } from "./AuthContext";



interface UserContextType{

    getUser : ()=>Promise<void>;
    loadingUpdateUser : boolean;
    updateUser : (firstName : string, lastName : string) => Promise<void>;
    loadingUpdatePassword : boolean;
    updatePassword : (oldPassword: string, newPassword1 : string, newPassword2 : string) => Promise<void>;
    msg : string | null;

}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({children} : {children : React.ReactNode}) => {

    const [loadingUpdateUser, setLoadingUpdateUser] = useState<boolean>(false);
    const [loadingUpdatePassword, setLoadingUpdatePassword] = useState<boolean>(false);
    const {setUser, token, user , signOut} = useAuthContext();
    const [msg, setMsg] = useState<string | null>(null);

    const getUser = async() => {

        try{

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/`, {
                method : "GET",
                headers : {
                    "Content-Type" : 'application/json',
                    Authorization : `Bearer ${token}`
                }
            });

            const data = await res.json();

            if(!res.ok){
                if(res.status === 401) await signOut();
                throw new Error(data.error || data.message || "Error in getting user");
            }

            setUser(data.data);

        }catch(err){
            console.error(err);
        }
    }

    const updateUser = async(firstName : string, lastName : string) => {

        try{

            setLoadingUpdateUser(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/`,{
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                },
                body : JSON.stringify({firstName, lastName})
            });

            const data = await res.json();

            if(!res.ok){
                setMsg(data.error || data.message || "Error in updating user")
                throw new Error(data.error || data.message || "Error in updating user");
            }

            setUser(data.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingUpdateUser(false);
        }
    }

    const updatePassword = async(oldPassword : string, newPassword1 : string, newPassword2 : string) => {

        try{
            setLoadingUpdatePassword(true);

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/password`,{
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                },
                body : JSON.stringify({oldPassword, newPassword1, newPassword2})
            });

            const data = await res.json();

            if(!res.ok){
                setMsg(data.error || data.message || "Error in updating user")
                throw new Error(data.error || data.message || "Error in updating user");
            }
        }catch(err){
            console.error(err);
        }finally{
            setLoadingUpdateUser(false);
        }
    }

    useEffect(()=>{
        getUser() 
    }, [])

    return <UserContext.Provider value={{
          getUser ,
    loadingUpdateUser,
    updateUser ,
    loadingUpdatePassword ,
    updatePassword ,
    msg
    }}>
        {children}
    </UserContext.Provider>
}

export const useUserContext = () => {

    const context = useContext(UserContext);

    if(!context){
        throw new Error("Please use the useUserContext hook inside an UserProvider");
    }

    return context;
}
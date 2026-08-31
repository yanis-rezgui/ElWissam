import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../Types/Types";


interface AuthContextType{
    user: User | null
    token : string | null;
    setUser : (u : User | null)=>void;
    signUp : (firstName : string, lastName : string, email : string, password1 : string, password2: string) => Promise<void>;
    loadingSignUp : boolean;
    signIn : (email : string, password : string)=>Promise<void>;
    loadingSignIn: boolean;
    signOut : ()=>Promise<void>;
    loadingSignOut : boolean;
    msg : string | null;
    showSignIn : boolean;
    setShowSignIn : (b : boolean)=>void;
    showSignOut : boolean;
    setShowSignOut : (b : boolean)=>void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children} : {children : React.ReactNode}) => {

    const [user, setUser] = useState<User |  null>(()=>{
        const saved = localStorage.getItem('user');

        return saved ? JSON.parse(saved) : null;
    });

    const [token , setToken] = useState<string | null>(()=>{
        const saved = localStorage.getItem('token');

        return saved ? JSON.parse(saved) : null;
    });

    const [msg, setMsg] = useState<string | null>(null);

    const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);
    const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false);
    const [loadingSignOut, setLoadingSignOut] = useState<boolean>(false);
    const [showSignIn, setShowSignIn] = useState<boolean>(false);

    const [showSignOut, setShowSignOut] = useState<boolean>(false);


    const signUp = async(firstName : string, lastName : string, email : string, password1 : string, password2: string) => {

        try{

            setLoadingSignUp(true);
            setMsg(null)
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/sign-up`, {
                method : "POST",
                headers : {
                    "Content-Type" : 'application/json'
                },
                body : JSON.stringify({firstName, lastName, email, password1, password2})
            });

            const data = await res.json();

            if(!res.ok){
                setMsg(data.error || data.message || "Error in signing up")
                throw new Error(data.error || data.message || "Error in signing up");
            }

            setUser(data.data.userResponse);
            setToken(data.data.token);
            
        }catch(err){
            console.error(err);
        }finally{
            setLoadingSignUp(false);
        }
    }


    const signIn = async(email : string, password : string) => {

        try{

            setMsg(null);
            setLoadingSignIn(true);

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/sign-in`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({email, password})
            });

            const data = await res.json();

            if(!res.ok){
                setMsg(data.error || data.message || "Error in signing up")
                throw new Error(data.error || data.message || "Error in signing up")
            }

            setUser(data.data.userResponse);
            setToken(data.data.token);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingSignIn(false);
        }
    }

    const signOut = async() => {

        try{

            setMsg(null)
            setLoadingSignOut(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/sign-out`, {
                method : "POST",
                headers : {
                    "Content-Type" : 'application/json',
                },


            });
            const data = await res.json();

            if(!res.ok){
                
                setMsg(data.error || data.message || "Error in signing-out");
                return;
            }

            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            setUser(null);
            setToken(null);
        }catch(err){
            console.error(err);

        }finally{
            setLoadingSignOut(false);
        }
    }


    useEffect(()=> {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    useEffect(()=>{
        localStorage.setItem('token', JSON.stringify(token));
    }, [token]);

    return <AuthContext.Provider value={{
    user,
    token,
    setUser ,
    signUp,
    loadingSignUp,
    signIn, 
    loadingSignIn,
    signOut,
    loadingSignOut,
    msg,
    showSignIn,
    setShowSignIn,
    showSignOut, 
    setShowSignOut
    }}>
        {children}
    </AuthContext.Provider>

}


export const useAuthContext = () => {

    const context = useContext(AuthContext);

    if(!context){
        throw new Error("Please use the useAuthContext hook inside an AuthProvider");
    }

    return context;
}
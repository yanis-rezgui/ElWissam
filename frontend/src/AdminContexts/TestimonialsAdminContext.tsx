import { createContext, useContext, useEffect,  useState } from "react";
import type { Testimonial } from "../Types/Types";
import { useAuthContext } from "../Contexts/AuthContext";



interface TestimonialsAdminContextType{
    allTestimonials : Testimonial[];
    loadingAllTestimonials : boolean;
    getAllTestimonials : ()=>Promise<void>;
    fullName : string;
    setFullName : (s : string)=>void;
    active : boolean | undefined
    setActive : (b: boolean | undefined)=>void;

    updateTestimonial : (id : string,fullName : string, message : string, rating : number, active : boolean)=>Promise<void>;
    loadingUpdateTestimonial : boolean;

    addTestimonial : (fullName : string, message : string, rating : number, active : boolean)=>Promise<void>;
    loadingAddTestimonial : boolean;

    deleteTestimonial: (id : string)=>Promise<void>;
    loadingDeleteTestimonial : boolean;

        showAddTestimonialPop: boolean;
    setShowAddTestimonialPop: (b: boolean) => void;

    showUpdateTestimonialPop: boolean;
    setShowUpdateTestimonialPop: (b: boolean) => void;

    showDeleteTestimonialPop: boolean;
    setShowDeleteTestimonialPop: (b: boolean) => void;

        testimonialDetails: Testimonial | null;
    setTestimonialDetails: (t: Testimonial | null) => void;

    msg : string | null;
}


const TestimonialsAdminContext = createContext<TestimonialsAdminContextType | null>(null);

export const TestimonialsAdminProvider = ({children} : {children : React.ReactNode}) => {

    const [loadingAllTestimonials, setLoadingAllTestimonials] = useState<boolean>(false);
    const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>([]);
    const {token} = useAuthContext();

    const [msg, setMsg] = useState<string | null>(null);
    const [fullName, setFullName] = useState<string>("");
    const [active, setActive] = useState<boolean | undefined>(undefined);

    const [loadingUpdateTestimonial, setLoadingUpdateTestimonial] = useState<boolean>(false);
    const [loadingAddTestimonial, setLoadingAddTestimonial] = useState<boolean>(false);
    const [loadingDeleteTestimonial, setLoadingDeleteTestimonial] = useState<boolean>(false);

        const [testimonialDetails, setTestimonialDetails] =
        useState<Testimonial | null>(null);

        const [showAddTestimonialPop, setShowAddTestimonialPop] =
        useState(false);

    const [showUpdateTestimonialPop, setShowUpdateTestimonialPop] =
        useState(false);

    const [showDeleteTestimonialPop, setShowDeleteTestimonialPop] =
        useState(false);
    

    const getAllTestimonials = async() => {

        try{
            setLoadingAllTestimonials(true);
            setMsg(null);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/testimonials/all`, {
                method : "POST",
                headers :{
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                },
                body : JSON.stringify({fullName,active})
            });

            const data = await res.json();

            if(!res.ok){
                setMsg(data.error || data.message || "Error in getting all testimonials")
                throw new Error(data.error || data.message || "Error in getting all testimonials");
            }
            console.log("All testimonials : ", data.data);
            setAllTestimonials(data.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingAllTestimonials(false);
        }
    }

    const updateTestimonial= async(id : string,fullName : string, message : string, rating : number, active : boolean) => {

        try{

            setMsg(null);
            setLoadingUpdateTestimonial(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/testimonials/${id}`,{
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                },
                body : JSON.stringify({fullName, message, rating, active})
            });

            const data = await res.json();

            if(!res.ok){
                setMsg(data.error || data.message || "Error in getting all testimonials")
                throw new Error(data.error || data.message || "Error in updating testimonial");
            }

            await getAllTestimonials();
            setShowUpdateTestimonialPop(false);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingUpdateTestimonial(false);
        }
    }

        const addTestimonial= async(fullName : string, message : string, rating : number, active : boolean) => {

        try{

            setMsg(null)
            setLoadingUpdateTestimonial(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/testimonials/add`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                },
                body : JSON.stringify({fullName, message, rating, active})
            });

            const data = await res.json();

            if(!res.ok){
                setMsg(data.error || data.message || "Error in getting all testimonials")
                throw new Error(data.error || data.message || "Error in adding testimonial");
            }

            await getAllTestimonials();
            setShowAddTestimonialPop(false);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingAddTestimonial(false);
        }
    }


    const deleteTestimonial = async(id: string) => {

        try{

            setMsg(null);
            setLoadingDeleteTestimonial(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/testimonials/${id}`,{
                method : "DELETE",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            });

            const data = await res.json();

            if(!res.ok){
                setMsg(data.error || data.message || "Error in getting all testimonials")
               throw new Error(data.error || data.message || "Error in adding testimonial");
            }

            await getAllTestimonials();
            setShowDeleteTestimonialPop(false)
        }catch(err){
            console.error(err);
        }finally{
            setLoadingDeleteTestimonial(false);
        }

    }

    useEffect(()=>{
        getAllTestimonials();
    }, [fullName, active]);



    return <TestimonialsAdminContext.Provider value={{
        getAllTestimonials,
        allTestimonials,
        loadingAllTestimonials,
        fullName,
        setFullName,
        active,
        setActive,
        updateTestimonial,
        loadingAddTestimonial,
        deleteTestimonial,
        loadingDeleteTestimonial,
        addTestimonial,
        loadingUpdateTestimonial,

                        showAddTestimonialPop,
                setShowAddTestimonialPop,

                showUpdateTestimonialPop,
                setShowUpdateTestimonialPop,

                showDeleteTestimonialPop,
                setShowDeleteTestimonialPop,

        testimonialDetails,
        setTestimonialDetails,
        msg
    }}>
        {children}
    </TestimonialsAdminContext.Provider>
}


export const useTestimonialsAdminContext = () => {

    const context = useContext(TestimonialsAdminContext);

    if(!context){
        throw new Error("Please use the useTestimonialsAdminContext hook inside theprovider");
    }

    return context;
}

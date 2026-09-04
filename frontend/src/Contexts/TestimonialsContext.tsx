import { createContext, useContext, useEffect, useState } from "react";
import type { Testimonial } from "../Types/Types";




interface TestimonialsContextType{
    clientTestimonials : Testimonial[];
    loadingClientTestimonials : boolean;
    getClientTestimonials : ()=>Promise<void>;
}

const TestimonialsContext = createContext<TestimonialsContextType | null>(null);

export const TestimonialsProvider = ({children} : {children : React.ReactNode}) => {

    const [clientTestimonials , setClientTestimonials] = useState<Testimonial[]>([]);
    const [loadingClientTestimonials, setLoadingClientTestimonials] = useState<boolean>(false);

    const getClientTestimonials = async() => {

        try{

            setLoadingClientTestimonials(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/testimonials/`,{
                method : "GET",
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in getting client testimonials");
            }

            console.log("Client testimonials : ", data.data);
            setClientTestimonials(data.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingClientTestimonials(false);
        }
    }

    useEffect(()=>{
        getClientTestimonials();
    }, []);

    return <TestimonialsContext.Provider value={{
       clientTestimonials,
       loadingClientTestimonials,
       getClientTestimonials
    }}>
        {children}
    </TestimonialsContext.Provider>

}

export const useTestimonialsContext = () => {

    const context = useContext(TestimonialsContext);

    if(!context){
        throw new Error("Please use the useBiensContext hook inside the BiensContext Provider");
    }

    return context;
}
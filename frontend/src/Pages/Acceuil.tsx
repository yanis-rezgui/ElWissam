import { memo } from "react"
import Hero from "../Components/AcceuilComponents/Hero";
import About from "../Components/AcceuilComponents/About";




const Acceuil = () => {

    return(
         <section className="min-h-screen flex flex-col items-center w-full">
              <Hero/>
              <About/>
         </section>      
    )
}


export default memo(Acceuil);
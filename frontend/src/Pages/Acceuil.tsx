import { memo } from "react"
import Hero from "../Components/AcceuilComponents/Hero";
import About from "../Components/AcceuilComponents/About";
import Accompagnement from "../Components/AcceuilComponents/Accompagnement";
import BiensSection from "../Components/AcceuilComponents/BiensSection";
import Confiance from "../Components/AcceuilComponents/Confiance";





const Acceuil = () => {

    return(
         <section className="min-h-screen flex flex-col items-center w-full">
              <Hero/>
              <About/>
              <Accompagnement/>
              <BiensSection/>
              <Confiance/>
         </section>      
    )
}


export default memo(Acceuil);
import { memo } from "react"
import Hero from "../Components/AcceuilComponents/Hero";
import About from "../Components/AcceuilComponents/About";
import Accompagnement from "../Components/AcceuilComponents/Accompagnement";
import BiensSection from "../Components/AcceuilComponents/BiensSection";
import Confiance from "../Components/AcceuilComponents/Confiance";
import NosServices from "../Components/AcceuilComponents/NosServices";





const Acceuil = () => {

    return(
         <section className="min-h-screen flex flex-col items-center w-full">
              <Hero/>
              <About/>
              <Accompagnement/>
              <BiensSection/>
              <Confiance/>
              <NosServices/>
         </section>      
    )
}


export default memo(Acceuil);
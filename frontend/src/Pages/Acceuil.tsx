import { memo } from "react"
import Hero from "../Components/AcceuilComponents/Hero";
import About from "../Components/AcceuilComponents/About";
import Accompagnement from "../Components/AcceuilComponents/Accompagnement";
import BiensSection from "../Components/AcceuilComponents/BiensSection";
import Confiance from "../Components/AcceuilComponents/Confiance";
import NosServices from "../Components/AcceuilComponents/NosServices";
import TypesBiens from "../Components/AcceuilComponents/TypesBiens";
import Communes from "../Components/AcceuilComponents/Communes";
import Etapes from "../Components/AcceuilComponents/Etapes";
import Cta from "../Components/AcceuilComponents/Cta";





const Acceuil = () => {

    return(
         <section className="min-h-screen flex flex-col items-center w-full">
              <Hero/>
              <About/>
              <NosServices/>
              <Accompagnement/>
              <BiensSection/>
              <TypesBiens/>
              <Confiance/>
              <Communes/>
              <Etapes/>
              <Cta/>
         </section>      
    )
}


export default memo(Acceuil);
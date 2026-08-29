import { useParams } from "react-router-dom"
import { useBiensContext } from "../Contexts/BiensContext";
import { memo, useEffect } from "react";
import DetailsHero from "../Components/BienDetailsComponents/DetailsHero";
import FirstSection from "../Components/BienDetailsComponents/FirstSection";
import Infos from "../Components/BienDetailsComponents/Infos";
import Description from "../Components/BienDetailsComponents/Description";
import Features from "../Components/BienDetailsComponents/Features";
import Map from "../Components/BienDetailsComponents/Map";
import VisiteForm from "../Components/BienDetailsComponents/VisiteForm";



const BienDetails = () => {

    const {id} = useParams();

    const {getBien, currentBien} = useBiensContext();

    useEffect(()=>{
        getBien(id);
    }, [id]);

    return(
        <section className="min-h-screen flex flex-col items-center w-full bg-gray-100">
           
           <DetailsHero/>

         <div className="flex flex-row w-full px-20 max-[1000px]:px-5 items-start mt-10 gap-10 max-[1200px]:px-10
         max-[850px]:flex-col max-[850px]:items-center
         ">
           <div className="flex flex-col w-full ">
              
              <FirstSection/>
              <Infos/>
              <Description/>
              <Features/>
              <Map/>
           </div>

           <div>
            <VisiteForm/>
           </div>
        </div>


        </section>
    )
}


export default memo(BienDetails);
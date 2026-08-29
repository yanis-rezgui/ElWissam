import { memo } from "react"
import BiensSearch from "../Components/BiensComponents/BiensSearch";
import BiensFilters from "../Components/BiensComponents/BiensFilters";
import AllBiens from "../Components/BiensComponents/AllBiens";




const Biens = () => {

    return(
        <section className="flex flex-col items-center bg-gray-100 w-full min-h-screen">
             
             <h1
             className="text-[2em] font-bold text-[#222344] mt-7"
             >Nos Biens</h1>

             <p className="text-[#222344] mt-3 text-[17px] px-2 text-center">
                Découvrez notre sélection de biens immobiliers
                à vendre et à louer.
             </p>

             <BiensSearch/>

             <div className="flex flex-row items-start mt-10 gap-5 max-[900px]:flex-col max-[900px]:justify-center
             max-[900px]:items-center mb-10
             ">
                <div className="border-r border-r-gray-400 p-2 max-[900px]:border-none">
                <BiensFilters/>
                </div>
                <AllBiens/>
             </div>


        </section>
    )
}

export default memo(Biens);
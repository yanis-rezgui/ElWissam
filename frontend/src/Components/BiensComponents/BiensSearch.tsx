import { memo } from "react";
import { useBiensContext } from "../../Contexts/BiensContext"


const BiensSearch = () => {

    const {setBiensFilter, biensFilter} = useBiensContext();

    return(
        <div className="flex flex-col bg-[#222344] w-[700px] rounded-[10px] p-3 text-gray-100
        shadow-2xl mt-5 max-[750px]:w-[400px] max-[450px]:w-[350px]
        ">
           <p className="text-[19px] font-bold">
            Recherche et filtres principaux
           </p>

             <div className="flex flex-row items-center justify-center w-full mt-5 gap-5 max-[750px]:flex-col 
             max-[750px]:justify-baseline max-[750px]:items-baseline
             ">

                <select name="" id=""
                className="p-2 bg-gray-50 text-[#222344] rounded-[5px] text-[15px] cursor-pointer
                max-[750px]:w-full
                "
                value={biensFilter.service}
                onChange={(e )=>{
                    setBiensFilter({
                        ...biensFilter,
                        service : e.target.value
                    })
                }}
                >
                    <option value="">Tout</option>
                    <option value="VENTE">Vente</option>
                    <option value="LOCATION">Location</option>
                </select>


                <div  className="relative max-[750px]:w-full"
                >
                <input
                    type="text" 
                value={biensFilter.search}
                 onChange={(e)=>{
                    setBiensFilter({
                        ...biensFilter,
                        search : e.target.value
                    }
                    )
                 }}
                    placeholder="Recherche par localisation ou nom"
                     className="w-[400px] text-[14px] border border-gray-300 px-3
                      h-[40px] rounded-[10px] resize-none 
                      focus:outline-none focus:ring-2 focus:ring-[#222344] bg-gray-50 text-[#222344]
                      max-[750px]:w-full
                      "
            />

            <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#222344] text-[20px] pr-2 cursor-pointer py-1 ">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>

                </div>
             </div>

        </div>
    )
}


export default memo(BiensSearch);
import { memo } from "react";
import { useBiensContext } from "../../Contexts/BiensContext"



const AdminBiensSearch = () => {

    const {biensFilter, setBiensFilter} = useBiensContext();

    return(
        <div className="bg-gray-300 w-full flex justify-center items-center p-2 fixed top-[60px]">
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
                    placeholder="Recherche par localisation ou nom..."
                     className="w-[700px] text-[14px] border border-gray-300 px-3
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
    )
}

export default memo(AdminBiensSearch);
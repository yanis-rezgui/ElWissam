import { memo } from "react";
import { useBiensContext } from "../../Contexts/BiensContext"


const AdminFilterComponent = () => {

    const {biensFilter, setBiensFilter} = useBiensContext();
    return(

        <div className="flex flex-col bg-[#222344] w-[400px] rounded-[10px] p-3 text-gray-100
        shadow-2xl mt-10 gap-2 max-[450px]:w-[300px]
        ">
            <p 
            className="text-[1.4em] font-bold"
            >Filtrer</p>

            <div className="flex flex-col gap-2">
                <p className="text-[15px] font-[600]">Type:</p>
                <select name="" id=""
                  className="p-2 bg-gray-50 text-[#222344] rounded-[5px] text-[15px] cursor-pointer
               w-full
                "
                value={biensFilter.type}
                onChange={(e)=>{
                    setBiensFilter({
                        ...biensFilter,
                        type : e.target.value
                    })
                }}
                >
                    <option value="">All</option>
                    <option value="APPARTEMENT">APPARTEMENT</option>
                    <option value="TERRAIN">TERRAIN</option>
                    <option value="LOCAL">LOCAL</option>
                    <option value="VILLA">VILLA</option>
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-[15px] font-[600]">Service:</p>
                <select name="" id=""
                className="p-2 bg-gray-50 text-[#222344] rounded-[5px] text-[15px] cursor-pointer
               w-full
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
            </div>

            <div className="flex flex-col gap-2 mt-3">
                <p className="text-[17px] font-[600]">Budget:</p>

                <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-1">
                        <p className="text-[15px] font-[600]">Min:</p>
                        <input type="number" 
                        value={biensFilter.prixMin}
                        onChange={(e)=>{
                            setBiensFilter({
                                ...biensFilter,
                                prixMin : Number(e.target.value)
                            })
                        }}
                        className="p-2 bg-gray-50 text-[#222344] rounded-[5px] text-[15px] cursor-pointer
               w-full
                "
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p
                        className="text-[15px] font-[600]"
                        >Max:</p>
                        <input type="number" 
                        value={biensFilter.prixMax}
                        onChange={(e)=>{
                            setBiensFilter({
                                ...biensFilter,
                                prixMax : Number(e.target.value)
                            })
                        }}
                        className="p-2 bg-gray-50 text-[#222344] rounded-[5px] text-[15px] cursor-pointer
               w-full
                "
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default memo(AdminFilterComponent);
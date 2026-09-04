import  { memo } from "react"
import { useTestimonialsAdminContext } from "../../AdminContexts/TestimonialsAdminContext";


const TestimonialsFilter = () => {

    const {fullName, setFullName, active, setActive} = useTestimonialsAdminContext();

    return(
        <div className="flex flex-col gap-4 bg-[#222344] p-4 rounded-[10px] shadow-2xl mt-5 ">
            <div className="flex flex-row items-center gap-2 text-white text-[1.4em] font-bold">
                <i className="fa-solid fa-filter"></i>
                <p>
                    Recherche et Filtre
                </p>
            </div>

            <div className="flex flex-row items-center gap-3 max-[800px]:flex-col">
               

                <div>
                    <p className="text-[15px] font-[600] text-white">
                        Recherche:
                    </p>
                    <input 
                    type="text" 
                    placeholder="Entrer le nom de la personne"
                    value={fullName}
                    onChange={(e)=>setFullName(e.target.value)}
                    className="border border-gray-300 rounded-[5px] p-2 text-[15px]
                        bg-gray-100 w-[300px]
                        "
                    />

                </div>

                <div className="flex flex-col gap-1 ">
                            <p
                                className="text-[15px] font-[600] text-white"
                            >Activation:</p>
                            <select
                                value={String(active)}
                                onChange={(e)=>setActive(e.target.value === "all" ? undefined : e.target.value === "true")}
                                className="not-first:border border-gray-300 rounded-[5px] p-2 text-[15px]
                        bg-gray-100 w-[300px]
                        "
                            name="active"
                           
                            >
                                <option value="all">Tout</option>
                               <option value="false">Non</option>
                               <option value="true">Oui</option>
                            </select>
                        </div>
            </div>
        </div>
    )
}

export default memo(TestimonialsFilter);
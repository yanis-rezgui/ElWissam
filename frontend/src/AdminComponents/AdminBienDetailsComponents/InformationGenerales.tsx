import { memo } from "react"
import type { Bien } from "../../Types/Types";



const InformationGenerales = ({modifBien, setModifBien} : {modifBien : Bien | null, setModifBien : (b : Bien | null)=>void}) => {

    return(
        <div id="modify"
        className="flex flex-col gap-3 w-full bg-white p-3 rounded-[10px] shadow-2xl"
        >
            <p className="text-[1.4em] font-bold underline ">
                Informations générales:
            </p>

            <div className="flex flex-col gap-2 mt-5">
                <label htmlFor=""
                className="text-[15px] font-[600]"
                >Nom:</label>
                <input 
                type="text" 
                value={modifBien?.nom}
                onChange={(e)=>{
                    setModifBien({
                        ...modifBien!,
                        nom : e.target.value
                    })
                }}
                className="p-2 bg-gray-100 text-[#222344] rounded-[5px] text-[15px]
               w-full border border-gray-300
                "
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor=""
                className="text-[15px] font-[600]"
                >Description:</label>
                <textarea 
                className="p-2 bg-gray-100 text-[#222344] rounded-[5px] text-[15px] 
               w-full border border-gray-300
                "
                value={modifBien?.description}
                onChange={(e)=>{
                    setModifBien({
                        ...modifBien!,
                        description : e.target.value
                    })
                }}
                />
            </div>

           <div className="flex flex-col gap-2">
                <p className="text-[15px] font-[600]">Type:</p>
                <select name="" id=""
                  className="p-2 bg-gray-100 text-[#222344] rounded-[5px] text-[15px] 
               w-full border border-gray-300 cursor-pointer
                "
                value={modifBien?.type}
                onChange={(e)=>{
                    setModifBien({
                        ...modifBien!,
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
                className="p-2 bg-gray-100 text-[#222344] rounded-[5px] text-[15px] 
               w-full border border-gray-300 cursor-pointer
                "
                value={modifBien?.service}
                onChange={(e )=>{
                    setModifBien({
                        ...modifBien!,
                        service : e.target.value
                    })
                }}
                >
                    <option value="">Tout</option>
                    <option value="VENTE">Vente</option>
                    <option value="LOCATION">Location</option>
                </select>
            </div>

            <div className="flex flex-row w-full items-center justify-between">
                <div className="flex flex-col gap-2">
                <label htmlFor=""
                 className="text-[15px] font-[600]" 
                >Prix:</label>
                <input
                type="number" 
                value={modifBien?.prix}
                onChange={(e)=>{
                    setModifBien({
                        ...modifBien!,
                        prix : Number(e.target.value)
                    })
                }}
                className="p-2 bg-gray-100 text-[#222344] rounded-[5px] text-[15px] 
               w-full border border-gray-300
                "
                />
               </div>

               <div className="flex flex-col gap-2">
                <label htmlFor=""
                
                className="text-[15px] font-[600]">Superficie:</label>
                <input
                type="number" 
                value={modifBien?.superficie}
                onChange={(e)=>{
                    setModifBien({
                        ...modifBien!,
                        superficie : Number(e.target.value)
                    })
                }}
                className="p-2 bg-gray-100 text-[#222344] rounded-[5px] text-[15px] 
               w-full border border-gray-300
                "
                />
               </div>
            </div>

            <div className="flex flex-col gap-2">
                <label 
                className="text-[15px] font-[600]"
                htmlFor="">Adresse:</label>
                <input 
                type="text" 
                value={modifBien?.localisation}
                onChange={(e)=>{
                    setModifBien({
                        ...modifBien!,
                        localisation : e.target.value
                    })
                }}
                className="p-2 bg-gray-100 text-[#222344] rounded-[5px] text-[15px] 
               w-full border border-gray-300
                "
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor=""
                className="text-[15px] font-[600]"
                >Localisation Gps (Lien google maps):</label>
                <input 
                type="text" 
                value={modifBien?.localisationMap}
                onChange={(e)=>{
                    setModifBien({
                        ...modifBien!,
                        localisationMap : e.target.value
                    })
                }}
                className="p-2 bg-gray-100 text-[#222344] rounded-[5px] text-[15px]
               w-full border border-gray-300
                "
                />
            </div>
        </div>
    )
}

export default memo(InformationGenerales);
import { memo } from "react"
import type { Bien } from "../../Types/Types";
import { useNavigate } from "react-router-dom";



const BienCard  = ({bien} : {bien : Bien}) => {

    const navigate = useNavigate();

    return(
        <div className="flex flex-col w-[250px] bg-white border border-gray-400 rounded-[10px] relative
        transition-transform duration-200 hover:scale-105
        ">
            <img src={bien.images[0]} alt="" 
            className="w-full h-[150px] object-cover rounded-t-[10px]"
            />

            <div className="p-2 flex flex-col gap-1">
                <p className="text-[15px] font-[600]">{bien.nom}</p>
                <div className="flex flex-row gap-2 items-center text-[15px] font-[500]
                leading-4.5
                ">
                    <i className="fa-solid fa-location-crosshairs text-[1.2em]"></i>
                    {bien.localisation}
                </div>
            </div>

            <div className="flex flex-col gap-2 p-2">
                <div className="flex flex-row items-center w-full justify-between">
                    <span className="text-[15px] font-[500]">{bien.type}</span>
                    <span>{bien.superficie} m²</span>
                </div>

                <p className="font-[600] text-[15px]">{bien.prix} DA</p>

                {bien.negociable && <p>Prix négociable</p>}

            </div>

             <div className="flex flex-row w-full justify-between items-center p-2">
                <button></button>
            <button className="w-[100px] bg-black/80 text-white flex flex-row gap-2 items-center justify-center
            py-1 rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 
            active:opacity-60
            "
            onClick={()=>navigate(`/bien/${bien.id}`)}
            >
                Voir <i className="fa-solid fa-arrow-right"></i>
            </button>
            </div>

            <button className="absolute top-2 left-1 bg-black/70 text-white text-[15px] font-[600] py-1 px-2">
                {bien.service === "LOCATION" ? "À louer" : "À vendre"}
            </button>
        </div>
    )
}

export default memo(BienCard);
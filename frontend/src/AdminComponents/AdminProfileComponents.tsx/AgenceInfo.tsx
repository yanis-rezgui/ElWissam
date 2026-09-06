import { memo } from "react"
import { useNavigate } from "react-router-dom";


const AgenceInfo = () => {

    const navigate = useNavigate();

    return(
          <div className="bg-white w-[300px] shadow-2xl rounded-[10px] flex flex-col">
            <p className="text-[1.4em] font-bold p-2 border-b border-b-gray-300">
                Agence
            </p>

           <div className="flex flex-col p-2 gap-2">
            <p className="text-[1.2em] font-black text-[#222344]">
                El Ahlem Immobilier
            </p>
            
            <p className="text-gray-700 text-[15px] leading-5">
                Agence immobilière · Administrateur depuis septembre 2026
            </p>

            <p className="font-bold text-[16px] leading-5">

                Gérez les informations de votre agence, ses coordonnées et ses paramètres.
            </p>

            <button className="w-full bg-[#222344] cursor-pointer transition-opacity duration-200
            hover:opacity-80 active:opacity-60 text-white py-2 text-[15px] rounded-[5px] font-bold
            mt-2
            "
            onClick={()=>navigate('/admin/general')}
            >
                Gérer les paramètres de l’agence
            </button>
            </div>

           </div>
    )
}

export default memo(AgenceInfo);
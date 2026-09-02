import { memo } from "react";
import { useBiensContext } from "../../Contexts/BiensContext";
import type { StatutBien } from "../../Types/Types";
import { useNavigate } from "react-router-dom";
import { useBiensAdminContext } from "../../AdminContexts/BiensAdminContext";


const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffSeconds = Math.floor(
        (now.getTime() - date.getTime()) / 1000
    );

    if (diffSeconds < 60) {
        return `${diffSeconds} seconde${diffSeconds > 1 ? "s" : ""}`;
    }

    const diffMinutes = Math.floor(diffSeconds / 60);

    if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
    }

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours < 24) {
        return `${diffHours} heure${diffHours > 1 ? "s" : ""}`;
    }

    const diffDays = Math.floor(diffHours / 24);

    return `${diffDays} jour${diffDays > 1 ? "s" : ""}`;
};


const BienDetailsHeader = () => {

    const {currentBien} = useBiensContext();
    const {setBienDelete, setShowDeletePop} = useBiensAdminContext();

    const statutStyle: Record<StatutBien, string> = {
            DISPONIBLE: "bg-green-100 text-green-700",
            RESERVE: "bg-yellow-100 text-yellow-700",
            VENDU: "bg-red-100 text-red-700",
            LOUE: "bg-blue-100 text-blue-700",
            "": "bg-gray-100 text-gray-700",
        };

    const navigate = useNavigate();

    return(
        <div className="flex flex-col gap-1 w-full max-[600px]:gap-3">
             <div onClick={()=>navigate(-1)}
                className="text-[#222344] underline cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                >
                        ← Retour aux biens
                     </div>
                     <div className="flex flex-row justify-between items-center w-full max-[600px]:flex-col
                     max-[600px]:justify-center max-[600px]:items-baseline max-[600px]:gap-2
                     ">
                    <div className="flex flex-row items-center gap-1 text-[14px]">
                      <p>
                        Dernière modification : 
                        </p>    
                        <p>
                            il y a {formatTimeAgo(currentBien!.updatedAt)}
                        </p>

                       
                    </div> 
                      <div className="flex flex-row items-center gap-2">
                            <a
                            href="#modify"
                            className="bg-[#222344] text-white text-[14px] cursor-pointer
                            transition-opacity duration-200 hover:opacity-80 active:opacity-60
                            p-2 rounded-[5px] font-[600]
                            "> 
                               <i className="fa-solid fa-pen"></i> Modifier
                            </a>

                            <button  
                            className="bg-red-600 text-white text-[14px] cursor-pointer
                            transition-opacity duration-200 hover:opacity-80 active:opacity-60
                            p-2 rounded-[5px] font-[600]
                            "
                            onClick={()=>{
                                setBienDelete(currentBien);
                                setShowDeletePop(true)
                            }}
                            >
                                <i className="fa-solid fa-delete-left"></i> Supprimer
                            </button>

                         </div>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                         <span className={`text-[12px] px-2 py-[3px] rounded-[5px] font-[600] ${statutStyle[currentBien!.statut]}`}>
                                                {currentBien!.statut}
                        </span>

                        <div className="text-[12px] text-gray-50 bg-[#222344] px-2 py-[3px] rounded-[5px] font-[600]">
                            {currentBien?.service}
                        </div>

                        <div className="text-[12px] text-gray-50 bg-[#222344] px-2 py-[3px] rounded-[5px] font-[600]">
                            {currentBien?.type}
                        </div>
                    </div>
                 </div>
    )
}

export default memo(BienDetailsHeader);
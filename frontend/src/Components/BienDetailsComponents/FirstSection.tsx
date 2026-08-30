import { memo } from "react"
import { useBiensContext } from "../../Contexts/BiensContext";
import {
  CircleCheck,
  Clock3,
  Home,
  KeyRound,
  CircleDollarSign,
  type LucideIcon,
} from "lucide-react";


interface StatutConfig {
  label: string;
  icon: LucideIcon;
  textColor: string;
  bgColor: string;
}

const statutBienConfig: Record<
  Exclude<StatutBien, "">,
  StatutConfig
> = {
  DISPONIBLE: {
    label: "Disponible",
    icon: CircleCheck,
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },

  RESERVE: {
    label: "Réservé",
    icon: Clock3,
    textColor: "text-amber-600",
    bgColor: "bg-amber-50",
  },

  VENDU: {
    label: "Vendu",
    icon: CircleDollarSign,
    textColor: "text-red-600",
    bgColor: "bg-red-50",
  },

  LOUE: {
    label: "Loué",
    icon: KeyRound,
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
};


const FirstSection = () => {

    const {currentBien} = useBiensContext();

    const statut = currentBien?.statut;
    return(
        <div className="w-full flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                {statut && statut !== "" && (
                <div
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 
                    ${statutBienConfig[statut].bgColor}
                    ${statutBienConfig[statut].textColor}`}
                >
                    {(() => {
                    const Icon = statutBienConfig[statut].icon;

                    return (
                        <>
                        <Icon size={15} strokeWidth={2.2} />
                        <span className="text-sm font-medium">
                            {statutBienConfig[statut].label}
                        </span>
                        </>
                    );
                    })()}
                </div>
                )}
            <div className="flex flex-row gap-3 items-center">
                <button className="bg-[#222344] text-white px-2 py-1 text-[15px] font-[600] rounded-[5px]
                transition-transform duration-200 hover:scale-105
                ">
                    En {currentBien?.service === "LOCATION" ? "Location" : "Vente"}
                </button>
                <button className="bg-[#222344] text-white px-2 py-1 text-[15px] font-[600] rounded-[5px]
                transition-transform duration-200 hover:scale-105
                ">
                    {currentBien?.type}
                </button>
            </div>
            </div>
        <div className="flex flex-row items-center justify-between max-[1350px]:flex-col
        max-[1350px]:items-baseline max-[1350px]:gap-5
        ">
           <div className="flex flex-col gap-3">
            <p className="text-[2em] font-bold leading-9">{currentBien?.service === "VENTE" ? "Vente" : "Location"} {currentBien?.nom}</p>
            <div className="flex flex-row items-center gap-1 text-[15px] font-[500] text-gray-800">
                <i className="fa-solid fa-location-dot"></i>
                <p>{currentBien?.localisation}</p>
            </div>

            <a
            href="#visite"
            className="bg-[#222344] text-[#cdad7d] w-[190px] text-[15px] py-2 rounded-[5px] font-[600]
            cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 hidden max-[850px]:flex
            flex-row  items-center justify-center

            ">
               Réserver une visite <i className="fa-solid fa-location-arrow ml-1"></i> 
            </a>

           </div>
         
           <div className="flex flex-col gap-1">
         
            <p className="text-[#222344] text-[2em] font-bold">{currentBien?.prix} DA</p>
            <div className="flex flex-row items-center gap-3 ">
                <button className="bg-white px-2 py-1 text-[15px] border-2 rounded-[5px] border-black
                cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60
                ">
                    <i className="fa-solid fa-share-nodes"></i> Share
                </button>

                <button className="bg-white px-2 py-1 text-[15px] border-2 rounded-[5px] border-black
                cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60
                ">
                   <i className="fa-regular fa-heart"></i> Favorite
                </button>

                <button className="bg-white px-2 py-1 text-[15px] border-2 rounded-[5px] border-black
                cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60
                ">
                    <i className="fa-solid fa-print"></i> Print
                </button>
            </div>
           </div>
        </div>
        </div>
    )
}

export default memo(FirstSection);
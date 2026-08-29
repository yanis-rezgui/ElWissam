import { memo } from "react";
import { useBiensContext } from "../../Contexts/BiensContext"
import Icon from "../../Icons/Icons";


const Infos = () => {

    const {currentBien} = useBiensContext();

    return(

        <div className="bg-white w-full p-5 rounded-[10px] shadow-2xl mt-10">
            <p className="text-[1.6em] font-bold">Informations</p>
            <div className="mt-5 flex flex-row w-full items-center justify-between">
                <div className="flex flex-col gap-1 items-center">
                    <p className="text-[17px] font-bold">ID</p>
                    <p className="text-[15px]">{currentBien?.id.slice(0,10)}</p>
                </div>

                <div className="flex flex-col gap-1 items-center">
                    <Icon name="Grid2x2" size={35}/>
                    <p>{currentBien?.superficie} m²</p>
                </div>

                <div className="flex flex-col gap-1 items-center">
                    <Icon name="ShoppingBag" size={35}/>
                    <p>{currentBien?.service === "VENTE" ? "À vendre" : "À louer"}</p>
                </div>
            </div>
        </div>
    )
}

export default memo(Infos);
import { memo } from "react";
import { useBiensContext } from "../../Contexts/BiensContext"


const DetailsTypes = () => {

    const {biensStats} = useBiensContext();

    return(
        <div
        className="w-[400px] flex flex-col gap-3  bg-white shadow-2xl p-4 rounded-[10px]
         max-[450px]:w-[300px] w-full
         "
        >
            <p className="text-[1.1em] font-bold">
                Liste des Types</p>

            <div className="flex flex-col mt-1 gap-1">
                <div className="flex flex-row w-full justify-between items-center
                border-b border-b-gray-300 py-2
                ">
                    <p>Total</p>
                    <p>({biensStats.totalBiens})</p>
                </div>


                {Object.entries(biensStats.biensParType).map(([type, nombre]) => (
                    <div key={type}
                    className="flex flex-row w-full justify-between items-center
                    border-b border-b-gray-300 py-2
                    "
                    >
                        <p className="text-[15px]">{type}</p>
                        <p>({nombre})</p>
                    </div>
                ))}

                
            </div>
        </div>
    )
}

export default memo(DetailsTypes);
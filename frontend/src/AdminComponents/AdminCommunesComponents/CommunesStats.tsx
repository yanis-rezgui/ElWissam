import { memo } from "react";
import { useAdminCommuneContext } from "../../AdminContexts/AdminCommuneContext";
import Icon from "../../Icons/Icons";

const CommunesStats = () => {

    const { totalCommunes, totalActive, totalNotActive } = useAdminCommuneContext();

    return (
        <div className="flex flex-row flex-wrap justify-center items-center gap-4 mt-6
        max-[500px]:gap-3">

            <div className="bg-white border border-gray-300 rounded-[10px] shadow-md p-4 w-[180px]
            flex flex-col gap-1">
                <div className="flex flex-row items-center gap-2 text-[#222344]">
                    <Icon name="MapPin" size={22} />
                    <p className="text-[14px] font-[600]">Total communes</p>
                </div>
                <p className="text-[1.8em] font-bold text-[#222344]">{totalCommunes}</p>
            </div>

            <div className="bg-white border border-gray-300 rounded-[10px] shadow-md p-4 w-[180px]
            flex flex-col gap-1">
                <div className="flex flex-row items-center gap-2 text-green-700">
                    <Icon name="CircleCheck" size={22} />
                    <p className="text-[14px] font-[600]">Actives</p>
                </div>
                <p className="text-[1.8em] font-bold text-green-700">{totalActive}</p>
            </div>

            <div className="bg-white border border-gray-300 rounded-[10px] shadow-md p-4 w-[180px]
            flex flex-col gap-1">
                <div className="flex flex-row items-center gap-2 text-red-600">
                    <Icon name="CircleX" size={22} />
                    <p className="text-[14px] font-[600]">Inactives</p>
                </div>
                <p className="text-[1.8em] font-bold text-red-600">{totalNotActive}</p>
            </div>

        </div>
    );
};

export default memo(CommunesStats);
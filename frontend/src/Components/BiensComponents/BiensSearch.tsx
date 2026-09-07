import { memo } from "react";
import { useBiensContext } from "../../Contexts/BiensContext";
import { Search } from "lucide-react";

const BiensSearch = () => {
    const { setBiensFilter, biensFilter } = useBiensContext();

    return (
        <div className="flex flex-col bg-[#222344] w-[700px] rounded-2xl p-4 text-gray-100
        shadow-xl mt-6 max-[750px]:w-[400px] max-[450px]:w-[350px]">

            <p className="text-[18px] font-bold">Trouve ton prochain bien</p>
            <p className="text-[13px] text-gray-300 mt-0.5">Recherche par nom, quartier ou ville</p>

            <div className="flex flex-row items-center justify-center w-full mt-4 gap-3
            max-[750px]:flex-col max-[750px]:items-stretch">

                <select
                    className="p-2.5 bg-gray-50 text-[#222344] rounded-lg text-[14px] font-medium cursor-pointer
                    border border-transparent focus:outline-none focus:ring-2 focus:ring-[#cdad7d]
                    max-[750px]:w-full"
                    value={biensFilter.service}
                    onChange={(e) =>
                        setBiensFilter({ ...biensFilter, service: e.target.value })
                    }
                >
                    <option value="">Tout</option>
                    <option value="VENTE">Vente</option>
                    <option value="LOCATION">Location</option>
                </select>

                <div className="relative max-[750px]:w-full">
                    <input
                        type="text"
                        value={biensFilter.search}
                        onChange={(e) =>
                            setBiensFilter({ ...biensFilter, search: e.target.value })
                        }
                        placeholder="Localisation ou nom du bien..."
                        className="w-[400px] text-[14px] border border-transparent pl-4 pr-10
                        h-[42px] rounded-lg resize-none bg-gray-50 text-[#222344]
                        focus:outline-none focus:ring-2 focus:ring-[#cdad7d]
                        max-[750px]:w-full"
                    />
                    <Search
                        size={18}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#222344]/70 pointer-events-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default memo(BiensSearch);
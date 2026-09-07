import { memo } from "react";
import { useBiensContext } from "../../Contexts/BiensContext";
import { RotateCcw } from "lucide-react";

const emptyFilters = { service: "", type: "", prixMin: undefined, prixMax: undefined, search: "" };

const BiensFilters = () => {
    const { biensFilter, setBiensFilter } = useBiensContext();

    return (
        <div className="flex flex-col bg-[#222344] w-[280px] rounded-2xl p-4 text-gray-100
        shadow-xl mt-6 gap-4 max-[450px]:w-[300px]">

            <div className="flex items-center justify-between">
                <p className="text-[17px] font-bold">Filtrer</p>
                <button
                    onClick={() => setBiensFilter(emptyFilters)}
                    className="flex items-center gap-1 text-[12px] text-[#cdad7d] hover:text-white
                    transition-colors duration-200 cursor-pointer"
                >
                    <RotateCcw size={12} /> Réinitialiser
                </button>
            </div>

            <div className="flex flex-col gap-1.5">
                <p className="text-[13px] font-semibold text-gray-300">Type de bien</p>
                <select
                    className="p-2.5 bg-gray-50 text-[#222344] rounded-lg text-[14px] font-medium cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-[#cdad7d]"
                    value={biensFilter.type}
                    onChange={(e) => setBiensFilter({ ...biensFilter, type: e.target.value })}
                >
                    <option value="">Tous</option>
                    <option value="APPARTEMENT">Appartement</option>
                    <option value="TERRAIN">Terrain</option>
                    <option value="LOCAL">Local</option>
                    <option value="VILLA">Villa</option>
                </select>
            </div>

            <div className="flex flex-col gap-1.5">
                <p className="text-[13px] font-semibold text-gray-300">Service</p>
                <select
                    className="p-2.5 bg-gray-50 text-[#222344] rounded-lg text-[14px] font-medium cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-[#cdad7d]"
                    value={biensFilter.service}
                    onChange={(e) => setBiensFilter({ ...biensFilter, service: e.target.value })}
                >
                    <option value="">Tout</option>
                    <option value="VENTE">Vente</option>
                    <option value="LOCATION">Location</option>
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-[13px] font-semibold text-gray-300">Budget (DA)</p>
                <div className="flex flex-row gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={biensFilter.prixMin ?? ""}
                        onChange={(e) =>
                            setBiensFilter({ ...biensFilter, prixMin: Number(e.target.value) || undefined })
                        }
                        className="p-2.5 bg-gray-50 text-[#222344] rounded-lg text-[14px] w-1/2
                        focus:outline-none focus:ring-2 focus:ring-[#cdad7d]"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={biensFilter.prixMax ?? ""}
                        onChange={(e) =>
                            setBiensFilter({ ...biensFilter, prixMax: Number(e.target.value) || undefined })
                        }
                        className="p-2.5 bg-gray-50 text-[#222344] rounded-lg text-[14px] w-1/2
                        focus:outline-none focus:ring-2 focus:ring-[#cdad7d]"
                    />
                </div>
            </div>
        </div>
    );
};

export default memo(BiensFilters);
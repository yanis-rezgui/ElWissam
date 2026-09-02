import { memo, useState } from "react";
import type { Bien } from "../../Types/Types";

const DetailsSupplementaires = ({
    modifBien,
    setModifBien,
    hideStatut = false
}: {
    modifBien: Bien | null;
    setModifBien: (b: Bien | null) => void;
    hideStatut?: boolean;
}) => {
    const [feature, setFeature] = useState<string>("");

    const addFeature = () => {
        if (!feature || feature.trim() === "") return;
        setModifBien({
            ...modifBien!,
            features: [...(modifBien?.features || []), feature.trim()]
        });
        setFeature("");
    };

    const removeFeature = (index: number) => {
        setModifBien({
            ...modifBien!,
            features: modifBien!.features.filter((_, i) => i !== index)
        });
    };

    return (
        <div className="flex flex-col gap-3 w-full bg-white p-3 rounded-[10px] shadow-2xl">
            <p className="text-[1.4em] font-bold underline">Détails supplémentaires:</p>

            <div className="flex flex-row w-full items-center justify-between mt-3 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-3">
                {!hideStatut && (
                    <div className="flex flex-col gap-2 w-[48%] max-[600px]:w-full">
                        <p className="text-[15px] font-[600]">Statut:</p>
                        <select
                            value={modifBien?.statut}
                            onChange={(e) => setModifBien({ ...modifBien!, statut: e.target.value as Bien["statut"] })}
                            className="p-2 bg-gray-100 text-[#222344] rounded-[5px] text-[15px] w-full border border-gray-300 cursor-pointer"
                        >
                            <option value="DISPONIBLE">Disponible</option>
                            <option value="RESERVE">Réservé</option>
                            <option value="VENDU">Vendu</option>
                            <option value="LOUE">Loué</option>
                        </select>
                    </div>
                )}

                <div className={`flex flex-col gap-2 max-[600px]:w-full ${hideStatut ? "w-full" : "w-[48%]"}`}>
                    <p className="text-[15px] font-[600]">Négociable:</p>
                    <div
                        onClick={() => setModifBien({ ...modifBien!, negociable: !modifBien?.negociable })}
                        className={`flex items-center gap-2 p-2 rounded-[5px] border border-gray-300 cursor-pointer select-none
                        transition-colors duration-200
                        ${modifBien?.negociable ? "bg-[#222344] text-white" : "bg-gray-100 text-[#222344]"}`}
                    >
                        <i className={`fa-solid ${modifBien?.negociable ? "fa-circle-check" : "fa-circle"}`}></i>
                        <p className="text-[15px] font-[600]">
                            {modifBien?.negociable ? "Prix négociable" : "Prix fixe"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-3">
                <p className="text-[15px] font-[600]">Caractéristiques:</p>

                <div className="flex flex-row gap-2 items-center max-[600px]:flex-col max-[600px]:items-stretch">
                    <input
                        type="text"
                        value={feature}
                        onChange={(e) => setFeature(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addFeature();
                            }
                        }}
                        placeholder="Ex: Piscine, Garage, Climatisation..."
                        className="p-2 bg-gray-100 text-[#222344] rounded-[5px] text-[15px] w-full border border-gray-300"
                    />
                    <button
                        type="button"
                        onClick={addFeature}
                        className="bg-[#222344] text-white text-[14px] cursor-pointer
                        transition-opacity duration-200 hover:opacity-80 active:opacity-60
                        p-2 rounded-[5px] font-[600] whitespace-nowrap"
                    >
                        <i className="fa-solid fa-plus"></i> Ajouter
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    {modifBien?.features?.map((f, i) => (
                        <div
                            key={i}
                            className="flex flex-row items-center gap-2 bg-gray-100 border border-gray-300 
                            px-3 py-1 rounded-[5px] text-[13px] font-[600] text-[#222344]"
                        >
                            <p>{f}</p>
                            <i
                                onClick={() => removeFeature(i)}
                                className="fa-solid fa-xmark cursor-pointer text-red-600 hover:opacity-70"
                            ></i>
                        </div>
                    ))}
                    {(!modifBien?.features || modifBien.features.length === 0) && (
                        <p className="text-[13px] text-gray-400 italic">Aucune caractéristique ajoutée</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(DetailsSupplementaires);
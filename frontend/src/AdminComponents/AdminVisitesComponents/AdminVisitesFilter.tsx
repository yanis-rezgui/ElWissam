import { memo } from "react";
import { useAdminVisitesContext } from "../../AdminContexts/AdminVisitesContext";

const DEFAULT_STATUT = "";

const AdminVisitesFilter = () => {
    const { statut, setStatut, setSearch, deleteTerminee, loadingDeleteTerminee, deleteAnnulee, loadingDeleteAnnulee } =
        useAdminVisitesContext();

    const handleReset = () => {
        setStatut(DEFAULT_STATUT);
        setSearch("");
    };

    return (
        <div className="flex flex-col bg-[#222344] w-[400px] rounded-[10px] p-3 text-gray-100
        shadow-2xl mt-10 gap-2 max-[450px]:w-[300px]">
            <div className="flex flex-row items-center justify-between">
                <p className="text-[1.4em] font-bold">Filtrer</p>
                <button
                    onClick={handleReset}
                    className="text-[13px] font-[600] bg-gray-100 text-[#222344] px-3 py-1 rounded-[5px]
                    cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                >
                    <i className="fa-solid fa-rotate-left mr-1"></i>
                    Réinitialiser
                </button>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-[15px] font-[600]">Statut :</p>
                <select
                    className="p-2 bg-gray-50 text-[#222344] rounded-[5px] text-[15px] cursor-pointer w-full"
                    value={statut}
                    onChange={(e) => setStatut(e.target.value)}
                >
                    <option value="">Tous</option>
                    <option value="EN_ATTENTE">En attente</option>
                    <option value="CONTACTE">Contacté</option>
                    <option value="VISITE_CONFIRMEE">Visite confirmée</option>
                    <option value="TERMINEE">Terminée</option>
                    <option value="ANNULEE">Annulée</option>
                </select>
            </div>

            {/* Actions de suppression groupée */}
            <div className="flex flex-col gap-2 mt-3 border-t border-gray-500 pt-3">
                <p className="text-[14px] font-[600] text-gray-300">Suppressions groupées</p>
                <button
                    onClick={deleteTerminee}
                    disabled={loadingDeleteTerminee}
                    className="w-full bg-gray-600 text-white text-[13px] font-[600] py-2 rounded-[5px]
                    cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loadingDeleteTerminee ? (
                        <><i className="fa-solid fa-spinner fa-spin"></i> Suppression...</>
                    ) : (
                        <><i className="fa-solid fa-trash"></i> Supprimer toutes les terminées</>
                    )}
                </button>
                <button
                    onClick={deleteAnnulee}
                    disabled={loadingDeleteAnnulee}
                    className="w-full bg-red-700 text-white text-[13px] font-[600] py-2 rounded-[5px]
                    cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loadingDeleteAnnulee ? (
                        <><i className="fa-solid fa-spinner fa-spin"></i> Suppression...</>
                    ) : (
                        <><i className="fa-solid fa-trash"></i> Supprimer toutes les annulées</>
                    )}
                </button>
            </div>
        </div>
    );
};

export default memo(AdminVisitesFilter);
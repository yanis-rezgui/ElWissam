import { memo } from "react";
import { useAdminVisitesContext } from "../../AdminContexts/AdminVisitesContext";

const DeleteVisitePop = () => {
    const { visiteDelete, loadingDeleteVisite, deleteVisite, setShowDeletePop } =
        useAdminVisitesContext();

    return (
        <div
            onClick={() => setShowDeletePop(false)}
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="max-w-[400px] w-full relative bg-white flex flex-col items-center rounded-[10px] p-5"
            >
                <h3 className="text-[1.2em] mt-5 underline text-[#222344] font-[600] text-center px-3">
                    Êtes-vous sûr de vouloir supprimer la demande de :
                </h3>

                <p className="text-[1.1em] font-[600] text-[#222344] mt-2 text-center px-3">
                    {visiteDelete?.nom}
                </p>

                <p className="text-[14px] text-gray-500 mt-1 text-center">
                    {visiteDelete?.email}
                </p>

                {visiteDelete?.bien?.images?.[0] && (
                    <img
                        src={visiteDelete.bien.images[0]}
                        className="w-[250px] h-[150px] object-cover rounded-[10px] mt-5 border border-gray-300"
                        alt=""
                    />
                )}

                {visiteDelete?.bien?.nom && (
                    <p className="text-[13px] font-[600] text-[#222344] mt-2">
                        {visiteDelete.bien.nom}
                    </p>
                )}

                <div className="flex flex-row justify-center items-center gap-3 mt-6 w-full max-[600px]:flex-col">
                    <button
                        onClick={() => setShowDeletePop(false)}
                        className="w-[120px] max-[600px]:w-full bg-gray-200 text-[#222344] text-[14px] font-[600] py-2
                        rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                    >
                        Annuler
                    </button>

                    <button
                        onClick={() => deleteVisite(visiteDelete!.id)}
                        disabled={loadingDeleteVisite}
                        className="w-[140px] max-[600px]:w-full bg-red-600 text-white text-[14px] font-[600] py-2
                        rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2"
                    >
                        {loadingDeleteVisite ? (
                            <><i className="fa-solid fa-spinner fa-spin"></i> Suppression...</>
                        ) : (
                            <><i className="fa-solid fa-trash"></i> Oui, Supprimer</>
                        )}
                    </button>
                </div>

                <i
                    onClick={() => setShowDeletePop(false)}
                    className="fa-solid fa-xmark absolute top-3 right-3 text-[1.5em] text-[#222344] cursor-pointer
                    transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                ></i>
            </div>
        </div>
    );
};

export default memo(DeleteVisitePop);
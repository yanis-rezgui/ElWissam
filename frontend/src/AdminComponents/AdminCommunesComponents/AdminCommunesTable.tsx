import { memo } from "react";
import type { Commune } from "../../Types/Types";
import { useAdminCommuneContext } from "../../AdminContexts/AdminCommuneContext";

const AdminCommunesTable = ({ onSelectCommune }: { onSelectCommune: (commune: Commune) => void }) => {

    const {
        communes,
        loadingAllCommunes,
        page,
        setPage,
        limit,
        setLimit,
        total,
        totalPages,
        setShowUpdatePop,
        setShowDeletePop
    } = useAdminCommuneContext();

    return (
        <div className="w-[90%] max-w-[1000px] mt-8 mb-10 flex flex-col gap-4">

            {/* DESKTOP TABLE */}
            <div className="hidden md:block bg-white rounded-[10px] shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#222344] text-white text-[14px]">
                        <tr>
                            <th className="p-3">Image</th>
                            <th className="p-3">Nom</th>
                            <th className="p-3">Statut</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadingAllCommunes && (
                            <tr>
                                <td colSpan={4} className="p-5 text-center text-[15px] text-gray-600">
                                    Chargement...
                                </td>
                            </tr>
                        )}

                        {!loadingAllCommunes && communes.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-5 text-center text-[15px] text-gray-600">
                                    Aucune commune trouvée
                                </td>
                            </tr>
                        )}

                        {!loadingAllCommunes && communes.map((commune) => (
                            <tr key={commune.id} className="border-t border-gray-200 text-[14px]">
                                <td className="p-3">
                                    {commune.imageUrl ? (
                                        <img
                                            src={commune.imageUrl}
                                            alt={commune.name}
                                            className="w-[50px] h-[50px] object-cover rounded-[5px]"
                                        />
                                    ) : (
                                        <div className="w-[50px] h-[50px] bg-gray-200 rounded-[5px] flex items-center justify-center text-gray-400 text-[11px]">
                                            N/A
                                        </div>
                                    )}
                                </td>
                                <td className="p-3 font-[600] text-[#222344]">{commune.name}</td>
                                <td className="p-3">
                                    <span
                                        style={{ color: commune.active ? "green" : "red" }}
                                        className="font-[500] underline"
                                    >
                                        {commune.active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <div className="flex flex-row gap-2 justify-center items-center">
                                        <button
                                            onClick={() => {
                                                onSelectCommune(commune);
                                                setShowUpdatePop(true);
                                            }}
                                            className="bg-[#0F172A] text-white text-[13px] font-bold px-3 h-[32px] rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i> Modifier
                                        </button>

                                        <button
                                            onClick={() => {
                                                onSelectCommune(commune);
                                                setShowDeletePop(true);
                                            }}
                                            className="bg-[#7e2c17] text-white text-[13px] font-bold px-3 h-[32px] rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                                        >
                                            <i className="fa-solid fa-delete-left"></i> Supprimer
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="flex md:hidden flex-col gap-3">
                {loadingAllCommunes && (
                    <p className="text-center text-[15px] text-gray-600">Chargement...</p>
                )}

                {!loadingAllCommunes && communes.length === 0 && (
                    <p className="text-center text-[15px] text-gray-600">Aucune commune trouvée</p>
                )}

                {!loadingAllCommunes && communes.map((commune) => (
                    <div key={commune.id} className="bg-white border border-gray-300 rounded-[10px] p-3 flex flex-row gap-3 items-center shadow-md">
                        {commune.imageUrl ? (
                            <img
                                src={commune.imageUrl}
                                alt={commune.name}
                                className="w-[60px] h-[60px] object-cover rounded-[5px] shrink-0"
                            />
                        ) : (
                            <div className="w-[60px] h-[60px] bg-gray-200 rounded-[5px] flex items-center justify-center text-gray-400 text-[11px] shrink-0">
                                N/A
                            </div>
                        )}

                        <div className="flex flex-col gap-1 flex-1">
                            <p className="font-[600] text-[#222344] text-[15px]">{commune.name}</p>
                            <p
                                style={{ color: commune.active ? "green" : "red" }}
                                className="font-[500] underline text-[13px]"
                            >
                                {commune.active ? "Active" : "Inactive"}
                            </p>

                            <div className="flex flex-row gap-2 mt-1">
                                <button
                                    onClick={() => {
                                        onSelectCommune(commune);
                                        setShowUpdatePop(true);
                                    }}
                                    className="bg-[#0F172A] text-white text-[12px] font-bold px-2 h-[30px] rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                                >
                                    <i className="fa-solid fa-pen-to-square"></i> Modifier
                                </button>

                                <button
                                    onClick={() => {
                                        onSelectCommune(commune);
                                        setShowDeletePop(true);
                                    }}
                                    className="bg-[#7e2c17] text-white text-[12px] font-bold px-2 h-[30px] rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                                >
                                    <i className="fa-solid fa-delete-left"></i> Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="flex flex-row justify-center items-center gap-3 mt-4 flex-wrap">
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage(page - 1)}
                        className="bg-[#222344] text-white text-[13px] font-[600] px-3 h-[32px] rounded-[5px]
                        cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60
                        disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Précédent
                    </button>

                    <p className="text-[14px] font-[600] text-[#222344]">
                        Page {page} / {totalPages} ({total} résultats)
                    </p>

                    <button
                        disabled={page >= totalPages}
                        onClick={() => setPage(page + 1)}
                        className="bg-[#222344] text-white text-[13px] font-[600] px-3 h-[32px] rounded-[5px]
                        cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60
                        disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Suivant
                    </button>

                    <select
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className="border border-gray-300 rounded-[5px] p-1 text-[13px] bg-gray-100"
                    >
                        <option value={10}>10 / page</option>
                        <option value={20}>20 / page</option>
                        <option value={50}>50 / page</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default memo(AdminCommunesTable);
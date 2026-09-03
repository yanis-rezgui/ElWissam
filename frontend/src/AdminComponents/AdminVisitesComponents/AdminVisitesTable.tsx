import { memo, useState } from "react";
import { motion } from "framer-motion";
import { useAdminVisitesContext } from "../../AdminContexts/AdminVisitesContext";
import type { DemandeVisite } from "../../Types/Types";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
};

const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const STATUTS = ["EN_ATTENTE", "CONTACTE", "VISITE_CONFIRMEE", "TERMINEE", "ANNULEE"] as const;

const statutStyle: Record<string, string> = {
    EN_ATTENTE: "bg-yellow-100 text-yellow-700",
    CONTACTE: "bg-blue-100 text-blue-700",
    VISITE_CONFIRMEE: "bg-green-100 text-green-700",
    TERMINEE: "bg-gray-200 text-gray-600",
    ANNULEE: "bg-red-100 text-red-700",
};

const statutLabel: Record<string, string> = {
    EN_ATTENTE: "En attente",
    CONTACTE: "Contacté",
    VISITE_CONFIRMEE: "Confirmée",
    TERMINEE: "Terminée",
    ANNULEE: "Annulée",
};

const formatDate = (d: string | Date) =>
    new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

// ---- Inline statut selector ----
const StatutSelector = ({ visite }: { visite: DemandeVisite }) => {
    const { updateStatut, loadingUpdateStatut } = useAdminVisitesContext();
    const [open, setOpen] = useState(false);

    const handleSelect = async (s: string) => {
        setOpen(false);
        await updateStatut(visite.id, s);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                disabled={loadingUpdateStatut}
                className={`text-[12px] px-2 py-[3px] rounded-[5px] font-[600] cursor-pointer
                transition-opacity duration-200 hover:opacity-80 active:opacity-60
                disabled:opacity-50 disabled:cursor-not-allowed
                ${statutStyle[visite.statut]}`}
            >
                {statutLabel[visite.statut]}
                <i className="fa-solid fa-chevron-down ml-1 text-[10px]"></i>
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute left-0 top-full mt-1 z-20 bg-white border border-gray-200
                    rounded-[8px] shadow-xl overflow-hidden min-w-[160px]">
                        {STATUTS.map((s) => (
                            <button
                                key={s}
                                onClick={() => handleSelect(s)}
                                className={`w-full text-left px-3 py-2 text-[12px] font-[600]
                                hover:bg-gray-100 transition-colors duration-150
                                ${visite.statut === s ? "opacity-50 cursor-default" : "cursor-pointer"}`}
                            >
                                <span className={`px-2 py-[2px] rounded-[4px] ${statutStyle[s]}`}>
                                    {statutLabel[s]}
                                </span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

// ---- Main table ----
const AdminVisitesTable = () => {
    const {
        visites,
        loadingDemandeVsites,
        page,
        setPage,
        totalPages,
        total,
        setShowDeletePop,
        setVisiteDelete,
    } = useAdminVisitesContext();

    return (
        <div className="w-full max-w-[1100px] mt-10 mb-10 px-3">
            {loadingDemandeVsites ? (
                <div className="flex justify-center items-center py-10 text-[#222344] font-[600]">
                    Chargement...
                </div>
            ) : visites.length === 0 ? (
                <div className="flex justify-center items-center py-10 text-gray-500 font-[500]">
                    Aucune visite trouvée.
                </div>
            ) : (
                <>
                    {/* ---- Vue desktop : tableau ---- */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="hidden md:block bg-white rounded-[10px] shadow-2xl overflow-hidden"
                    >
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#222344] text-[#cdad7d] text-[14px]">
                                    <th className="p-3 font-[600]">Demandeur</th>
                                    <th className="p-3 font-[600]">Bien</th>
                                    <th className="p-3 font-[600]">Date souhaitée</th>
                                    <th className="p-3 font-[600]">Statut</th>
                                    <th className="p-3 font-[600]">Message</th>
                                    <th className="p-3 font-[600] text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visites.map((visite) => (
                                    <motion.tr
                                        key={visite.id}
                                        variants={rowVariants}
                                        className="border-b border-gray-200 text-[#222344] text-[14px]
                                        hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <td className="p-3">
                                            <p className="font-[600]">{visite.nom}</p>
                                            <p className="text-[12px] text-gray-500">{visite.email}</p>
                                            <p className="text-[12px] text-gray-500">{visite.telephone}</p>
                                        </td>
                                        <td className="p-3">
                                            {visite.bien ? (
                                                <div className="flex items-center gap-2">
                                                    {visite.bien.images?.[0] && (
                                                        <img
                                                            src={visite.bien.images[0]}
                                                            alt={visite.bien.nom}
                                                            className="w-[40px] h-[40px] rounded-[6px] object-cover bg-gray-100 flex-shrink-0"
                                                        />
                                                    )}
                                                    <p className="font-[600] text-[13px]">{visite.bien.nom}</p>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-[13px]">—</span>
                                            )}
                                        </td>
                                        <td className="p-3 font-[600]">{formatDate(visite.dateSouhaitee)}</td>
                                        <td className="p-3">
                                            <StatutSelector visite={visite} />
                                        </td>
                                        <td className="p-3 max-w-[180px]">
                                            {visite.message ? (
                                                <p className="text-[13px] text-gray-600 truncate">{visite.message}</p>
                                            ) : (
                                                <span className="text-gray-400 text-[13px]">—</span>
                                            )}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex flex-row items-center justify-center">
                                                <button
                                                    onClick={() => {
                                                        setVisiteDelete(visite);
                                                        setShowDeletePop(true);
                                                    }}
                                                    className="cursor-pointer text-red-600 transition-opacity duration-200
                                                    hover:opacity-70 active:opacity-50"
                                                    title="Supprimer"
                                                >
                                                    <i className="fa-solid fa-trash text-[18px]"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>

                    {/* ---- Vue mobile : cartes ---- */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-3 md:hidden"
                    >
                        {visites.map((visite) => (
                            <motion.div
                                key={visite.id}
                                variants={rowVariants}
                                className="bg-white rounded-[10px] shadow-2xl p-3 flex flex-col gap-2"
                            >
                                {/* Header : nom + statut */}
                                <div className="flex flex-row items-start justify-between gap-2">
                                    <div>
                                        <p className="font-[600] text-[15px] text-[#222344]">{visite.nom}</p>
                                        <p className="text-[12px] text-gray-500">{visite.email}</p>
                                        <p className="text-[12px] text-gray-500">{visite.telephone}</p>
                                    </div>
                                    <StatutSelector visite={visite} />
                                </div>

                                {/* Bien */}
                                {visite.bien && (
                                    <div className="flex flex-row items-center gap-2">
                                        {visite.bien.images?.[0] && (
                                            <img
                                                src={visite.bien.images[0]}
                                                alt={visite.bien.nom}
                                                className="w-[40px] h-[40px] rounded-[6px] object-cover bg-gray-100 flex-shrink-0"
                                            />
                                        )}
                                        <p className="text-[13px] font-[600] text-[#222344]">{visite.bien.nom}</p>
                                    </div>
                                )}

                                {/* Date + message */}
                                <div className="flex flex-row items-center gap-2 flex-wrap">
                                    <span className="text-[12px] bg-gray-200 text-[#222344] px-2 py-[2px] rounded-[5px] font-[600]">
                                        <i className="fa-regular fa-calendar mr-1"></i>
                                        {formatDate(visite.dateSouhaitee)}
                                    </span>
                                </div>

                                {visite.message && (
                                    <p className="text-[13px] text-gray-600 italic border-l-2 border-gray-300 pl-2">
                                        {visite.message}
                                    </p>
                                )}

                                {/* Action supprimer */}
                                <div className="flex justify-end mt-1">
                                    <button
                                        onClick={() => {
                                            setVisiteDelete(visite);
                                            setShowDeletePop(true);
                                        }}
                                        className="cursor-pointer text-red-600 transition-opacity duration-200 active:opacity-50"
                                    >
                                        <i className="fa-solid fa-trash text-[18px]"></i>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* ---- Pagination ---- */}
                    <div className="flex flex-row items-center justify-center gap-4 mt-6 text-[#222344] text-[14px] font-[600]">
                        <button
                            disabled={page <= 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-3 py-1 rounded-[5px] bg-gray-200 disabled:opacity-40
                            disabled:cursor-not-allowed cursor-pointer hover:opacity-80 active:opacity-60
                            transition-opacity duration-200"
                        >
                            Précédent
                        </button>
                        <p>Page {page} / {totalPages} ({total} visites)</p>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-3 py-1 rounded-[5px] bg-gray-200 disabled:opacity-40
                            disabled:cursor-not-allowed cursor-pointer hover:opacity-80 active:opacity-60
                            transition-opacity duration-200"
                        >
                            Suivant
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default memo(AdminVisitesTable);
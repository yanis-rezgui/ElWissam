import { memo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useBiensContext } from "../../Contexts/BiensContext";
import Icon from "../../Icons/Icons";
import type { StatutBien } from "../../Types/Types";
import { useBiensAdminContext } from "../../AdminContexts/BiensAdminContext";

const AdminBiensTable = () => {
    const { biens, loadingBiens, page, setPage, totalPages, total } = useBiensContext();
    const { setShowDeletePop, setBienDelete} =useBiensAdminContext();
    const navigate = useNavigate();

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" },
        },
    };

    const formatPrix = (prix: number) =>
        new Intl.NumberFormat("fr-FR").format(prix) + " DA";

    const statutStyle: Record<StatutBien, string> = {
        DISPONIBLE: "bg-green-100 text-green-700",
        RESERVE: "bg-yellow-100 text-yellow-700",
        VENDU: "bg-red-100 text-red-700",
        LOUE: "bg-blue-100 text-blue-700",
        "": "bg-gray-100 text-gray-700",
    };

    return (
        <div className="w-full max-w-[1100px] mt-10 mb-10 px-3">

            {loadingBiens ? (
                <div className="flex justify-center items-center py-10 text-[#222344] font-[600]">
                    Chargement...
                </div>
            ) : biens.length === 0 ? (
                <div className="flex justify-center items-center py-10 text-gray-500 font-[500]">
                    Aucun bien trouvé.
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
                                    <th className="p-3 font-[600]">Bien</th>
                                    <th className="p-3 font-[600]">Type</th>
                                    <th className="p-3 font-[600]">Service</th>
                                    <th className="p-3 font-[600]">Statut</th>
                                    <th className="p-3 font-[600]">Prix</th>
                                    <th className="p-3 font-[600]">Superficie</th>
                                    <th className="p-3 font-[600]">Localisation</th>
                                    <th className="p-3 font-[600] text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {biens.map((bien) => (
                                    <motion.tr
                                        key={bien.id}
                                        variants={rowVariants}
                                        className="border-b border-gray-200 text-[#222344] text-[14px] hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <td className="p-3 flex flex-row items-center gap-3">
                                            <img
                                                src={bien.images?.[0]}
                                                alt={bien.nom}
                                                className="w-[50px] h-[50px] rounded-[8px] object-cover bg-gray-100"
                                            />
                                            <p className="font-[600]">{bien.nom}</p>
                                        </td>
                                        <td className="p-3">{bien.type}</td>
                                        <td className="p-3">{bien.service}</td>
                                        <td className="p-3">
                                            <span className={`text-[12px] px-2 py-[3px] rounded-[5px] font-[600] ${statutStyle[bien.statut]}`}>
                                                {bien.statut}
                                            </span>
                                        </td>
                                        <td className="p-3 font-[600]">{formatPrix(bien.prix)}</td>
                                        <td className="p-3">{bien.superficie} m²</td>
                                        <td className="p-3">{bien.localisation}</td>
                                        <td className="p-3">
                                            <div className="flex flex-row items-center justify-center gap-3">
                                                <div
                                                    onClick={() => navigate(`/admin/bien/${bien.id}`)}
                                                    className="cursor-pointer text-[#222344] transition-opacity duration-200 hover:opacity-70 active:opacity-50"
                                                    title="Détails"
                                                >
                                                    <Icon name="Eye" size={20} />
                                                </div>
                                                <div
                                                onClick={()=>{
                                                    setBienDelete(bien)
                                                    setShowDeletePop(true)
                                                
                                                }}
                                                    className="cursor-pointer text-red-600 transition-opacity duration-200 hover:opacity-70 active:opacity-50"
                                                    title="Supprimer"
                                                >
                                                    <Icon name="Trash2" size={20} />
                                                </div>
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
                        {biens.map((bien) => (
                            <motion.div
                                key={bien.id}
                                variants={rowVariants}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white rounded-[10px] shadow-2xl p-3 flex flex-row gap-3"
                            >
                                <img
                                    src={bien.images?.[0]}
                                    alt={bien.nom}
                                    className="w-[70px] h-[70px] rounded-[8px] object-cover bg-gray-100 flex-shrink-0"
                                />

                                <div className="flex flex-col flex-1 gap-1 text-[#222344]">
                                    <div className="flex flex-row items-start justify-between">
                                        <p className="font-[600] text-[15px]">{bien.nom}</p>
                                        <span className={`text-[11px] px-2 py-[2px] rounded-[5px] font-[600] whitespace-nowrap ${statutStyle[bien.statut]}`}>
                                            {bien.statut}
                                        </span>
                                    </div>

                                    <p className="text-[13px] text-gray-500">{bien.localisation} · {bien.superficie} m²</p>

                                    <div className="flex flex-row items-center gap-2 mt-1">
                                        <span className="text-[12px] bg-gray-200 px-2 py-[2px] rounded-[5px] font-[600]">
                                            {bien.type}
                                        </span>
                                        <span className="text-[12px] bg-gray-200 px-2 py-[2px] rounded-[5px] font-[600]">
                                            {bien.service}
                                        </span>
                                    </div>

                                    <div className="flex flex-row items-center justify-between mt-2">
                                        <p className="font-[700] text-[15px]">{formatPrix(bien.prix)}</p>

                                        <div className="flex flex-row items-center gap-3">
                                            <div
                                                onClick={() => navigate(`/admin/bien/${bien.id}`)}
                                                className="cursor-pointer text-[#222344] transition-opacity duration-200 active:opacity-50"
                                            >
                                                <Icon name="Eye" size={20} />
                                            </div>
                                            <div 
                                            onClick={()=>{
                                                setBienDelete(bien)
                                                setShowDeletePop(true)
                                            
                                            }}
                                            className="cursor-pointer text-red-600 transition-opacity duration-200 active:opacity-50">
                                                <Icon name="Trash2" size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* ---- Pagination ---- */}
                    <div className="flex flex-row items-center justify-center gap-4 mt-6 text-[#222344] text-[14px] font-[600]">
                        <button
                            disabled={page <= 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-3 py-1 rounded-[5px] bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity duration-200"
                        >
                            Précédent
                        </button>
                        <p>Page {page} / {totalPages} ({total} biens)</p>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-3 py-1 rounded-[5px] bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity duration-200"
                        >
                            Suivant
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default memo(AdminBiensTable);
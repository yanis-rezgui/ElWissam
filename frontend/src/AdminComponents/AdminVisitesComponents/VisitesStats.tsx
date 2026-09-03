import { memo } from "react";
import { motion } from "framer-motion";
import { useAdminVisitesContext } from "../../AdminContexts/AdminVisitesContext";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const VisitesStats = () => {
    const { visitesStats } = useAdminVisitesContext();

    const stats = [
        { label: "Total", value: visitesStats.total },
        { label: "En attente", value: visitesStats.enAttente },
        { label: "Contacté", value: visitesStats.contacte },
        { label: "Confirmée", value: visitesStats.visiteConfirmee },
        { label: "Terminée", value: visitesStats.terminee },
        { label: "Annulée", value: visitesStats.annulee },
    ];

    return (
        <motion.div
            className="flex flex-wrap items-center gap-5 mt-7 px-3 justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {stats.map(({ label, value }) => (
                <motion.div
                    key={label}
                    variants={cardVariants}
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="w-[170px] p-2 flex flex-wrap justify-between items-center
                    bg-gray-300 shadow-2xl rounded-[10px] text-[#222344]
                    text-[15px] font-[600] cursor-default"
                >
                    <p>{label}</p>
                    <p>{value}</p>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default memo(VisitesStats);
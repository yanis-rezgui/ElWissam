
import { memo } from "react";
import { motion } from "framer-motion";
import { useBiensContext } from "../../Contexts/BiensContext";

const BiensStats = () => {
    const { biensStats } = useBiensContext();

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 15,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.div
            className="flex flex-wrap items-center gap-5 mt-7 px-3 justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Total */}
            <motion.div
                variants={cardVariants}
                whileHover={{
                    y: -3,
                    scale: 1.02,
                }}
                transition={{ duration: 0.2 }}
                className="w-[170px] p-2 flex flex-wrap justify-between items-center 
                bg-gray-300 shadow-2xl rounded-[10px] text-[#222344] 
                text-[15px] font-[600] cursor-default"
            >
                <p>Nombre de Biens</p>
                <p>{biensStats.totalBiens}</p>
            </motion.div>

            {/* Stats par type */}
            {Object.entries(biensStats.biensParType).map(([type, nombre]) => (
                <motion.div
                    key={type}
                    variants={cardVariants}
                    whileHover={{
                        y: -3,
                        scale: 1.02,
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-[170px] p-2 flex flex-wrap justify-between items-center 
                    bg-gray-300 shadow-2xl rounded-[10px] text-[#222344] 
                    text-[15px] font-[600] cursor-default"
                >
                    <p className="text-[15px]">{type}</p>
                    <p>{nombre}</p>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default memo(BiensStats);


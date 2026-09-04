import { memo } from "react";
import { motion } from "framer-motion";
import { useUsersAdminContext } from "../../AdminContexts/UsersAdminContext";

const UsersStats = () => {

    const { pagination, allUsers } = useUsersAdminContext();

    const adminsCount = allUsers.filter((u) => u.role === "ADMIN").length;

    return (
        <motion.div
            className="flex flex-wrap items-center gap-5 mt-7 px-3 justify-center"
            initial="hidden"
            animate="visible"
        >
            <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="w-[190px] p-2 flex flex-wrap justify-between items-center
                bg-gray-300 shadow-2xl rounded-[10px] text-[#222344]
                text-[15px] font-[600] cursor-default"
            >
                <p>Total Utilisateurs</p>
                <p>{pagination?.total ?? 0}</p>
            </motion.div>

            <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="w-[190px] p-2 flex flex-wrap justify-between items-center
                bg-gray-300 shadow-2xl rounded-[10px] text-[#222344]
                text-[15px] font-[600] cursor-default"
            >
                <p>Admins (page)</p>
                <p>{adminsCount}</p>
            </motion.div>
        </motion.div>
    );
};

export default memo(UsersStats);
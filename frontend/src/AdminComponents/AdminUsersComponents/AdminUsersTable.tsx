import { memo } from "react";
import { motion } from "framer-motion";
import { useUsersAdminContext } from "../../AdminContexts/UsersAdminContext";
import Icon from "../../Icons/Icons";

const roleStyle: Record<string, string> = {
    ADMIN: "bg-purple-100 text-purple-700",
    USER: "bg-blue-100 text-blue-700",
};

const AdminUsersTable = () => {

    const {
        allUsers,
        loadingAllUsers,
        currentPage,
        setCurrentPage,
        pagination,
        setUserDetails,
        setShowUpdateUserPop,
        setShowDeleteUserPop,
    } = useUsersAdminContext();

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.05 } },
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    };

    const initials = (firstName: string, lastName: string) =>
        `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

    return (
        <div className="w-full max-w-[1100px] mt-10 mb-10 px-3">

            {loadingAllUsers ? (
                <div className="flex justify-center items-center py-10 text-[#222344] font-[600]">
                    Chargement...
                </div>
            ) : allUsers.length === 0 ? (
                <div className="flex justify-center items-center py-10 text-gray-500 font-[500]">
                    Aucun utilisateur trouvé.
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
                                    <th className="p-3 font-[600]">Utilisateur</th>
                                    <th className="p-3 font-[600]">Email</th>
                                    <th className="p-3 font-[600]">Rôle</th>
                                    <th className="p-3 font-[600] text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers.map((user) => (
                                    <motion.tr
                                        key={user.id}
                                        variants={rowVariants}
                                        className="border-b border-gray-200 text-[#222344] text-[14px] hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <td className="p-3 flex flex-row items-center gap-3">
                                            <div className="w-[40px] h-[40px] rounded-full bg-[#222344] text-[#cdad7d]
                                            flex items-center justify-center font-[700] text-[13px] flex-shrink-0">
                                                {initials(user.firstName, user.lastName)}
                                            </div>
                                            <p className="font-[600]">{user.firstName} {user.lastName}</p>
                                        </td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3">
                                            <span className={`text-[12px] px-2 py-[3px] rounded-[5px] font-[600] ${roleStyle[user.role] ?? "bg-gray-100 text-gray-700"}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex flex-row items-center justify-center gap-3">
                                                <div
                                                    onClick={() => {
                                                        setUserDetails(user);
                                                        setShowUpdateUserPop(true);
                                                    }}
                                                    className="cursor-pointer text-[#222344] transition-opacity duration-200 hover:opacity-70 active:opacity-50"
                                                    title="Modifier"
                                                >
                                                    <Icon name="Pencil" size={20} />
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setUserDetails(user);
                                                        setShowDeleteUserPop(true);
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
                        {allUsers.map((user) => (
                            <motion.div
                                key={user.id}
                                variants={rowVariants}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white rounded-[10px] shadow-2xl p-3 flex flex-row gap-3"
                            >
                                <div className="w-[50px] h-[50px] rounded-full bg-[#222344] text-[#cdad7d]
                                flex items-center justify-center font-[700] text-[15px] flex-shrink-0">
                                    {initials(user.firstName, user.lastName)}
                                </div>

                                <div className="flex flex-col flex-1 gap-1 text-[#222344]">
                                    <div className="flex flex-row items-start justify-between">
                                        <p className="font-[600] text-[15px]">{user.firstName} {user.lastName}</p>
                                        <span className={`text-[11px] px-2 py-[2px] rounded-[5px] font-[600] whitespace-nowrap ${roleStyle[user.role] ?? "bg-gray-100 text-gray-700"}`}>
                                            {user.role}
                                        </span>
                                    </div>

                                    <p className="text-[13px] text-gray-500 break-all">{user.email}</p>

                                    <div className="flex flex-row items-center justify-end gap-3 mt-2">
                                        <div
                                            onClick={() => {
                                                setUserDetails(user);
                                                setShowUpdateUserPop(true);
                                            }}
                                            className="cursor-pointer text-[#222344] transition-opacity duration-200 active:opacity-50"
                                        >
                                            <Icon name="Pencil" size={20} />
                                        </div>
                                        <div
                                            onClick={() => {
                                                setUserDetails(user);
                                                setShowDeleteUserPop(true);
                                            }}
                                            className="cursor-pointer text-red-600 transition-opacity duration-200 active:opacity-50"
                                        >
                                            <Icon name="Trash2" size={20} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* ---- Pagination ---- */}
                    <div className="flex flex-row items-center justify-center gap-4 mt-6 text-[#222344] text-[14px] font-[600]">
                        <button
                            disabled={currentPage <= 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="px-3 py-1 rounded-[5px] bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity duration-200"
                        >
                            Précédent
                        </button>
                        <p>Page {currentPage} / {pagination?.totalPages ?? 1} ({pagination?.total ?? 0} utilisateurs)</p>
                        <button
                            disabled={currentPage >= (pagination?.totalPages ?? 1)}
                            onClick={() => setCurrentPage(currentPage + 1)}
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

export default memo(AdminUsersTable);
import { memo } from "react";
import AdminUsersSearch from "../AdminComponents/AdminUsersComponents/AdminUsersSearch";
import AdminUsersTable from "../AdminComponents/AdminUsersComponents/AdminUsersTable";
import AdminUsersFilter from "../AdminComponents/AdminUsersComponents/AdminUsersFilter";
import UsersStats from "../AdminComponents/AdminUsersComponents/UsersStats";
import AddUserPop from "../AdminComponents/AdminUsersComponents/AddUserPop";
import UpdateUserPop from "../AdminComponents/AdminUsersComponents/UpdateUserPop";
import DeleteUserPop from "../AdminComponents/AdminUsersComponents/DeleteUserPop";
import { useUsersAdminContext } from "../AdminContexts/UsersAdminContext";

const AdminUsers = () => {

    const { showAddUserPop, showUpdateUserPop, showDeleteUserPop, setShowAddUserPop } = useUsersAdminContext();
 
    return (
        <>
            <section className="flex flex-col min-h-screen w-full items-center bg-gray-100">
                <AdminUsersSearch />

                <p className="mt-[90px] text-[#222344] font-bold text-center text-[1.8em]">
                    Gestion des utilisateurs
                </p>

                <p className="text-[16px] text-[#222344] text-center mt-2 w-[400px] leading-5.5
                max-[450px]:text-[15px] max-[450px]:w-[300px]">
                    Gérez l'ensemble des comptes utilisateurs de votre agence.
                    Ajoutez, modifiez les rôles et supprimez facilement les accès.
                </p>

                <button
                    className="bg-[#222344] text-white text-[14px] p-2 rounded-[5px] cursor-pointer
                    transition-opacity duration-200 hover:opacity-80 active:opacity-60 mt-3 font-[600]"
                    onClick={() => setShowAddUserPop(true)}
                >
                    + Ajouter un utilisateur
                </button>

                <UsersStats />
                <AdminUsersFilter />
                <AdminUsersTable />
            </section>

            {showAddUserPop && <AddUserPop />}
            {showUpdateUserPop && <UpdateUserPop />}
            {showDeleteUserPop && <DeleteUserPop />}
        </>
    );
};

export default memo(AdminUsers);
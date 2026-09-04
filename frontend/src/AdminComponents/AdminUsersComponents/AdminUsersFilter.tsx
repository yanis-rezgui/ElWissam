import { memo } from "react";
import { useUsersAdminContext } from "../../AdminContexts/UsersAdminContext";

const AdminUsersFilter = () => {

    const { role, setRole } = useUsersAdminContext();

    return (
        <div className="flex flex-col bg-[#222344] w-[400px] rounded-[10px] p-3 text-gray-100
        shadow-2xl mt-10 gap-2 max-[450px]:w-[300px]
        ">
            <p className="text-[1.4em] font-bold">Filtrer</p>

            <div className="flex flex-col gap-2">
                <p className="text-[15px] font-[600]">Rôle:</p>
                <select
                    className="p-2 bg-gray-50 text-[#222344] rounded-[5px] text-[15px] cursor-pointer w-full"
                    value={role ?? ""}
                    onChange={(e) => setRole(e.target.value === "" ? undefined : e.target.value)}
                >
                    <option value="">Tous</option>
                    <option value="ADMIN">Administrateur</option>
                    <option value="USER">Utilisateur</option>
                </select>
            </div>
        </div>
    );
};

export default memo(AdminUsersFilter);
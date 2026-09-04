import { memo } from "react";
import { useUsersAdminContext } from "../../AdminContexts/UsersAdminContext";

const UpdateUserPop = () => {

    const {
        setShowUpdateUserPop,
        updateUser,
        loadingUpdateUser,
        userDetails,
        setUserDetails,
        msg,
    } = useUsersAdminContext();

    const handleUpdate = async () => {

        if (!userDetails?.firstName || userDetails.firstName.trim() === "") return;
        if (!userDetails?.lastName || userDetails.lastName.trim() === "") return;
        if (!userDetails?.role) return;

        await updateUser(userDetails.id, userDetails.firstName, userDetails.lastName, userDetails.role);
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {

        const { name, value } = e.target;

        setUserDetails({
            ...userDetails!,
            [name]: value,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-[800px] h-[500px] bg-white flex flex-col rounded-[10px] overflow-y-auto"
            >
                <div className="px-4 py-2 flex flex-row w-full justify-between items-center border-b border-b-gray-300">
                    <p className="text-[1.5em] font-bold text-[#222344]">Modifier un Utilisateur</p>

                    <span
                        onClick={() => setShowUpdateUserPop(false)}
                        className="text-[2em] cursor-pointer text-[#222344] transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                    >&times;</span>
                </div>

                <div className="p-4 flex flex-col gap-3">

                    <div className="flex flex-row gap-3 max-[600px]:flex-col">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-[15px] font-[600] text-[#222344]">Prénom*</label>
                            <input
                                type="text"
                                name="firstName"
                                value={userDetails?.firstName ?? ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-100"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-[15px] font-[600] text-[#222344]">Nom*</label>
                            <input
                                type="text"
                                name="lastName"
                                value={userDetails?.lastName ?? ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-100"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[15px] font-[600] text-[#222344]">Email</label>
                        <input
                            type="email"
                            value={userDetails?.email ?? ""}
                            disabled
                            className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-200 text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[15px] font-[600] text-[#222344]">Rôle*</label>
                        <select
                            name="role"
                            value={userDetails?.role ?? "USER"}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-100"
                            required
                        >
                            <option value="USER">Utilisateur</option>
                            <option value="ADMIN">Administrateur</option>
                        </select>
                    </div>

                    <div className="h-[30px] flex justify-center items-center text-[15px] text-center text-red-600">
                        {msg && <span>{msg}</span>}
                    </div>

                    <button
                        className="bg-[#222344] text-white font-bold text-[15px] w-full cursor-pointer
                        transition-opacity duration-200 hover:opacity-80 active:opacity-60 py-2 rounded-[5px] mt-2"
                        disabled={loadingUpdateUser}
                        onClick={handleUpdate}
                    >
                        {loadingUpdateUser ? "Modification..." : "Modifier"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(UpdateUserPop);
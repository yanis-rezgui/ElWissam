import { memo, useState } from "react";
import { useUsersAdminContext } from "../../AdminContexts/UsersAdminContext";

const AddUserPop = () => {

    const { setShowAddUserPop, addUser, loadingAddUser, msg } = useUsersAdminContext();

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [role, setRole] = useState<string>("USER");

    const handleCreate = async () => {

        if (!firstName || firstName.trim() === "") return;
        if (!lastName || lastName.trim() === "") return;
        if (!email || email.trim() === "") return;
        if (!password1 || !password2) return;

        await addUser(firstName, lastName, email, password1, password2, role);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-[800px] h-[600px] bg-white flex flex-col rounded-[10px] overflow-y-auto"
            >
                <div className="px-4 py-2 flex flex-row w-full justify-between items-center border-b border-b-gray-300">
                    <p className="text-[1.5em] font-bold text-[#222344]">Nouvel Utilisateur</p>

                    <span
                        onClick={() => setShowAddUserPop(false)}
                        className="text-[2em] cursor-pointer text-[#222344] transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                    >&times;</span>
                </div>

                <div className="p-4 flex flex-col gap-3">

                    <div className="flex flex-row gap-3 max-[600px]:flex-col">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-[15px] font-[600] text-[#222344]">Prénom*</label>
                            <input
                                type="text"
                                value={firstName}
                                placeholder="Ex: Yanis"
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-100"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-[15px] font-[600] text-[#222344]">Nom*</label>
                            <input
                                type="text"
                                value={lastName}
                                placeholder="Ex: Rezgui"
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-100"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[15px] font-[600] text-[#222344]">Email*</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Ex: yanis@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-100"
                            required
                        />
                    </div>

                    <div className="flex flex-row gap-3 max-[600px]:flex-col">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-[15px] font-[600] text-[#222344]">Mot de passe*</label>
                            <input
                                type="password"
                                value={password1}
                                onChange={(e) => setPassword1(e.target.value)}
                                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-100"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-[15px] font-[600] text-[#222344]">Confirmer*</label>
                            <input
                                type="password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-100"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[15px] font-[600] text-[#222344]">Rôle*</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
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
                        disabled={loadingAddUser}
                        onClick={handleCreate}
                    >
                        {loadingAddUser ? "Création..." : "Créer"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(AddUserPop);
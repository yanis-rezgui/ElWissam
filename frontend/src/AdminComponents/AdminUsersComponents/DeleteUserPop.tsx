import { memo } from "react";
import { useUsersAdminContext } from "../../AdminContexts/UsersAdminContext";

const DeleteUserPop = () => {

    const { userDetails, loadingDeleteUser, deleteUser, setShowDeleteUserPop, msg } = useUsersAdminContext();

    return (
        <div
            onClick={() => setShowDeleteUserPop(false)}
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="max-w-[400px] w-full relative bg-white flex flex-col items-center rounded-[10px] p-5"
            >
                <h3 className="text-[1.2em] mt-5 underline text-[#222344] font-[600] text-center px-3">
                    Êtes-vous sûr de vouloir supprimer :
                </h3>

                <p className="text-[1.1em] font-[600] text-[#222344] mt-2 text-center px-3">
                    {userDetails?.firstName} {userDetails?.lastName}
                </p>

                <div className="w-[80px] h-[80px] rounded-full bg-[#222344] text-[#cdad7d]
                flex items-center justify-center font-[700] text-[1.3em] mt-5">
                    {userDetails?.firstName?.[0]}{userDetails?.lastName?.[0]}
                </div>

                <div className="h-[30px] flex justify-center items-center text-[14px] text-center text-red-600 mt-3">
                    {msg && <span>{msg}</span>}
                </div>

                <div className="flex flex-row justify-center items-center gap-3 mt-3 w-full max-[600px]:flex-col">
                    <button
                        onClick={() => setShowDeleteUserPop(false)}
                        className="w-[120px] max-[600px]:w-full bg-gray-200 text-[#222344] text-[14px] font-[600] py-2
                        rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                    >
                        Annuler
                    </button>

                    <button
                        onClick={() => deleteUser(userDetails!.id)}
                        disabled={loadingDeleteUser}
                        className="w-[140px] max-[600px]:w-full bg-red-600 text-white text-[14px] font-[600] py-2
                        rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2"
                    >
                        {loadingDeleteUser ? (
                            <><i className="fa-solid fa-spinner fa-spin"></i> Suppression...</>
                        ) : (
                            <><i className="fa-solid fa-trash"></i> Oui, Supprimer</>
                        )}
                    </button>
                </div>

                <i
                    onClick={() => setShowDeleteUserPop(false)}
                    className="fa-solid fa-xmark absolute top-3 right-3 text-[1.5em] text-[#222344] cursor-pointer
                    transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                ></i>
            </div>
        </div>
    );
};

export default memo(DeleteUserPop);
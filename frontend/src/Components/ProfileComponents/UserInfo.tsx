import { memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthContext } from "../../Contexts/AuthContext";
import Icon from "../../Icons/Icons";
import { useUserContext } from "../../Contexts/UserContext";

const UserInfo = () => {

    const { user, setShowSignOut } = useAuthContext();
    const { updateUser, msg, loadingUpdateUser } = useUserContext();

    const [showModify, setShowModify] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    const handleUpdateUser = async () => {

        if (!firstName.trim() || !lastName.trim()) return;

        await updateUser(firstName.trim(), lastName.trim());
    };

    return (

        <motion.div
            initial={{
                opacity: 0,
                y: 25,
                scale: 0.97
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1
            }}
            transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
            }}
            className="
                w-[400px]
                bg-white
                shadow-2xl
                rounded-[10px]
                p-3
                flex
                flex-col
                items-center
                max-[450px]:w-full
            "
        >

            {/* Avatar */}
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.7
                }}
                animate={{
                    opacity: 1,
                    scale: 1
                }}
                transition={{
                    delay: 0.1,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1]
                }}
                className="
                    w-[150px]
                    h-[150px]
                    flex
                    justify-center
                    items-center
                    bg-[#222344]
                    text-[4em]
                    text-white
                    font-bold
                    rounded-full
                "
            >
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
            </motion.div>


            {/* Content */}
            <AnimatePresence mode="wait">

                {showModify ? (

                    <motion.div
                        key="modify"
                        initial={{
                            opacity: 0,
                            x: 15
                        }}
                        animate={{
                            opacity: 1,
                            x: 0
                        }}
                        exit={{
                            opacity: 0,
                            x: -15
                        }}
                        transition={{
                            duration: 0.25
                        }}
                        className="
                            flex
                            flex-col
                            gap-2
                            w-full
                            mt-5
                            border
                            border-gray-300
                            rounded-[5px]
                            bg-gray-50
                            p-2
                        "
                    >

                        {/* Header */}
                        <div className="flex flex-col gap-2">

                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 }}
                            >
                                <Icon name="UserPen" size={40} />
                            </motion.div>

                            <p className="font-bold text-[1.2em] leading-6">
                                Modifiez vos informations personnelles
                            </p>

                        </div>


                        {/* Last name */}
                        <div className="flex flex-col gap-1 mt-4">

                            <p className="text-[15px] font-bold">
                                Nom:
                            </p>

                            <input
                                type="text"
                                placeholder="Nom"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="
                                    p-2
                                    text-[15px]
                                    bg-gray-100
                                    border
                                    border-gray-300
                                    rounded-[5px]
                                    outline-none
                                    focus:border-[#222344]
                                    transition-colors
                                "
                            />

                        </div>


                        {/* First name */}
                        <div className="flex flex-col gap-1">

                            <p className="text-[15px] font-bold">
                                Prénom:
                            </p>

                            <input
                                type="text"
                                placeholder="Prénom"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="
                                    p-2
                                    text-[15px]
                                    bg-gray-100
                                    border
                                    border-gray-300
                                    rounded-[5px]
                                    outline-none
                                    focus:border-[#222344]
                                    transition-colors
                                "
                            />

                        </div>


                        {/* Message */}
                        <div className="min-h-[30px] flex justify-center items-center text-center">

                            <AnimatePresence mode="wait">

                                {msg && (

                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                            y: -5
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -5
                                        }}
                                        className="
                                            text-[15px]
                                            text-red-600
                                            font-[500]
                                        "
                                    >
                                        {msg}
                                    </motion.p>

                                )}

                            </AnimatePresence>

                        </div>


                        {/* Update button */}
                        <motion.button
                            whileHover={{
                                scale: 1.01
                            }}
                            whileTap={{
                                scale: 0.98
                            }}
                            disabled={loadingUpdateUser}
                            onClick={handleUpdateUser}
                            className="
                                w-full
                                text-gray-50
                                bg-[#222344]
                                p-2
                                rounded-[5px]
                                text-[15px]
                                font-bold
                                cursor-pointer
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                            "
                        >
                            {loadingUpdateUser
                                ? "Modification..."
                                : "Modifier"}
                        </motion.button>

                    </motion.div>

                ) : (

                    <motion.div
                        key="info"
                        initial={{
                            opacity: 0,
                            x: -15
                        }}
                        animate={{
                            opacity: 1,
                            x: 0
                        }}
                        exit={{
                            opacity: 0,
                            x: 15
                        }}
                        transition={{
                            duration: 0.25
                        }}
                        className="
                            flex
                            flex-col
                            gap-3
                            w-full
                            mt-5
                        "
                    >

                        {/* Last name */}
                        <div className="flex flex-row items-center gap-2">

                            <p className="text-[17px] font-bold">
                                Nom:
                            </p>

                            <p>
                                {user?.lastName}
                            </p>

                        </div>


                        {/* First name */}
                        <div className="flex flex-row items-center gap-2">

                            <p className="text-[17px] font-bold">
                                Prénom:
                            </p>

                            <p>
                                {user?.firstName}
                            </p>

                        </div>


                        {/* Email */}
                        <div className="flex flex-row items-center gap-2">

                            <p className="text-[17px] font-bold">
                                Email:
                            </p>

                            <p className="break-all">
                                {user?.email}
                            </p>

                        </div>


                        {/* Created at */}
                        <div className="flex flex-row items-center gap-2">

                            <p className="text-[17px] font-bold">
                                Membre depuis:
                            </p>

                            <p>
                                {user?.createdAt &&
                                    new Date(user.createdAt)
                                        .toLocaleDateString("fr-FR")
                                }
                            </p>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>


            {/* Actions */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 10
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    delay: 0.25,
                    duration: 0.25
                }}
                className="
                    flex
                    flex-row
                    justify-center
                    items-center
                    gap-5
                    mt-5
                    max-[450px]:w-full
                "
            >

                {/* Modify */}
                <motion.button
                    whileHover={{
                        scale: 1.03
                    }}
                    whileTap={{
                        scale: 0.96
                    }}
                    className="
                        w-[120px]
                        text-[15px]
                        font-[600]
                        bg-[#222344]
                        text-white
                        py-2
                        rounded-[5px]
                        cursor-pointer
                    "
                    onClick={() => {
                        setShowModify(prev => !prev);

                        if (!showModify) {
                            setFirstName(user?.firstName ?? "");
                            setLastName(user?.lastName ?? "");
                        }
                    }}
                >
                    {showModify ? "Annuler" : "Modifier"}
                </motion.button>


                {/* Sign out */}
                <motion.button
                    whileHover={{
                        scale: 1.03
                    }}
                    whileTap={{
                        scale: 0.96
                    }}
                    className="
                        w-[120px]
                        text-[15px]
                        font-[600]
                        bg-red-600
                        text-white
                        py-2
                        rounded-[5px]
                        cursor-pointer
                    "
                    onClick={() => setShowSignOut(true)}
                >
                    Déconnexion
                </motion.button>

            </motion.div>

        </motion.div>
    );
};

export default memo(UserInfo);
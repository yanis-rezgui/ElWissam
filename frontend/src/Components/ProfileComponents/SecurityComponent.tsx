import { memo, useState } from "react";
import Icon from "../../Icons/Icons";
import { AnimatePresence, motion } from "framer-motion";
import { useUserContext } from "../../Contexts/UserContext";

const SecurityComponent = () => {

    const [showModify, setShowModify] = useState<boolean>(false);
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword1, setNewPassword1] = useState<string>("");
    const [newPassword2, setNewPassword2] = useState<string>("");

    const { updatePassword, loadingUpdatePassword } = useUserContext();

    const handleUpdate = async () => {

        if (!oldPassword.trim()) return;
        if (!newPassword1.trim()) return;
        if (!newPassword2.trim()) return;

        await updatePassword(
            oldPassword,
            newPassword1,
            newPassword2
        );

        setShowModify(false)
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
                duration: 0.45,
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
                max-[450px]:w-[350px]
            "
        >

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    delay: 0.1,
                    duration: 0.3
                }}
                className="flex flex-row items-center gap-2 font-bold"
            >
                <Icon name="Lock" size={25} />

                <p className="text-[18px]">
                    Sécurité du compte
                </p>
            </motion.div>


            <div className="flex flex-col gap-3 mt-4">

                {/* Description + Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 0.15,
                        duration: 0.3
                    }}
                    className="
                        flex
                        flex-row
                        w-full
                        justify-between
                        items-center
                        gap-3
                    "
                >

                    <p className="text-[14px] text-gray-500">
                        Protégez votre compte en mettant régulièrement
                        à jour votre mot de passe.
                    </p>

                    <motion.button
                        whileHover={{
                            scale: 1.03
                        }}
                        whileTap={{
                            scale: 0.96
                        }}
                        onClick={() => setShowModify(prev => !prev)}
                        className="
                            shrink-0
                            text-gray-50
                            bg-[#222344]
                            p-2
                            rounded-[5px]
                            text-[15px]
                            font-bold
                            cursor-pointer
                            transition-opacity
                            duration-200
                            hover:opacity-80
                            active:opacity-60
                        "
                    >

                        <span>
                            {showModify
                                ? "Fermer"
                                : "Modifier"}
                        </span>

                        <motion.span
                            className="inline-block ml-2"
                            animate={{
                                rotate: showModify ? 180 : 0
                            }}
                            transition={{
                                duration: 0.25,
                                ease: "easeInOut"
                            }}
                        >
                            <Icon
                                name="ChevronDown"
                                size={16}
                            />
                        </motion.span>

                    </motion.button>

                </motion.div>


                {/* Password Form */}
                <AnimatePresence initial={false}>

                    {showModify && (

                        <motion.div
                            key="password-form"

                            initial={{
                                opacity: 0,
                                height: 0,
                                y: -10
                            }}

                            animate={{
                                opacity: 1,
                                height: "auto",
                                y: 0
                            }}

                            exit={{
                                opacity: 0,
                                height: 0,
                                y: -10
                            }}

                            transition={{
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1]
                            }}

                            className="
                                overflow-hidden
                                bg-gray-50
                                border
                                border-gray-200
                                rounded-[6px]
                            "
                        >

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
                                    delay: 0.1,
                                    duration: 0.3
                                }}
                                className="
                                    flex
                                    flex-col
                                    gap-3
                                    w-full
                                    p-3
                                "
                            >

                                {/* Old password */}
                                <div className="flex flex-col gap-1">

                                    <label
                                        htmlFor="oldPassword"
                                        className="
                                            text-[15px]
                                            font-bold
                                        "
                                    >
                                        Ancien mot de passe*
                                    </label>

                                    <input
                                        id="oldPassword"
                                        type="password"
                                        name="oldPassword"
                                        value={oldPassword}
                                        onChange={(e) =>
                                            setOldPassword(e.target.value)
                                        }
                                        required
                                        className="
                                            p-2
                                            text-[15px]
                                            bg-white
                                            border
                                            border-gray-300
                                            rounded-[5px]
                                            outline-none
                                            transition-all
                                            duration-200
                                            focus:border-[#222344]
                                            focus:ring-2
                                            focus:ring-[#222344]/10
                                        "
                                        placeholder="Mot de passe"
                                    />

                                </div>


                                {/* New password */}
                                <div className="flex flex-col gap-1">

                                    <label
                                        htmlFor="newPassword1"
                                        className="
                                            text-[15px]
                                            font-bold
                                        "
                                    >
                                        Nouveau mot de passe*
                                    </label>

                                    <input
                                        id="newPassword1"
                                        type="password"
                                        name="newPassword1"
                                        value={newPassword1}
                                        onChange={(e) =>
                                            setNewPassword1(e.target.value)
                                        }
                                        required
                                        className="
                                            p-2
                                            text-[15px]
                                            bg-white
                                            border
                                            border-gray-300
                                            rounded-[5px]
                                            outline-none
                                            transition-all
                                            duration-200
                                            focus:border-[#222344]
                                            focus:ring-2
                                            focus:ring-[#222344]/10
                                        "
                                        placeholder="Nouveau mot de passe"
                                    />

                                </div>


                                {/* Confirm password */}
                                <div className="flex flex-col gap-1">

                                    <label
                                        htmlFor="newPassword2"
                                        className="
                                            text-[15px]
                                            font-bold
                                        "
                                    >
                                        Confirmer le nouveau mot de passe*
                                    </label>

                                    <input
                                        id="newPassword2"
                                        type="password"
                                        name="newPassword2"
                                        value={newPassword2}
                                        onChange={(e) =>
                                            setNewPassword2(e.target.value)
                                        }
                                        required
                                        className="
                                            p-2
                                            text-[15px]
                                            bg-white
                                            border
                                            border-gray-300
                                            rounded-[5px]
                                            outline-none
                                            transition-all
                                            duration-200
                                            focus:border-[#222344]
                                            focus:ring-2
                                            focus:ring-[#222344]/10
                                        "
                                        placeholder="Confirmer le mot de passe"
                                    />

                                </div>


                                {/* Submit */}
                                <motion.button
                                    whileHover={{
                                        scale: 1.01
                                    }}
                                    whileTap={{
                                        scale: 0.98
                                    }}
                                    onClick={handleUpdate}
                                    disabled={loadingUpdatePassword}
                                    className="
                                        w-full
                                        text-gray-50
                                        bg-[#222344]
                                        p-2
                                        rounded-[5px]
                                        text-[15px]
                                        font-bold
                                        cursor-pointer
                                        transition-opacity
                                        duration-200
                                        hover:opacity-80
                                        active:opacity-60
                                        disabled:opacity-50
                                        disabled:cursor-not-allowed
                                    "
                                >
                                    {loadingUpdatePassword
                                        ? "Modification..."
                                        : "Modifier le mot de passe"}
                                </motion.button>

                            </motion.div>

                        </motion.div>

                    )}

                </AnimatePresence>

            </div>

        </motion.div>
    );
};

export default memo(SecurityComponent);
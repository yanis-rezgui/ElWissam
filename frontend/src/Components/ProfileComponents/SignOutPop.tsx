import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthContext } from "../../Contexts/AuthContext";

const SignOutPop = () => {
    const {
        setShowSignOut,
        signOut,
        loadingSignOut
    } = useAuthContext();

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setShowSignOut(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex justify-center items-center z-50"
            >

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.92,
                        y: 20
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.92,
                        y: 20
                    }}
                    transition={{
                        duration: 0.25,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    className="
                        flex flex-col
                        w-[700px]
                        bg-white
                        rounded-[10px]
                        max-[1025px]:w-[400px]
                        max-[450px]:w-[300px]
                        p-6
                        relative
                        gap-2
                        shadow-2xl
                    "
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* Close */}
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="
                            text-[2.2em]
                            absolute
                            top-0
                            right-2
                            cursor-pointer
                            leading-none
                        "
                        onClick={() => setShowSignOut(false)}
                    >
                        &times;
                    </motion.button>


                    {/* Title */}
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08, duration: 0.2 }}
                        className="text-[1.4em] font-bold"
                    >
                        Se déconnecter ?
                    </motion.p>


                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12, duration: 0.2 }}
                        className="text-gray-600 leading-relaxed"
                    >
                        Vous êtes sur le point de vous déconnecter de votre
                        espace personnel. Vos favoris et vos informations
                        resteront enregistrés et vous pourrez vous reconnecter
                        à tout moment.
                    </motion.p>


                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.16, duration: 0.2 }}
                        className="text-[17px] font-medium mt-1"
                    >
                        Souhaitez-vous vraiment vous déconnecter ?
                    </motion.p>


                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.2 }}
                        className="
                            flex flex-row
                            items-center
                            justify-center
                            gap-4
                            mt-5
                            max-[450px]:flex-col
                        "
                    >

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            disabled={loadingSignOut}
                            onClick={signOut}
                            className="
                                text-[15px]
                                text-gray-50
                                bg-[#222344]
                                p-2
                                rounded-[10px]
                                font-[600]
                                cursor-pointer
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                                max-[450px]:w-full
                            "
                        >
                            {loadingSignOut
                                ? "Chargement..."
                                : "Oui, Je me déconnecte"}
                        </motion.button>


                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setShowSignOut(false)}
                            className="
                                text-[15px]
                                text-gray-50
                                bg-red-600
                                p-2
                                rounded-[10px]
                                font-[600]
                                cursor-pointer
                                max-[450px]:w-full
                            "
                        >
                            Annuler
                        </motion.button>

                    </motion.div>

                </motion.div>

            </motion.div>
        </AnimatePresence>
    );
};

export default memo(SignOutPop);
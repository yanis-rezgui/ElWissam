import  { memo } from "react"
import {motion} from "framer-motion"
import Icon from "../../Icons/Icons";
import { useAuthContext } from "../../Contexts/AuthContext";

const SignOutComponent = () => {

    const {signOut, loadingSignOut} = useAuthContext();
    return(

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
                <Icon name="LogOut" size={25} />

                <p className="text-[18px]">
                    Déconnectez vous de votre compte
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
                        flex-col
                        w-full
                        
                        items-baseline
                        gap-3
                    "
                >

                    <p className="text-[14px] text-gray-500">
                        Vous êtes sur le point de vous déconnecter de votre compte.
                         Assurez-vous d’avoir terminé vos tâches avant de quitter votre espace d’administration.

                    </p>

                    <motion.button
                        whileHover={{
                            scale: 1.03
                        }}
                        whileTap={{
                            scale: 0.96
                        }}
                        onClick={signOut}
                        
                        className="
                            shrink-0
                            text-gray-50
                            bg-red-600
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
                        {loadingSignOut ? "chargement.." : "Déconnexion"}
                    </motion.button>

            </motion.div>
            </div>
            </motion.div>
    )
}

export default memo(SignOutComponent);
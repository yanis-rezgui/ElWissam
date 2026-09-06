import { motion } from "framer-motion";
import Icon from "../../Icons/Icons";
import { memo } from "react";

const SecurityAdminInfo = () => {

    const securityInfo = [
    {
        title: "Mot de passe sécurisé",
        description: "Votre compte est protégé par un mot de passe sécurisé et chiffré.",
        icon: "ShieldCheck"
    },
    {
        title: "Authentification sécurisée",
        description: "Votre identité est vérifiée grâce à une authentification par jeton sécurisée.",
        icon: "KeyRound"
    },
    {
        title: "Session actuelle",
        description: "Votre session d’administration est actuellement active sur cet appareil.",
        icon: "MonitorCheck"
    },
    {
        title: "Protection du compte",
        description: "Les accès à votre espace d’administration sont protégés contre les connexions non autorisées.",
        icon: "LockKeyhole"
    }
];

    
return(

    <div
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
        <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    delay: 0.1,
                    duration: 0.3
                }}
                className="flex flex-row items-center gap-2 font-bold"
            >
                <Icon name="FileLock" size={25} />

                <p className="text-[18px]">
                    Informations de Sécurité 
                </p>
            </motion.div>

            <div className="flex flex-col mt-5 w-full gap-3">
                {securityInfo.map((s)=>{
                    return(
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center gap-1 font-[600]">
                                <Icon name={`${s.icon}`} size={25}/>
                                <p>{s.title}</p>
                            </div>

                            <p className="text-[15px] text-gray-800 leading-5">
                                {s.description}
                            </p>
                        </div>
                    )
                })}

            </div>


    </div>
)
}

export default memo(SecurityAdminInfo);
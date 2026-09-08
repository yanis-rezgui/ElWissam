import { memo } from "react";
import {motion} from "framer-motion"
import Icon from "../../Icons/Icons";


const NosServices = () => {

    const services = [
    {
        id: 1,
        icon: "MessageCircle",
        title: "Consultation & visites gratuites",
        description:
            "Bénéficiez d'un premier échange gratuit avec notre équipe afin de présenter votre projet et vos attentes. Nous vous conseillons dans votre recherche et organisons les visites des biens correspondant à vos critères afin de vous aider à faire votre choix dans les meilleures conditions."
    },
    {
        id: 2,
        icon: "KeyRound",
        title: "Location de biens",
        description:
            "Vous recherchez un appartement, une villa, un local ou un autre type de bien à louer ? Nous vous proposons une sélection adaptée à vos critères, votre budget et vos besoins, tout en vous accompagnant dans l'organisation des visites et les différentes étapes de votre recherche."
    },
    {
        id: 3,
        icon: "Building2",
        title: "Vente de biens",
        description:
            "Vous souhaitez vendre votre propriété ? Nous vous accompagnons dans la mise en valeur et la commercialisation de votre bien afin de lui offrir une visibilité auprès d'acquéreurs potentiels. Notre équipe reste à vos côtés tout au long du processus jusqu'à la concrétisation de la vente."
    },
    {
        id: 4,
        icon: "FileCheck",
        title: "Accompagnement administratif & juridique",
        description:
            "Les démarches liées à un projet immobilier peuvent parfois être complexes. Nous vous accompagnons dans les différentes étapes administratives et dans vos échanges avec les professionnels concernés, notamment le notaire, afin de vous permettre d'avancer avec davantage de clarté et de sérénité."
    }
];

    return(
        <section
            className="
                flex flex-col w-full bg-gray-200 items-center
                px-10 py-10 text-[#222344] gap-5
            "
           
        >

            {/* TITRE */}
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                    duration: 0.7,
                    ease: "easeOut"
                }}
                className="text-[2em] font-bold text-center"
            >
                NOS BIENS IMMOBILIERS
            </motion.p>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                    duration: 0.7,
                    delay: 0.15,
                    ease: "easeOut"
                }}
                className="
                    text-[17px]
                    text-center
                    w-[500px]
                    max-[550px]:w-[300px]
                "
            >
                Découvrez une sélection de biens
                proposés par El Ahlem.
            </motion.p>

            <div className="flex flex-wrap items-center gap-5 justify-center">
                {services.map((s)=>{
                    return(
                       <div className="text-white bg-[#222344] p-2 w-[300px] h-[300px] rounded-[10px]
                       shadow-2xl flex flex-col gap-2 transition-transform duration-200 hover:scale-105 
                       ">
                        <Icon name={s.icon} size={40}/>
                        <p className="text-[1.2em] font-bold leading-6">
                            {s.title}
                        </p>
                        <p className="text-[14px] leading-5">
                            {s.description}
                        </p>
                       </div>
                    )
                })}
            </div>

        </section>
    );
}

export default memo(NosServices);
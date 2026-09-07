import { memo } from "react";
import { motion } from "framer-motion";
import Icon from "../../Icons/Icons";
import { useNavigate } from "react-router-dom";

const Accompagnement = () => {

    const accompagnements = [
        {
            id: 1,
            icon: "Award",
            title: "Expertise",
            description:
                "Grâce à notre connaissance du marché immobilier et à notre expérience, nous vous accompagnons dans vos démarches avec des conseils adaptés à votre situation. Nous mettons notre savoir-faire à votre service afin de vous aider à prendre des décisions réfléchies et adaptées à votre projet."
        },
        {
            id: 2,
            icon: "HeartHandshake",
            title: "Proximité",
            description:
                "Chaque projet immobilier est différent, c'est pourquoi nous accordons une attention particulière à vos besoins, vos attentes et vos objectifs. Nous privilégions une relation de proximité et prenons le temps de vous écouter afin de vous proposer un accompagnement réellement adapté à votre situation."
        },
        {
            id: 3,
            icon: "ShieldCheck",
            title: "Confiance",
            description:
                "Nous plaçons la transparence et la confiance au cœur de notre relation avec nos clients. À chaque étape de votre démarche, nous vous accompagnons avec sérieux et clarté afin que vous puissiez avancer sereinement et prendre vos décisions en toute connaissance de cause."
        },
        {
            id: 4,
            icon: "Sparkles",
            title: "Simplicité",
            description:
                "Notre objectif est de rendre votre projet immobilier aussi simple et fluide que possible. De la recherche du bien jusqu'à la concrétisation de votre projet, nous vous accompagnons à chaque étape afin de vous faire gagner du temps et de vous permettre d'avancer avec sérénité."
        }
    ];

    const navigate = useNavigate();

    return (
        <section
            className="
                flex flex-col
                w-full
                bg-[#222344]
                items-center
                px-10
                py-10
                text-gray-50
                gap-5
            "
            id="pourquoi"
        >

            {/* TITRE */}
            <motion.p
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                    duration: 0.7,
                    ease: "easeOut"
                }}
                className="
                    text-[2em]
                    font-bold
                    text-gray-50
                    text-center
                "
            >
                NOTRE ACCOMPAGNEMENT
            </motion.p>


            {/* DESCRIPTION */}
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
                    text-gray-100
                    text-center
                    w-[500px]
                    max-[550px]:w-[300px]
                "
            >
                Un accompagnement pensé pour vous
                accompagner à chaque étape de votre projet.
            </motion.p>


            {/* CARTES */}
            <div
                className="
                    flex
                    flex-wrap
                    items-baseline
                    justify-center
                    gap-5
                    mt-5
                "
            >

                {accompagnements.map((a, index) => {

                    return (
                        <motion.div
                            key={a.id}

                            initial={{
                                opacity: 0,
                                y: 50,
                                scale: 0.95
                            }}

                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scale: 1
                            }}

                            viewport={{
                                once: true,
                                amount: 0.2
                            }}

                            transition={{
                                duration: 0.6,
                                delay: 0.25 + index * 0.12,
                                ease: "easeOut"
                            }}

                            whileHover={{
                                scale: 1.05,
                                y: -5
                            }}

                            whileTap={{
                                scale: 0.98
                            }}

                            className="
                                w-[300px]
                                bg-gray-50
                                text-[#222344]
                                h-[320px]
                                shadow-2xl
                                rounded-[10px]
                                p-5
                                flex
                                flex-col
                                gap-3
                                cursor-default
                            "
                        >

                            {/* ICÔNE */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{
                                    once: true,
                                    amount: 0.2
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.4 + index * 0.12,
                                    ease: "easeOut"
                                }}
                            >
                                <Icon
                                    name={a.icon}
                                    size={40}
                                />
                            </motion.div>


                            {/* TITRE */}
                            <p className="text-[1.4em] font-bold">
                                {a.title}
                            </p>


                            {/* DESCRIPTION */}
                            <p className="text-[14px] leading-5">
                                {a.description}
                            </p>

                        </motion.div>
                    );

                })}

            </div>

             {/* BOUTONS */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                    duration: 0.7,
                    delay: 0.25,
                    ease: "easeOut"
                }}
                className="
                    flex flex-row items-center gap-3 mt-5
                    max-[450px]:mt-2
                    max-[450px]:flex-col
                "
            >

                <motion.button
                    onClick={()=>navigate('/contact')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="
                        bg-gray-950
                        text-white
                        text-[15px]
                        p-2
                        cursor-pointer
                        rounded-[5px]
                        shadow-2xl
                        font-[500]
                    "
                >
                    Contactez-nous 
                </motion.button>


                <motion.button
                    onClick={() => navigate("/biens")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="
                        bg-white
                        text-[#222344]
                        text-[15px]
                        p-2
                        cursor-pointer
                        rounded-[5px]
                        shadow-2xl
                        font-[500]
                    "
                >
                    Voir les biens
                </motion.button>

            </motion.div>

        </section>
    );
};

export default memo(Accompagnement);

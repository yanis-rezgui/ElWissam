
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {

    const navigate = useNavigate();

    return (
        <section
            className="
                flex flex-col w-full bg-gray-100 items-center
                px-10 py-10 text-[#222344] gap-10
            "
            id="about"
        >

            {/* TITRE */}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                    duration: 0.7,
                    ease: "easeOut"
                }}
                className="text-[2em] font-bold text-center max-[600px]:text-[1.5em]"
            >
                À propos de notre agence immobilière à Alger
            </motion.h2>


            {/* CONTENU */}
            <div
                className="
                    flex flex-row justify-center items-center
                    gap-10
                    max-[1000px]:flex-col
                "
            >

                {/* TEXTE */}
                <motion.h3
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                    className="
                        text-[17px]
                        font-[600]
                        w-[500px]
                        max-[1000px]:text-center
                        max-[550px]:w-[300px]
                        max-[550px]:text-[15px]
                    "
                >
                    Chez El Ahlem, nous considérons chaque projet immobilier
                    comme une étape importante dans la vie de nos clients.
                    Qu’il s’agisse d’acheter, de vendre, de louer ou d’investir,
                    nous vous accompagnons avec sérieux, écoute et proximité afin
                    de vous proposer des solutions adaptées à vos besoins.
                    Notre objectif est de vous offrir un accompagnement
                    transparent et personnalisé à chaque étape de votre projet,
                    pour vous permettre d’avancer sereinement et de concrétiser
                    vos ambitions immobilières en toute confiance.
                </motion.h3>


                {/* IMAGE */}
                <motion.img
                    src="agence.jpeg"
                    alt="Agence El Ahlem"
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.15,
                        ease: "easeOut"
                    }}
                    className="
                        w-[400px]
                        max-[450px]:w-[320px]
                    "
                />

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

                <motion.a
                    href="#pourquoi"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="
                        bg-[#222344]
                        text-white
                        text-[15px]
                        p-2
                        cursor-pointer
                        rounded-[5px]
                        shadow-2xl
                        font-[500]
                    "
                >
                    Pourquoi choisir El Ahlem ?
                </motion.a>


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

export default memo(About);


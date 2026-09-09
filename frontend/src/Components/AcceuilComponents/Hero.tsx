import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Counter from "./Counter";

const Hero = () => {

    const navigate = useNavigate();

    const statistics = [
        {
            value: 30,
            label: "Biens gérés",
        },
        {
            value: 15,
            label: "Années d'expérience",
        },
        {
            value: 50,
            label: "Clients satisfaits",
        },
    ];

    return (
        <div
            id="home"
            style={{ backgroundImage: "url('hero4.jpeg')" }}
            className="bg-cover bg-center w-full flex items-center justify-center h-[750px] max-[750px]:h-[700px]"
        >

            <div
                className="
                    flex flex-col px-10 w-full
                    bg-black/60 gap-5 h-full
                    max-[1025px]:px-10
                    max-[780px]:px-5
                    items-center
                    max-[600px]:px-5
                "
            >

                {/* TITRE */}
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                    }}
                    className="
                        mt-15 text-white font-black text-[2em]
                        font-['Playfair_Display']
                        text-center leading-10
                        max-[450px]:text-[1.5em]
                    "
                >
                     El Ahlem, votre agence immobilière à Alger
                </motion.h1>


                {/* DESCRIPTION */}
                <motion.h3
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: "easeOut",
                    }}
                    className="
                        text-[17px] font-[600] text-white text-center w-[700px]
                        max-[750px]:w-[400px]
                        max-[450px]:w-[300px]
                        max-[450px]:text-[15px]
                    "
                >
                   El Ahlem est une agence immobilière à Alger spécialisée dans
                    l'achat, la vente et la location de biens immobiliers.
                    Découvrez nos appartements, villas, terrains et locaux dans
                    plusieurs secteurs d'Alger et bénéficiez d'un accompagnement
                    personnalisé à chaque étape de votre projet.
                </motion.h3>


                {/* STATISTIQUES */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.4,
                        ease: "easeOut",
                    }}
                    className="
                        flex flex-row items-center gap-7 mt-3
                        max-[450px]:flex-col
                        max-[450px]:items-baseline
                        max-[450px]:gap-3
                    "
                >

                    {statistics.map((s, index) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.5 + index * 0.15,
                                ease: "easeOut",
                            }}
                            className="
                                flex flex-col items-baseline text-white
                                border-l-3 border-l-white pl-2
                            "
                        >
                            <div className="font-bold">
                                <Counter end={s.value} />
                            </div>

                            <p className="text-[15px] font-[600]">
                                {s.label.toUpperCase()}
                            </p>
                        </motion.div>
                    ))}

                </motion.div>


                {/* BOUTONS */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.8,
                        ease: "easeOut",
                    }}
                    className="
                        flex flex-row items-center gap-3 mt-5
                        max-[450px]:mt-2
                    "
                >

                    <motion.a
                        href="#about"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
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
                        Découvrir El Ahlem
                    </motion.a>


                    <motion.button
                        onClick={() => navigate("/biens")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="
                            bg-gray-50
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

            </div>

        </div>
    );
};

export default memo(Hero);
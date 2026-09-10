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
                    flex flex-col px-10 w-full h-full
                    bg-gradient-to-b from-black/70 via-black/55 to-black/70
                    gap-5
                    max-[1025px]:px-10
                    max-[780px]:px-5
                    max-[600px]:px-5
                    items-center justify-center
                "
            >

                {/* BADGE */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="
                        flex items-center gap-2
                        border border-[#cdad7d]/60 bg-white/5
                        backdrop-blur-sm
                        px-4 py-1.5 rounded-full
                    "
                >
                    
                    <p className="text-[#cdad7d] text-[13px] font-[600] tracking-wide">
                        Agence immobilière à Alger
                    </p>
                </motion.div>

                {/* TITRE */}
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.1,
                        ease: "easeOut",
                    }}
                    className="
                        text-white font-black text-[2.4em]
                        font-['Playfair_Display']
                        text-center leading-11
                        max-[750px]:text-[2em] max-[750px]:leading-10
                        max-[450px]:text-[1.6em] max-[450px]:leading-9
                    "
                >
                    Trouvez le bien qui correspond
                    <br className="max-[450px]:hidden" />
                    {" "}vraiment à votre projet
                </motion.h1>

                {/* DESCRIPTION */}
                <motion.h3
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.25,
                        ease: "easeOut",
                    }}
                    className="
                        text-[17px] font-[500] text-gray-100 text-center w-[650px]
                        leading-6.5
                        max-[750px]:w-[450px]
                        max-[450px]:w-[300px]
                        max-[450px]:text-[15px]
                    "
                >
                    El Ahlem vous accompagne dans l'achat, la vente et la location
                    de biens immobiliers à Alger : appartements, villas, terrains
                    et locaux, avec un suivi personnalisé à chaque étape.
                </motion.h3>

                {/* BOUTONS */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.4,
                        ease: "easeOut",
                    }}
                    className="
                        flex flex-row items-center gap-3 mt-2
                        max-[450px]:mt-1
                        max-[450px]:flex-col max-[450px]:w-[280px]
                    "
                >

                    <motion.button
                        onClick={() => navigate("/biens")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="
                            bg-[#cdad7d]
                            text-[#222344]
                            text-[15px]
                            px-4 py-2.5
                            cursor-pointer
                            rounded-[5px]
                            shadow-2xl
                            font-[600]
                            flex items-center gap-2
                            max-[450px]:w-full max-[450px]:justify-center
                        "
                    >
                        Voir les biens
                        <i className="fa-solid fa-arrow-right text-[13px]"></i>
                    </motion.button>

                    <motion.a
                        href="#about"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="
                            bg-transparent
                            border border-white/40
                            text-white
                            text-[15px]
                            px-4 py-2.5
                            cursor-pointer
                            rounded-[5px]
                            font-[500]
                            max-[450px]:w-full max-[450px]:text-center
                        "
                    >
                        Découvrir El Ahlem
                    </motion.a>

                </motion.div>

                {/* STATISTIQUES */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.55,
                        ease: "easeOut",
                    }}
                    className="
                        flex flex-row items-center gap-8 mt-6
                        border-t border-white/15 pt-6
                        max-[450px]:flex-col
                        max-[450px]:items-center
                        max-[450px]:gap-4
                        max-[450px]:border-t-0 max-[450px]:pt-2
                    "
                >

                    {statistics.map((s, index) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.65 + index * 0.15,
                                ease: "easeOut",
                            }}
                            className="
                                flex flex-col items-center text-white
                            "
                        >
                            <div className="font-bold text-[#cdad7d]">
                                <Counter end={s.value} />
                            </div>

                            <p className="text-[13px] font-[500] text-gray-200 tracking-wide">
                                {s.label.toUpperCase()}
                            </p>
                        </motion.div>
                    ))}

                </motion.div>

            </div>

        </div>
    );
};

export default memo(Hero);
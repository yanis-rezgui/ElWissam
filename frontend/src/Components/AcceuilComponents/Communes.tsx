import { motion } from "framer-motion";
import { memo } from "react";
import { useBiensContext } from "../../Contexts/BiensContext";
import { useNavigate } from "react-router-dom";
import { useCommunesContext } from "../../Contexts/CommunesContext";

const Communes = () => {
    const { biensFilter, setBiensFilter } = useBiensContext();
    const { communesClient, loadingCommunes } = useCommunesContext();

    const navigate = useNavigate();

    return (
        <section
        
            className="
                flex flex-col w-full bg-gray-200 items-center
                px-10 py-10 text-[#222344] gap-5
            "
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
                className="text-[2em] font-bold text-center"
            >
                NOS SECTEURS
            </motion.h2>

            <motion.h3
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
                Une connaissance locale au service de votre projet.
            </motion.h3>

            <div className="flex flex-wrap justify-center items-baseline gap-5 mt-5">

                {loadingCommunes ? (

                    /* SKELETONS */
                    Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-3 items-center"
                        >
                            {/* Image skeleton */}
                            <div
                                className="
                                    w-[200px] h-[150px]
                                    rounded-[5px]
                                    bg-gray-300
                                    animate-pulse
                                "
                            />

                            {/* Name skeleton */}
                            <div
                                className="
                                    w-[100px] h-[18px]
                                    rounded-[4px]
                                    bg-gray-300
                                    animate-pulse
                                "
                            />
                        </div>
                    ))

                ) : (

                    /* COMMUNES */
                    communesClient.map((d) => {
                        return (
                            <div
                                key={d.id}
                                className="
                                    flex flex-col gap-3 items-center
                                    transition-transform duration-200
                                    hover:scale-105 cursor-pointer
                                "
                                onClick={() => {
                                    setBiensFilter({
                                        ...biensFilter,
                                        search: d.name
                                    });

                                    navigate("/biens");
                                }}
                            >
                                <img
                                    src={d.imageUrl}
                                    alt={`Immobilier à ${d.name} - El Ahlem`}
                                    className="
                                        w-[200px] h-[150px]
                                        object-cover rounded-[5px]
                                    "
                                />

                                <h3 className="font-[600]">
                                    {d.name}
                                </h3>
                            </div>
                        );
                    })
                )}

            </div>
        </section>
    );
};

export default memo(Communes);
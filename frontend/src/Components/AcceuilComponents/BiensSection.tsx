import { memo } from "react"
import { motion } from "framer-motion";
import { useBiensContext } from "../../Contexts/BiensContext";
import BienCard from "../BiensComponents/BienCard";
import { useNavigate } from "react-router-dom";


const BiensSection = () => {

    const {biens} = useBiensContext();
    const navigate = useNavigate();

    return(
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
                Nos biens immobiliers à Alger
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
                Découvrez une sélection de biens
                proposés par El Ahlem.
            </motion.h3>

             <div className="flex flex-wrap justify-center items-center gap-5 w-full">
                 {biens.slice(0,4).map((b)=>{
                    return(
                        <BienCard bien={b}/>
                    )
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
                    onClick={()=>navigate("/biens")}
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
                    Voir tous les biens
                </motion.button>


                <motion.button
                    onClick={() => navigate("/contact")}
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
                    Contactez-nous
                </motion.button>

            </motion.div>
        </section>
    )
}

export default memo(BiensSection);
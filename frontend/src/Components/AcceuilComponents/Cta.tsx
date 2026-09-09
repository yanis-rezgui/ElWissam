import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAgencyAdminContext } from "../../AdminContexts/AgencyAdminContext";


const Cta = () => {

    const {agency} = useAgencyAdminContext();

    const navigate = useNavigate();
    return(
          <section
            className="
                flex flex-col w-full bg-gray-100 items-center
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
               UN PROJET IMMOBILIER EN TÊTE ?
            </motion.h2>

            <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                    duration: 0.7,
                    ease: "easeOut"
                }}
                className="text-[1.2em] font-bold"
            >
               Parlons-en.
            </motion.h3>

            {/* CONTENU */}
            <div
                className="
                    flex flex-row justify-center items-center
                    gap-10
                    max-[1000px]:flex-col mt-5
                "
            >

                {/* TEXTE */}
                <div className="flex flex-col">
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
                   Notre agence immobilière vous accueille à Alger pour vous
accompagner dans vos projets d'achat, de vente et de location.
Contactez El Ahlem pour discuter de votre projet immobilier.
                </motion.h3>

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
                <button
                    onClick={()=>navigate("/contact")}  
                    className="
                        bg-[#222344]
                        text-white
                        text-[15px]
                        p-2
                        cursor-pointer
                        rounded-[5px]
                        shadow-2xl
                        font-[500]
                        transition-transform
                        duration-200
                        hover:scale-105
                    "
                >
                    Parler à El Ahlem
                </button>


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
                
                </div>

                {/* IMAGE */}
                <motion.img
                    src="imageAgence.jpeg"
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

             <div
                className="
                    flex flex-row justify-center items-center
                    gap-10
                    max-[1000px]:flex-col
                "
            >

                  <iframe 
            src={agency.mapsUrl}
            className="w-[500px] h-[350px] max-[1100px]:w-[400px] max-[450px]:w-[350px]  max-[1050px]:h-[300px]  max-[800px]:h-[200px] "
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">

           </iframe>

                  <motion.p
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
                    Chaque projet commence par une première conversation.
                     Que vous souhaitiez acheter, louer,
                      vendre ou simplement obtenir un conseil,
                       El Ahlem est à votre écoute.
                </motion.p>
            </div>

            

        </section>
    )
}


export default memo(Cta);
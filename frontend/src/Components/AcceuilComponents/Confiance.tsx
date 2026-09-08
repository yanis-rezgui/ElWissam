import { memo } from "react"
import { motion } from "framer-motion";
import { useTestimonialsContext } from "../../Contexts/TestimonialsContext";
import RatingStars from "../BaseComponents/RatingStars";
import { useNavigate } from "react-router-dom";



const Confiance = () => {

    const {clientTestimonials} = useTestimonialsContext();
    const navigate = useNavigate();

    return(
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
                ILS NOUS FONT CONFIANCE
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
                Découvrez les expériences de nos clients et leur
                 satisfaction à l'issue de leur projet immobilier.
            </motion.p>

            <div className="flex flex-wrap justify-center items-baseline gap-5 mt-5">
                {clientTestimonials.slice(0,4).map((t)=>{
                   return  <div className="bg-white w-[300px] h-[300px] border border-gray-300 rounded-[5px] p-2
        flex flex-col gap-2 transition-transform duration-200 hover:scale-105 text-[#222344]
        "
        >
           <p className="text-[1.2em] font-bold text-black">
            {t.fullName}</p>
           <RatingStars rating={t.rating}/>

           <p
           className="text-[14px] text-gray-700"
           >{t.message}</p>
           </div>
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
                    onClick={()=>navigate("/services")}
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
                    Consulter nos services
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


export default memo(Confiance);
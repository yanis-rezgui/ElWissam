import { memo } from "react"
import { motion } from "framer-motion";
import { useTestimonialsContext } from "../../Contexts/TestimonialsContext";
import RatingStars from "../BaseComponents/RatingStars";



const Confiance = () => {

    const {clientTestimonials} = useTestimonialsContext();

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
        </section>
    )
}


export default memo(Confiance);
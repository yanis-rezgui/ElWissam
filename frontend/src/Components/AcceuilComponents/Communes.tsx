import {motion} from "framer-motion"
import { memo } from "react"
import { useBiensContext } from "../../Contexts/BiensContext"
import { useNavigate } from "react-router-dom";

const Communes= () => {

    const {biensFilter, setBiensFilter} = useBiensContext();
    const data = [
        {
            id : 1,
            name : "Birkhadem",
            image : "birkhadem.jpeg"
        },
         {
            id : 2,
            name : "Alger Centre",
            image : "alger.jpg"
        },
         {
            id : 3,
            name : "Cheraga",
            image : "cheraga.jpg"
        },
         {
            id : 4,
            name : "Ain Nadjaa",
            image : "ain.jpg"
        },
         {
            id : 5,
            name : "Kouba",
            image : "kouba.jpeg"
        },
         {
            id : 6,
            name : "Hydra",
            image : "Hydra.jpeg"
        },
         {
            id : 7,
            name : "Ouled Fayet",
            image : "ouled.jpg"
        },
         {
            id : 8,
            name : "Said Hamedine",
            image : "Said.jpg"
        }
    ]
    
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
                {data.map((d)=>{
                    return(
                        <div key={d.id}
                        className="flex flex-col gap-3 items-center transition-transform
                        duration-200 hover:scale-105 cursor-pointer
                        "
                        onClick={()=>{
                            setBiensFilter({
                                ...biensFilter,
                                search : d.name
                            });
                            navigate("/biens")
                        }}
                        >
                            <img src={d.image} alt={`Immobilier à ${d.name} - El Ahlem`}
                            className="w-[200px] h-[150px] object-cover rounded-[5px]"
                            />
                            <h3 className="font-[600]">
                                {d.name}
                            </h3>
                        </div>
                    )
                })}
            </div>
    </section>
    )
}

export default memo(Communes)
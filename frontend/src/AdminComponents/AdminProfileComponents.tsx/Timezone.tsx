import {motion} from "framer-motion"
import { memo } from "react";


const Timezone = () => {

    const   data = [
        {
           name : "Langue",
           content : "Français"
        },
        {
            name : "Timezone",
            content : "Africa/Algiers"
        }
    ];

    return(
        <motion.div
            initial={{
                opacity: 0,
                y: 25,
                scale: 0.97
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1
            }}
            transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1]
            }}
            className="
                w-[400px]
                bg-white
                shadow-2xl
                rounded-[10px]
                p-3
                flex
                flex-col
                gap-5
                max-[450px]:w-[350px]
            
            "
        >
           {data.map((d)=>{
            return(
                <div className="flex flex-row justify-between items-center w-full">
                     <p className="text-[16px] font-bold">
                        {d.name}
                     </p>
                     <p className="text-[16px] text-gray-700">
                        {d.content}
                     </p>
                </div>
            )
           })}
        </motion.div>
    )
}

export default memo(Timezone);
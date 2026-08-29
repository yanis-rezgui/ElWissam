import { motion, AnimatePresence } from 'framer-motion';
import { useBiensContext } from "../../Contexts/BiensContext";
import { memo, useState } from "react";

const Map = () => {

      const [open, setOpen] = useState<boolean>(false);
      const { currentBien } = useBiensContext();

    return(

        <div className="bg-white w-full p-5 rounded-[10px] shadow-2xl mt-10 flex flex-col gap-2">
            <div className="flex flex-row w-full justify-between items-center">
                
                  <p className="text-[1.6em] font-bold">
          Map
        </p>
        
        <motion.i
          onClick={() => setOpen((prev) => !prev)}
          className="fa-solid fa-chevron-down text-[1.5em] cursor-pointer
                     hover:opacity-80 active:opacity-60"
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{
            duration: 0.25,
            ease: "easeInOut",
          }}
        />
            </div>

              <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="flex w-full overflow-hidden mt-5"
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >

           <iframe src={`${currentBien?.localisationMap}`} 
            className="w-full h-[350px] max-[1050px]:w-[400px] max-[1050px]:h-[300px] max-[800px]:w-[300px] max-[800px]:h-[200px] slideRight"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">

           </iframe>

          </motion.div>
        )}
      </AnimatePresence>
        </div>

    )
}


export default memo(Map)
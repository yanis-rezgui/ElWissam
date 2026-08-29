import { memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBiensContext } from "../../Contexts/BiensContext";

const Features = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { currentBien } = useBiensContext();

  return (
    <div className="bg-white w-full p-5 rounded-[10px] shadow-2xl mt-10 flex flex-col gap-2">

      {/* Header */}
      <div className="flex flex-row w-full justify-between items-center">

        <p className="text-[1.6em] font-bold">
          Caractéristiques
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

      {/* Features */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="flex flex-col gap-1 text-[15px] mt-2 overflow-hidden"
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

            {currentBien?.features.map((f, index) => (
              <motion.p
                key={index}
                initial={{
                  opacity: 0,
                  y: -8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.05,
                }}
              >
                - {f}
              </motion.p>
            ))}

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default memo(Features);
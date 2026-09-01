import { memo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ServiceHero = () => {
  const navigate = useNavigate();

  return (
    <div
      id="hero"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dub4fhabm/image/upload/v1788256659/4c817a5d-d886-42d9-b9e6-fb753623fb7d.png')",
      }}
      className="bg-cover bg-center w-full flex items-center justify-center h-[600px] max-[750px]:h-[650px]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center w-full bg-black/50 h-full gap-3 px-5 text-center"
      >

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="text-[2em] text-white font-bold mt-10"
        >
          NOS SERVICES
        </motion.p>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="text-[1.2em] text-white font-[500]"
        >
          Votre projet immobilier, notre accompagnement.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="text-[17px] text-white font-[600] w-[700px] max-[750px]:w-[500px] max-[550px]:w-[300px] max-[550px]:text-[15px]"
        >
          Chez El Ahlem, nous croyons qu'un projet immobilier ne se résume
          pas à trouver un bien. C'est une étape importante qui mérite un
          accompagnement attentif, des conseils adaptés et une parfaite
          compréhension de vos besoins. Que vous souhaitiez acheter, vendre
          ou louer, notre équipe vous accompagne à chaque étape afin de vous
          aider à avancer avec confiance et sérénité.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.45,
            ease: "easeOut",
          }}
          className="flex flex-row items-center justify-center gap-4 mt-5"
        >
          <motion.a
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              bg-[#222344]
              text-white
              text-[15px]
              p-2
              cursor-pointer
              rounded-[10px]
              shadow-2xl
              font-[500]
            "
            href="#services"
          >
            Découvrez nos services
          </motion.a>

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              bg-gray-50
              text-[#222344]
              text-[15px]
              p-2
              cursor-pointer
              rounded-[10px]
              shadow-2xl
              font-[500]
            "
            onClick={() => navigate("/biens")}
          >
            Découvrez nos biens
          </motion.button>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default memo(ServiceHero);
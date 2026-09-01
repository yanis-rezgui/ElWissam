import { memo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ServicesCta = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col w-full bg-gray-100 py-16 px-5 text-[#172033] items-center">

      {/* Header */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-[16px] font-[600] text-center"
      >
        VOTRE PROJET COMMENCE ICI
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.6,
          delay: 0.1,
        }}
        className="text-[2em] font-bold text-center mt-1"
      >
        Parlons de votre projet immobilier.
      </motion.h2>


      {/* Content */}
      <div
        className="
          flex flex-row
          items-center
          justify-center
          gap-20
          max-[700px]:flex-col
          max-[700px]:gap-10
          mt-12
        "
      >

        {/* Image */}
        <motion.img
          initial={{
            opacity: 0,
            x: -50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          src="https://res.cloudinary.com/dub4fhabm/image/upload/v1788274539/7975ecc0-e362-4986-bbd2-eec319ca894c.png"
          alt="Projet immobilier El Ahlem"
          className="
            w-[500px]
            h-auto
            max-[1100px]:w-[300px]
            rounded-[10px]
          "
        />


        {/* Description */}
        <motion.p
          initial={{
            opacity: 0,
            x: 50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="
            w-[500px]
            text-[1.1em]
            leading-7
            max-[1100px]:w-[300px]
            max-[700px]:text-center
          "
        >
          Vous avez un projet d'achat, de location ou de vente ?
          Vous souhaitez obtenir des informations sur l'un de nos biens
          ou simplement échanger avec notre équipe ? El Ahlem est à votre
          disposition pour répondre à vos questions et vous accompagner
          dans les prochaines étapes de votre démarche.
        </motion.p>

      </div>


      {/* Buttons */}
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.4,
        }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          ease: "easeOut",
        }}
        className="
          flex flex-row
          items-center
          justify-center
          gap-4
          mt-8
          max-[450px]:flex-col
        "
      >

        {/* Contact */}
        <motion.button
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.97,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            bg-[#D6B98C]
            text-[#172033]
            text-[15px]
            px-4
            py-2
            cursor-pointer
            rounded-[10px]
            shadow-lg
            font-[500]
          "
          onClick={() => navigate("/contact")}
        >
          Contactez-nous
        </motion.button>


        {/* Biens */}
        <motion.button
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.97,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            text-white
            bg-[#172033]
            text-[15px]
            px-4
            py-2
            cursor-pointer
            rounded-[10px]
            shadow-lg
            font-[500]
          "
          onClick={() => navigate("/biens")}
        >
          Découvrez nos biens
        </motion.button>

      </motion.div>

    </section>
  );
};

export default memo(ServicesCta);
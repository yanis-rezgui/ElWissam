import { memo } from "react";
import { motion } from "framer-motion";
import Icon from "../../Icons/Icons";



const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const line = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 0.3,
    },
  },
};

const Etapes = () => {

    const orderSteps = [
    {
        step: "01",
        icon: "MessageCircle",
        title: "Échangeons",
        description:
            "Nous prenons le temps de comprendre votre projet, vos besoins, vos critères et vos attentes afin de vous orienter au mieux."
    },
    {
        step: "02",
        icon: "Search",
        title: "Trouvons la bonne opportunité",
        description:
            "Nous vous présentons les biens correspondant à votre recherche et vous aidons à identifier les opportunités les plus adaptées."
    },
    {
        step: "03",
        icon: "CalendarCheck",
        title: "Organisons la visite",
        description:
            "Une propriété vous intéresse ? Nous organisons votre visite afin que vous puissiez découvrir le bien et vous faire votre propre opinion."
    },
    {
        step: "04",
        icon: "FileCheck",
        title: "Avançons ensemble",
        description:
            "Lorsque votre décision est prise, nous vous accompagnons dans les différentes démarches nécessaires à la concrétisation de votre projet."
    },
    {
        step: "05",
        icon: "Handshake",
        title: "Concrétisons votre projet",
        description:
            "De la préparation des documents aux échanges avec les différents intervenants, nous restons disponibles pour vous accompagner jusqu'à l'aboutissement de votre démarche."
    }
];

   return (
    <div
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
      <h2
        className="text-center text-[2em]
            text-gray-50 font-bold
            "
      >
        VOTRE PROJET, ÉTAPE PAR ÉTAPE
        </h2>

      <h3 className="text-gray-200 w-[500px] text-center max-[550px]:w-[300px] ">
        Un accompagnement simple et transparent, de votre première demande jusqu'à la concrétisation de votre projet.
      </h3>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative flex flex-row items-start justify-center gap-10
        mt-16 w-full max-w-[1000px]
        max-[750px]:flex-col max-[750px]:items-center max-[750px]:gap-14
        "
      >
        {/* Ligne de connexion horizontale (desktop) */}
        <motion.div
          variants={line}
          style={{ transformOrigin: "left" }}
          className="absolute top-[35px] left-[16%] right-[16%] h-[3px]
          bg-gray-100 origin-left
          max-[750px]:hidden
          "
        />

        {/* Ligne de connexion verticale (mobile) */}
        <motion.div
          variants={line}
          style={{ transformOrigin: "top" }}
          className="hidden max-[750px]:block absolute top-[35px] bottom-[35px]
          left-1/2 -translate-x-1/2 w-[3px] bg-gray-100
          "
        />

        {orderSteps.map((s) => {
          
          return (
            <motion.div
              key={s.step}
              variants={card}
              whileHover={{
                scale: 1.04,
                y: -4,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 18,
              }}
              className="relative z-10 flex flex-col items-center
              text-center w-[280px] max-[750px]:w-[300px]
              "
            >
              <div
                className="relative flex items-center justify-center
                w-[70px] h-[70px] rounded-full bg-gray-50
                border-4 border-white shadow-lg
                "
              >
                <Icon size={28} name={s.icon} className="text-[#222344]" />

                <span
                  className="absolute -top-2 -right-2 flex items-center
                  justify-center w-[26px] h-[26px] rounded-full
                  bg-gray-100 text-[#222344] text-[12px] font-bold
                  border-2 border-[#222344]
                  "
                >
                  {s.step}
                </span>
              </div>

              <h3 className="text-[19px] font-bold text-gray-100 mt-5">
                {s.title}
              </h3>

              <p className="text-[14px] text-gray-400 mt-2 leading-5.5">
                {s.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );



}

export default memo(Etapes);
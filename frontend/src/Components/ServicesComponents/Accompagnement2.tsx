import { memo } from "react"
import { motion } from "framer-motion";

interface AccompagnementStep {
  number: string;
  title: string;
  description: string;
}

const accompagnementSteps: AccompagnementStep[] = [
  {
    number: "01",
    title: "Échangeons",
    description:
      "Nous prenons le temps de comprendre votre projet, vos besoins, vos critères et vos attentes afin de vous orienter au mieux.",
  },
  {
    number: "02",
    title: "Trouvons la bonne opportunité",
    description:
      "Nous vous présentons les biens correspondant à votre recherche et vous aidons à identifier les opportunités les plus adaptées.",
  },
  {
    number: "03",
    title: "Organisons la visite",
    description:
      "Une propriété vous intéresse ? Nous organisons votre visite afin que vous puissiez découvrir le bien et vous faire votre propre opinion.",
  },
  {
    number: "04",
    title: "Avançons ensemble",
    description:
      "Lorsque votre décision est prise, nous vous accompagnons dans les différentes démarches nécessaires à la concrétisation de votre projet.",
  },
  {
    number: "05",
    title: "Concrétisons votre projet",
    description:
      "De la préparation des documents aux échanges avec les différents intervenants, nous restons disponibles pour vous accompagner jusqu'à l'aboutissement de votre démarche.",
  },
];
const Accompagnement2 = () => {

    return(
        <div className="flex flex-col w-full px-5 py-10 gap-10 bg-[#172033] items-center">
            <p className="text-white text-[1.5em] font-bold text-center">
                Un accompagnement à chaque étape
            </p>

            <p className="text-[17px] text-white font-[600] w-[700px]
             max-[750px]:w-[500px] max-[550px]:w-[300px] max-[550px]:text-[15px]
             text-center
             ">
                Un projet immobilier peut représenter une décision importante et parfois nécessiter plusieurs démarches. 
                <script type="module" src=""></script>Chez El Ahlem, nous cherchons à rendre ce parcours plus simple en restant à vos côtés depuis votre première prise de contact jusqu'aux dernières étapes de votre projet.
            </p>


             {/* Timeline */}
      <div className="mx-auto mt-20 w-full max-w-5xl mb-10">

        <div className="relative">

          {/* Ligne verticale */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="
              absolute
              left-[23px]
              top-6
              w-px
              bg-[#D6B98C]/30
              md:left-1/2
              md:-translate-x-1/2
            "
          />

          <div className="flex flex-col gap-14">

            {accompagnementSteps.map((step, index) => (

              <motion.div
                key={step.number}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -40 : 40,
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
                  duration: 0.6,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className={`relative flex w-full ${
                  index % 2 === 0
                    ? "md:justify-start"
                    : "md:justify-end"
                }`}
              >

                <div
                  className={`
                    flex w-full items-start gap-6
                    md:w-[45%]
                    ${
                      index % 2 !== 0
                        ? "md:flex-row-reverse md:text-right"
                        : ""
                    }
                  `}
                >

                  {/* Numéro */}
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      relative
                      z-10
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#D6B98C]/50
                      bg-[#172033]
                      text-sm
                      font-bold
                      text-[#D6B98C]
                    "
                  >
                    {step.number}
                  </motion.div>


                  {/* Contenu */}
                  <div className="flex flex-col gap-2">

                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="text-[15px] leading-7 text-white/60">
                      {step.description}
                    </p>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </div>
        </div>
            
        </div>
    )
}


export default memo(Accompagnement2)
import { memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ContactFaq = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const contactFaqs = [
    {
      id: 1,
      question: "Combien coûte une consultation ?",
      answer:
        "La première consultation ainsi que les visites de nos biens sont entièrement gratuites.",
    },
    {
      id: 2,
      question: "Comment demander une visite ?",
      answer:
        "Vous pouvez effectuer une demande directement depuis la fiche du bien qui vous intéresse ou contacter notre équipe.",
    },
    {
      id: 3,
      question: "Quels types de biens proposez-vous ?",
      answer:
        "Nous proposons notamment des appartements, villas, terrains et locaux, à la vente comme à la location.",
    },
    {
      id: 4,
      question: "Comment vous contacter ?",
      answer:
        "Vous pouvez nous contacter par téléphone, par email ou directement via le formulaire disponible sur cette page.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col w-full py-16 bg-[#172033] items-center px-5"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-[2em] text-gray-100 font-bold"
      >
        Questions fréquentes
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-gray-200 w-[500px] text-center max-[550px]:w-[300px] mt-5 leading-6"
      >
        Retrouvez les réponses aux questions les plus courantes concernant
        nos services et votre projet immobilier.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex flex-col mt-10 mb-5"
      >
        {contactFaqs.map((faq, index) => (
          <motion.div
            key={faq.id}
            
            transition={{ duration: 0.2 }}
            className="bg-white w-[700px] shadow-xl max-[750px]:w-[300px]"
          >
            <button
              className="w-full text-left px-5 py-4 font-medium flex justify-between items-center text-[#172033]"
              onClick={() =>
                setOpenIndex(openIndex === index ? -1 : index)
              }
            >
              <span>{faq.question}</span>

              <motion.span
                animate={{
                  rotate: openIndex === index ? 45 : 0,
                }}
                transition={{ duration: 0.25 }}
                className="text-[1.8em] font-light ml-4"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 px-5 pb-5 leading-6">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default memo(ContactFaq);


import { useNavigate } from "react-router-dom";


interface Service {
  title: string;
  description: string;
  image: string;
}


const ServicesSection = () => {

    const navigate = useNavigate();

    const services: Service[] = [
  {
    title: "Consultation & visites gratuites",
    description:
      "Bénéficiez d’un premier échange gratuit avec notre équipe afin de nous présenter votre projet immobilier et de recevoir des conseils adaptés à vos besoins. Nous vous accompagnons également dans la découverte des biens qui correspondent à vos critères et organisons gratuitement les visites afin de vous permettre de prendre votre décision dans les meilleures conditions.",
    image: "https://res.cloudinary.com/dub4fhabm/image/upload/v1788261851/9912b77f-b721-4d39-a563-ebd82d08db2c.png",
  },
  {
    title: "Location de biens",
    description:
      "Vous recherchez un appartement, une villa, un local ou un autre type de bien à louer ? El Ahlem vous accompagne dans votre recherche en vous proposant des biens correspondant à vos critères, votre budget et vos attentes. De la sélection des biens à l’organisation des visites, nous vous aidons à trouver une location adaptée à votre projet.",
    image: "https://res.cloudinary.com/dub4fhabm/image/upload/v1788261411/add75be3-23cb-43a7-a4d4-f4b1bc7329f5.png",
  },
  {
    title: "Vente de biens",
    description:
      "Vous souhaitez vendre votre propriété ? Nous vous accompagnons dans la mise en valeur et la commercialisation de votre bien afin de lui offrir une visibilité auprès d’acquéreurs potentiels. Notre équipe vous accompagne tout au long du processus, de la présentation du bien jusqu’aux différentes étapes nécessaires à la concrétisation de la vente.",
    image: "https://res.cloudinary.com/dub4fhabm/image/upload/v1788261337/4b1fb5dc-e672-4272-8786-47825ff0886d.png",
  },
  {
    title: "Accompagnement administratif & juridique",
    description:
      "Les démarches liées à une transaction immobilière peuvent être complexes et nécessitent une attention particulière. El Ahlem vous accompagne dans les différentes démarches administratives et juridiques liées à votre projet, notamment dans vos échanges et procédures auprès du notaire, afin de vous aider à avancer avec plus de sérénité et de clarté.",
    image: "https://res.cloudinary.com/dub4fhabm/image/upload/v1788261238/68ab61ab-8d68-4c22-aa97-dd3cb3e2434d.png",
  },
];

    return(
        <div className="flex flex-col w-full items-center py-10 px-5 bg-gray-100 gap-12">

            {services.map((s,i)=>{
                return(
                    <div className="flex flex-col gap-7 items-center">
                        <p className="text-[#222344] font-bold text-[1.5em] text-center">
                            {s.title}
                        </p>

                        <div className="flex flex-row items-center justify-center gap-20 max-[700px]:flex-col max-[700px]:gap-10">
                            <p className={`order-${i%2 === 0 ? "1" : "2"} text-[#222344] w-[500px] text-[17px] max-[1100px]:w-[300px] max-[700px]:text-center`}>
                                {s.description}
                            </p>
                            <img src={s.image}
                            className={`order-${i%2 === 0 ? "2" : "1"} w-[500px] h-auto max-[1100px]:w-[300px]`}
                            />
                        </div>
                    </div>
                )
            })}

            <div className="flex flex-row items-center justify-center gap-4 mt-5">
                        <a className="bg-[#D6B98C] text-black text-[15px] p-2  cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60
                         rounded-[10px] shadow-2xl font-[500]
                        "
                        onClick={()=>navigate("/contact")}
                        >
                            Contactez nous
                        </a>

                        <button className="text-gray-50 bg-[#222344] text-[15px] p-2  cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60
                         rounded-[10px] shadow-2xl font-[500]
                        "
                        onClick={()=>navigate("/biens")}
                        >
                            Découvrez nos biens
                        </button>
                       </div>
        </div>
    )
}


export default ServicesSection;
import { memo } from "react";
import Icon from "../../Icons/Icons";



const ContactInfo = () => {

    const contactInfos = [
  {
    name: "Téléphone",
    icon: "Phone",
    content: "+213 550 22 74 73",
  },
  {
    name: "Email",
    icon: "Mail",
    content: "bouraba.morad@gmail.com",
  },
  {
    name: "Adresse",
    icon: "MapPin",
    content: "Birkhadem, Alger, Algérie",
  },
  {
    name: "Horaires",
    icon: "Clock",
    content: "Samedi – Jeudi | 09:00 – 17:00",
  },
];


    

    return(
        <div className="w-full py-10 px-5 flex flex-row items-start text-[#172033] justify-center gap-20
        max-[1100px]:gap-10 max-[900px]:flex-col max-[900px]:items-center
        ">
            <div className="flex flex-col gap-2 w-[500px] max-[1100px]:w-[400px] max-[450px]:w-[350px]">
                <p className="font-[600] text-[19px]">
                    Échangeons ensemble
                </p>

                <p className="text-[15px] leading-5.5">
                    Nous sommes disponibles pour répondre à vos questions, 
                    vous renseigner sur nos biens et vous accompagner dans 
                    votre projet immobilier. Que votre démarche soit encore 
                    au stade de la réflexion ou que vous soyez déjà à la recherche 
                    d'un bien précis, n'hésitez pas à nous contacter.
                </p>

                <div className="flex flex-col gap-4 mt-3">
                    {contactInfos.map((c,i)=>{
                        return(
                            <div key={i} className="flex flex-col gap-2">
                                <div className="flex flex-row items-center gap-2 font-[600]">
                                    <Icon name={c.icon} size={25}/>
                                    <p>{c.name}</p>
                                </div>

                                <p className="text-[15px]">
                                    {c.content}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <form className="flex flex-col items-center gap-3 w-[500px] p-5 bg-white 
            shadow-2xl border-3 border-[#172033] rounded-[10px]
            max-[1100px]:w-[400px] max-[450px]:w-[350px]
            ">
                <p className="text-[#172033] text-[1.3em] font-bold">
                    Envoyez-nous un message
                </p>

                 <div className="flex flex-col gap-1 w-full mt-5">
                <label htmlFor="nom"
                className="text-[15px] font-[600]"
                >
                    Nom Complet*
                </label>
                <input 
                type="text" 
                name="nom"
                placeholder="Ex : Nabile Belkacem"
                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-50"
                required
                />
            </div>

            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="email"
                className="text-[15px] font-[600]"
                >
                    Email*
                </label>
                <input 
                type="text" 
                name="email"
                placeholder="Ex : nabilebelk@gmail.com"
                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-50"
                required
                />
            </div>

            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="telephone"
                className="text-[15px] font-[600]"
                >
                    Telephone*
                </label>
                <input 
                type="text" 
                name="telephone"
                placeholder="0557894098"
                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-50"
                required
                />
            </div>

            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="Object"
                className="text-[15px] font-[600]"
                >
                    Object*
                </label>
                <input 
                type="text" 
                name="Object"
                placeholder="Ex : Demande d'information"
                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-50"
                required
                />
            </div>

            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="message"
                className="text-[15px] font-[600]"
                >
                    Message*
                </label>
                <textarea 
                name="message"
                placeholder="Ex : Votre message ici"
                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-50"
                required
                />
            </div>

              <button className="bg-[#222344] text-gray-50 w-full py-2 rounded-[5px] cursor-pointer font-[500]
            transition-opacity duration-200 hover:opacity-80 active:opacity-60
            ">
                Soumettre
            </button>

                <div className="flex flex-col gap-1 mt-2"> 
                    <p className="text-center text-gray-800 text-[14px] leading-4.5"> 
                        🏡 Votre projet immobilier mérite une attention particulière. Partagez-nous votre demande, nous vous accompagnerons avec plaisir. 
                        </p> 
                    <p className="text-center text-gray-800 text-[15px]">
                         🕐 Réponse généralement sous 24 heures ouvrées. 
                         </p> 
                </div>
            </form>
        </div>
    )
}


export default memo(ContactInfo)
import { memo } from "react"
import { useAgencyAdminContext } from "../../AdminContexts/AgencyAdminContext"


const Localisation = () => {

    const {agency} = useAgencyAdminContext();

    return(
        <div className="w-full py-10 px-5 flex flex-col items-center text-[#172033]">

            <h2 className="text-[2em] font-bold">
              Retrouvez notre agence immobilière à Alger
            </h2>

            <div className="flex flex-row items-start text-[#172033] justify-center gap-20
        max-[1100px]:gap-10 max-[900px]:flex-col max-[900px]:items-center mt-10">
                <div className="flex flex-col gap-2 w-[500px] max-[1100px]:w-[400px] max-[450px]:w-[350px]">
                <p className="font-[600] text-[19px]">
                    Nous contacter
                </p>

                <p className="text-[15px] leading-5.5">
                    Nous sommes disponibles pour répondre à vos questions, 
                    vous renseigner sur nos biens et vous accompagner dans 
                    votre projet immobilier. Que votre démarche soit encore 
                    au stade de la réflexion ou que vous soyez déjà à la recherche 
                    d'un bien précis, n'hésitez pas à nous contacter.
                </p>

                 <div className="flex flex-col ">
                    <p className="font-[600] text-[18px]">📍 Adresse:</p>
                    <p className="text-[16px]">{agency.address}</p>
                 </div>
                </div>

                <iframe 
            src={agency.mapsUrl}
            className="w-[500px] h-[350px] max-[1100px]:w-[400px] max-[450px]:w-[350px]  max-[1050px]:h-[300px]  max-[800px]:h-[200px] "
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">

           </iframe>
            </div>


            <div className="flex flex-row items-start text-[#172033] justify-center gap-20
        max-[1100px]:gap-10 max-[900px]:flex-col max-[900px]:items-center mt-15">
             <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1788281892/welcoming_z06s9m.jpg"
             alt="Accueil de l'agence immobilière El Ahlem à Kouba, Alger"
                className="w-[500px] h-[350px] object-contain max-[1100px]:w-[400px] max-[450px]:w-[350px]  max-[1050px]:h-[300px]  max-[800px]:h-[200px] "
                />
                <div className="flex flex-col gap-2 w-[500px] max-[1100px]:w-[400px] max-[450px]:w-[350px]">
                <p className="font-[600] text-[19px]">
                   Nous serons heureux de vous accueillir
                </p>

                <p className="text-[15px] leading-5.5">
                   Vous souhaitez échanger directement avec notre équipe, découvrir nos biens ou simplement discuter de votre projet immobilier autour d'un café ? Notre agence vous ouvre ses portes. Venez nous rencontrer dans un cadre convivial et prenez le temps de nous présenter votre projet. Nous serons ravis de vous accueillir, de répondre à vos questions et de vous accompagner dans vos prochaines démarches.
                </p>

                <p className="text-[16px]">Votre projet mérite une attention particulière. Venez en discuter avec nous.</p>
              
                </div>

               

            </div>
        </div>

    )
}

export default memo(Localisation)
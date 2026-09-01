import { memo } from "react"


const Localisation = () => {

    return(
        <div className="w-full py-10 px-5 flex flex-col items-center text-[#172033]">

            <p className="text-[2em] font-bold">
              Retrouvez-nous
            </p>

            <div className="flex flex-row items-start text-[#172033] justify-center gap-20
        max-[1100px]:gap-10 max-[900px]:flex-col max-[900px]:items-center mt-10">
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

                 <div className="flex flex-col ">
                    <p className="font-[600] text-[18px]">📍 Adresse:</p>
                    <p className="text-[16px]">Saint Charles, Les vergers, Kouba, Alger</p>
                 </div>
                </div>

                <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.57932120943832!2d3.0575804784894007!3d36.72384596490868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad00531ca6f9%3A0x8a985ede982d69fb!2sBureau%20d'affaire%20el%20wissem!5e1!3m2!1sfr!2sdz!4v1788280822640!5m2!1sfr!2sdz"
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
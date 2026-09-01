

const ContactHero = () => {

    return(

        <div className="w-full py-10 px-5 flex flex-col items-center text-[#172033]">
             <p className="font-[600] mt-5">
                CONTACT
             </p>
             <p className="text-[2em] font-bold text-center">
                Parlons de votre projet immobilier.
             </p>
             <p 
             className="text-[17px] text-center font-[500] w-[700px] 
             max-[750px]:w-[500px] max-[550px]:w-[300px] max-[550px]:text-[15px]
             mt-5
             ">
                Une question sur l'un de nos biens, une demande de visite ou un projet d'achat,
                 de location ou de vente ? 
                 Notre équipe est à votre disposition pour vous renseigner et vous accompagner.
             </p>
        </div>
    )
}

export default ContactHero;
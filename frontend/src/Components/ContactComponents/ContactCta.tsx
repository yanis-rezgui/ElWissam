import { memo } from "react"

const ContactCta = () => {


    return(
        <div className="flex flex-col py-10 w-full items-center text-[#222344] gap-5">
             <p className="font-bold text-[1.7em]">
                Un projet immobilier ? Parlons-en.
             </p>

             <p className="text-[16px] font-[600] w-[700px] max-[750px]:w-[500px]
              max-[550px]:w-[300px] max-[550px]:text-[15px] text-center">
                Que vous souhaitiez acheter, louer ou vendre un bien,
                 notre équipe est à votre écoute pour vous accompagner 
                 dans votre démarche.
             </p>

             <button
             className="
              bg-[#222344]
              text-white
              text-[15px]
              py-2
              w-[200px]
              cursor-pointer
              rounded-[5px]
              shadow-2xl
              font-[500]
            "
             >
                Voir nos biens
             </button>
        </div>
    )
}


export default memo(ContactCta);
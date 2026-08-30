import { memo } from "react";

const VisiteTips = () => {

    const visitTips = [
    {
        id: 1,
        icon: "🕐",
        text: "Merci de respecter l'heure du rendez-vous."
    },
    {
        id: 2,
        icon: "📞",
        text: "En cas d'empêchement, prévenez-nous à l'avance."
    },
    {
        id: 3,
        icon: "⏰",
        text: "Arrivez idéalement 5 à 10 minutes avant l'heure prévue."
    },
    {
        id: 4,
        icon: "⏱️",
        text: "La visite dure généralement 30 à 45 minutes."
    },
    {
        id: 5,
        icon: "❓",
        text: "Pensez à préparer vos questions concernant le bien."
    }
];


   return(
    <div 
         className="w-[400px] flex flex-col gap-3 bg-white shadow-2xl p-5 rounded-[10px]
         max-[450px]:w-[300px]
         "

    >
        
         <p className="text-[1.1em] font-bold">
                📅 Préparez votre visite
        </p>

        <div className="flex flex-col mt-1 gap-1">
            {visitTips.map((v)=>{
                return(
                    <p key={v.id}
                    className="text-[15px]"
                    >
                        - {v.icon} {v.text}
                    </p>
                )
            })}
        </div>

    </div>
   )
}


export default memo(VisiteTips);
import  { memo } from "react";
import { useBiensContext } from "../../Contexts/BiensContext";



const Description = () => {

    const {currentBien} = useBiensContext();

    return(
        <div className="bg-white w-full p-5 rounded-[10px] shadow-2xl mt-10 flex flex-col gap-2">
            
            <p className="text-[1.6em] font-bold">Description</p>

            <div className="flex flex-col gap-3 ">
                <p>
                    {currentBien?.description}
                </p>

                <div className="flex flex-col gap-1 text-[15px]">
                    <p>Une question ou envie de visiter ce bien ?</p>
                    <div>
                        <p>
                        - Vous êtes intéressé(e) par cette propriété ? N’hésitez pas à nous contacter pour obtenir plus d’informations ou pour réserver une visite. Notre équipe se tient à votre disposition pour vous accompagner et répondre à toutes vos questions.
                        </p>
                        <p>
               - 📅 Réservez votre visite dès maintenant et découvrez ce bien par vous-même.
                        </p>

                        <p>
- Pour ne manquer aucune de nos nouvelles propriétés, offres et actualités, suivez-nous également sur nos réseaux sociaux. Nous y partageons régulièrement nos nouveautés et nos opportunités immobilières.
 </p>
 <p>
- Vous pouvez aussi consulter nos autres biens disponibles afin de trouver la propriété qui correspond le mieux à vos attentes.

  </p>
    <p>

📞 Contactez-nous pour toute information complémentaire ou pour organiser une visite.
 </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default memo(Description);
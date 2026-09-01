import { memo } from "react"
import { useNavigate } from "react-router-dom"


const Accompagnement = () => {

    const navigate = useNavigate()

    return(
        <div className="flex flex-col w-full px-5 py-10 gap-10 bg-[#172033] items-center">
            <p className="text-white text-[1.5em] font-bold text-center">
                Un accompagnement pensé autour de vos besoins
            </p>

            <div className="flex flex-row items-center justify-center gap-20 max-[700px]:flex-col max-[700px]:gap-10">
               <p className="text-white w-[500px] text-[1.1em] max-[1100px]:w-[300px] max-[700px]:text-center">
                Chaque projet immobilier est unique. Que vous soyez à la recherche d'un nouveau logement,
                 que vous souhaitiez investir dans un bien ou que vous envisagiez de vendre
                  ou de louer votre propriété, vos attentes et vos priorités sont différentes. 
                  Chez El Ahlem, nous prenons le temps de comprendre votre projet afin
                   de vous orienter vers les solutions les plus adaptées.
               </p>

               <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1788258334/85dace73-a8d5-48f3-950e-5699d3fd0ead.png"
               className="w-[500px] h-auto max-[1100px]:w-[300px]"
               />
            </div>

            <p className="text-white text-[1.1em] font-[600] w-[500px] text-center max-[550px]:w-[300px]">
                Notre rôle est de simplifier votre parcours immobilier en vous accompagnant dans 
                les différentes étapes de votre démarche. Grâce à une sélection de biens
                 correspondant à vos critères, une organisation efficace des visites et un
                  accompagnement de proximité, nous vous aidons à avancer avec davantage de clarté et de sérénité.
            </p>

                      <div className="flex flex-row items-center justify-center gap-4 mt-5">
                        <a className="bg-[#D6B98C] text-black text-[15px] p-2  cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60
                         rounded-[10px] shadow-2xl font-[500]
                        "
                        onClick={()=>navigate("/contact")}
                        >
                            Contactez nous
                        </a>

                        <button className="bg-gray-50 text-[#222344] text-[15px] p-2  cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60
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

export default memo(Accompagnement)
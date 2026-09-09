import { memo } from "react"
import Icon from "../../Icons/Icons";
import { useBiensContext } from "../../Contexts/BiensContext";
import { useNavigate } from "react-router-dom";


const TypesBiens = () => {

    const propertyTypes = [
    {
        id: 1,
        icon: "Building2",
        title: "Appartements",
        description:
            "Découvrez nos appartements disponibles à la vente ou à la location, adaptés à différents besoins, styles de vie et budgets.",
        cta: "Voir les appartements",
        filter: "APPARTEMENT"
    },
    {
        id: 2,
        icon: "Home",
        title: "Villas",
        description:
            "Explorez notre sélection de villas offrant confort, espace et intimité, pour répondre à vos projets résidentiels.",
        cta: "Voir les villas",
        filter: "VILLA"
    },
    {
        id: 3,
        icon: "LandPlot",
        title: "Terrains",
        description:
            "Trouvez des terrains destinés à différents projets et découvrez les opportunités disponibles selon leur localisation et leurs caractéristiques.",
        cta: "Voir les terrains",
        filter: "TERRAIN"
    },
    {
        id: 4,
        icon: "Store",
        title: "Locaux",
        description:
            "Découvrez nos locaux disponibles pour vos activités professionnelles, commerciales ou vos différents projets d'investissement.",
        cta: "Voir les locaux",
        filter: "LOCAL"
    }
];

     const {setBiensFilter, biensFilter} = useBiensContext();

     const navigate = useNavigate();
    return(
        <section
            className="
                flex flex-col w-full bg-gray-100 items-center
                px-5 py-10 text-[#222344] gap-1
            "
            
        >

            <h2 className="text-[1.2em] font-bold text-center">
                NOS TYPES DE BIENS
            </h2>
            <h3 className="text-[1.5em] font-bold text-center">
                Trouvez le bien qui correspond à votre projet.
            </h3>
            <h3 className="text-[15px] w-[500px] text-center max-[550px]:w-[300px] leading-5">
                Appartement, villa, terrain ou local : découvrez 
                nos différentes catégories de biens et accédez directement
                 aux opportunités qui vous intéressent.
            </h3>

           <div className="flex flex-wrap justify-center items-baseline gap-5 mt-5">
            {propertyTypes.map((p)=>{
                return(
                    <div key={p.id} className="flex flex-col w-[300px] bg-white border-4 border-[#222344]
                    p-2 rounded-[10px] gap-1 h-[250px] relative
                    
                    ">
                       <Icon name={p.icon} size={40}/> 
                       <h3 className="text-[1.3em] font-bold">
                        {p.title}
                       </h3>
                       <h4 className="text-[14px] leading-5">
                        {p.description}
                       </h4>

                       <button 
                       onClick={()=>{
                        setBiensFilter({
                            ...biensFilter,
                            type : p.filter
                        })

                        navigate("/biens")
                       }}
                       className=" bg-[#222344] text-white absolute  flex justify-center items-center
                       bottom-1 w-[275px]  py-2 gap-2 cursor-pointer transition-opacity duration-200 
                       hover:opacity-80 active:opacity-60 rounded-[5px]
                       "
                       >
                        {p.cta} <i className="fa-solid fa-arrow-right"></i>
                       </button>
                    </div>
                )
            })}
            </div>
        </section>
    )
}

export default memo(TypesBiens); 
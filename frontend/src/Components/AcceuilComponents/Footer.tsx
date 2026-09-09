import { Link } from "react-router-dom";
import { useAgencyAdminContext } from "../../AdminContexts/AgencyAdminContext"
import { memo } from "react";


const Footer = () => {

    const {agency} = useAgencyAdminContext();

  

      const pages = [
    {
      name: "Accueil",
      href: "/",
    },
    {
      name: "Nos Biens",
      href: "/biens",
    },
    {
      name: "Services",
      href: "/services",
    },
    {
      name: "Favoris",
      href: "/favoris",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Mon Profil",
      href: "/profile",
    },
  ];

    return(
        <section className="flex flex-col w-full bg-[#222344] text-gray-100">

            <div className="flex flex-row w-full items-baseline justify-between  gap-5 py-10 px-10
            max-[1100px]:flex-col max-[1100px]:items-center max-[1100px]:gap-10
            ">

                <div className="flex flex-col gap-1 items-baseline 
                max-[1100px]:items-center
                ">
                    <h2 className="text-[2em] font-bold text-[#cdad7d]">
                        EL AHLEM
                    </h2>
                    <h2 className="text-[1.3em] font-[600] text-[#cdad7d]">
                        Agence immobilière à Alger
                    </h2>
                    <img src="logo2.jpeg"
                    className="w-[150px] h-[150px] object-cover"
                    alt="" />

                    <p className="w-[270px] text-[15px] leading-5.5 max-[1100px]:text-center">
                        Votre projet immobilier mérite un accompagnement attentif,
                         transparent et personnalisé. Nous vous accompagnons dans
                          vos projets d'achat, de location et de vente à Alger,
                           avec sérieux, proximité et confiance.
                    </p>
                    <div className="flex flex-row gap-5 mt-3 items-center">
                         {agency.socialLinks?.map((s)=>{
                            return(
                                <a href={s.url}>
                                    <i className={`fa-brands fa-${s.name.toLocaleLowerCase()} text-[2em] cursor-pointer 
                                    transition-transform duration-200 hover:scale-110
                                    `}></i>
                                </a>
                            )
                         })}
                    </div>
                </div>

                <div className="flex flex-col gap-3 items-center">
                    <p className="text-[1.4em] font-bold">
                        Navigation
                    </p>

                    <div className="flex flex-col items-center gap-2 text-[16px]">
                        {pages.map((p)=>{
                            return(
                                <Link to={p.href}
                                
                                >{p.name}</Link>
                            )
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-3 items-center">
                    <p className="text-[1.4em] font-bold">
                        Contact
                    </p>

                    <div className="flex flex-col items-center gap-2">
                        {agency.phone.map((p)=>{
                            return(
                                <div className="flex flex-row items-center gap-2">
                                    <i className="fa-solid fa-phone text-[1.3em]"></i>
                                    <p>+213 {p}</p>
                                </div>
                            )
                        })}

                        <div className="flex flex-row items-center gap-2">
                            <i className="fa-solid fa-envelope text-[1.3em]"></i>
                            <p>{agency.email}</p>
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <i className="fa-solid fa-map-pin text-[1.3em]"></i>
                            <p>{agency.address}</p>
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <i className="fa-solid fa-business-time text-[1.3em]"></i>
                            <p>
                                Samedi – Jeudi | 09:00 – 17:00
                            </p>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col gap-3 items-center" >
                    <p className="text-[1.4em] font-bold">
                        Légale
                    </p>

                    <div className="flex flex-col items-center gap-2">
                        <Link to="/privacy">Politique de confidentialité</Link>
                        <Link to="/mentions">Mentions légales</Link>
                    </div>
                </div> 


            </div>

            <div className="w-full  text-white flex flex-row items-center justify-between p-2 border-t
          border-t-gray-300 text-[15px] max-[600px]:flex-col max-[600px]:gap-2
          ">
            <p>
                &copy; 2026 <span className="text-[#cdad7d] font-bold">EL AHLEM</span>. Tous droits réservés.
            </p>

            <p>
                Site conçu et développé par <a  href="https://www.linkedin.com/in/yanis-rezgui/" target="_blank" className="underline">Yanis.</a>
            </p>
          </div>
        </section>
    )
}


export default memo(Footer);
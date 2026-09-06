import { useNavigate } from "react-router-dom";
import Icon from "../../Icons/Icons";
import { memo } from "react";


const ExploreAdminComponent = () => {

const pages = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: "ChartBarBig",
  },
  {
    name: "Vos Biens",
    href: "/admin/biens",
    icon: "Building2",
  },
  {
    name: "Demandes de visites",
    href: "/admin/visites",
    icon: "MapPinHouse",
  },
  {
    name: "Utilisateurs",
    href: "/admin/utilisateurs",
    icon: "Users",
  },
  {
    name: "Avis Clients",
    href: "/admin/testimonials",
    icon: "UserStar",
  },
  {
    name: "Paramétres",
    href: "/admin/general",
    icon: "Settings",
  },
  {
    name: "Profile",
    href: "/admin/profile",
    icon: "User",
  }
];

    const navigate = useNavigate();

    return(
        <div className="bg-white w-[300px] shadow-2xl rounded-[10px]">
            <p className="text-[1.2em] font-bold p-2">
                Explorer
            </p>
            <div className="mt-1 flex flex-col w-full">
               {pages.map((p)=>{
                return(
                  <div onClick={()=>navigate(`${p.href}`)}
                  key={p.name}
                  className="flex flex-row items-center gap-2 p-2 border-t border-t-gray-300
                  cursor-pointer transition-opacity duration-200 hover:opacity-80
                  active:opacity-60
                  "
                  >
                    <Icon name={p.icon} size={25}/>
                    <p className="text-[15px] font-[500]
                    
                    ">{p.name}</p>
                  </div>
                )
               })}
            </div>
        </div>
    )
}

export default memo(ExploreAdminComponent);
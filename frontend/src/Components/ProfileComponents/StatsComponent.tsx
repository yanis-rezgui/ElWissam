import  { memo } from "react"
import Icon from "../../Icons/Icons";
import { useAuthContext } from "../../Contexts/AuthContext";


const StatsComponent = () => {

    const {user} = useAuthContext();

    return(
        <div
        
        className="bg-white w-[300px] shadow-2xl rounded-[10px]">

              <p className="text-[1.2em] font-bold p-2">
                Vos statistiques
            </p>
            <div 
                  className="flex flex-row items-center gap-2 p-2 border-t border-t-gray-300
                  
                  "
                  >
                    <Icon name="Star" size={25}/>
                    <p className="text-[17px] font-[500]
                    
                    ">{user?.favoris.length} Favoris</p>
                  </div>
        </div>
    )

}

export default memo(StatsComponent);
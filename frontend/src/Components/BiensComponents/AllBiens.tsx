import  { memo } from "react";
import { useBiensContext } from "../../Contexts/BiensContext"
import BienCard from "./BienCard";
import BiensPagination from "./BiensPagination";



const AllBiens = () => {

    const {biens} = useBiensContext();
    return(
        <>
        <div className="flex flex-wrap items-baseline gap-3 justify-center">
            {biens.map((b)=>{
                return(
                    <BienCard bien={b} key={b.id}/>
                )
            })}
        </div>

        <BiensPagination/>

        </>
    )
}

export default memo(AllBiens);
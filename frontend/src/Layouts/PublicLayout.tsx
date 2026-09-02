import  { memo } from "react"
import { Outlet } from "react-router-dom"




const PublicLayout = () => {

    return(
        <main className="w-full pt-[60px]">
            <Outlet/>
        </main>
    )
}

export default memo(PublicLayout);
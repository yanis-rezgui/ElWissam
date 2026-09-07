import  { memo } from "react"
import { Outlet } from "react-router-dom"
import Header from "../Components/BaseComponents/Header";




const PublicLayout = () => {

    return(
        <>
        <Header/>
        <main className="w-full pt-[60px]">
            <Outlet/>
        </main>
        </>
    )
}

export default memo(PublicLayout);
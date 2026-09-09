import  { memo } from "react"
import { Outlet } from "react-router-dom"
import Header from "../Components/BaseComponents/Header";
import Footer from "../Components/AcceuilComponents/Footer";




const PublicLayout = () => {

    return(
        <>
        <Header/>
        <main className="w-full pt-[60px]">
            <Outlet/>
        </main>
        <Footer/>
        </>
    )
}

export default memo(PublicLayout);
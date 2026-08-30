import  { memo } from "react"
import { useAuthContext } from "../Contexts/AuthContext";
import SignIn from "../Components/ProfileComponents/SignIn";
import SignUp from "../Components/ProfileComponents/SignUp";



const Profile = () => {

    const {showSignIn} = useAuthContext();
    return(
        <section className="min-h-screen flex flex-col w-full bg-gray-100 items-center">
            <div className="w-[1400px] h-full flex flex-row justify-between items-center gap-5 bg-white p-5 shadow-2xl
            mt-10 rounded-[10px] max-[1450px]:w-[1000px] max-[1050px]:flex-col max-[1050px]:gap-10 max-[1050px]:w-[600px]
            max-[650px]:w-[350px]
            ">
                <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1788108591/179be5a3-f9a4-4db7-bbd1-b953c4003bcd.png"
                
                alt=""  className="h-full object-cover order-1 max-[1050px]:order-2"/>
                <div className="order-2 max-[1050px]:order-1 w-full">
                {
                   showSignIn ?
                     <SignIn/>
                     : 
                       <SignUp/>
                }
                </div>
            </div>
        </section>
    )
}

export default memo(Profile);
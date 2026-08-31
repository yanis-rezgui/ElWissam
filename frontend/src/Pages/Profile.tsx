import  { memo } from "react"
import { useAuthContext } from "../Contexts/AuthContext";
import SignIn from "../Components/ProfileComponents/SignIn";
import SignUp from "../Components/ProfileComponents/SignUp";
import UserInfo from "../Components/ProfileComponents/UserInfo";
import SignOutPop from "../Components/ProfileComponents/SignOutPop";
import ExploreComponent from "../Components/ProfileComponents/ExploreComponent";
import StatsComponent from "../Components/ProfileComponents/StatsComponent";
import SecurityComponent from "../Components/ProfileComponents/SecurityComponent";
import SecurityInfo from "../Components/ProfileComponents/SecurityInfo";



const Profile = () => {

    const {showSignIn, user, showSignOut} = useAuthContext();
    return(
        <>
        <section className="min-h-screen flex flex-col w-full bg-gray-100 items-center">
            {!user ?
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
            : 
            <>

                 <p className="text-[1.7em] font-black text-[#222344] mt-10">
                    Bonjour {user.firstName} 👋</p>

                <p className="text-center text-[15px] mt-3 font-[500] text-[#222344] px-3 w-[600px] max-[650px]:w-[320px]">
                    Bienvenue dans votre espace personnel. 
                    Retrouvez ici toutes les informations liées à votre compte et gardez vos biens
                     favoris à portée de main. Prenez le temps de parcourir vos sélections, 
                     de découvrir les opportunités qui pourraient vous correspondre et de gérer
                      facilement vos préférences, le tout depuis un espace pensé pour vous 
                      accompagner dans votre recherche immobilière.

                </p>

                <div className="flex flex-row items-start gap-5 mt-10 max-[900px]:flex-col max-[900px]:items-center
                max-[900px]:justify-center mb-10
                ">
                    <div className="flex flex-col items-center gap-5">
                        <UserInfo/>
                        <SecurityComponent/>
                        <SecurityInfo/>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                    <ExploreComponent/>
                    <StatsComponent/>
                    </div>
                </div>
            </>
}
        </section>

        {showSignOut && <SignOutPop/>}

        </>
    )
}


export default memo(Profile);
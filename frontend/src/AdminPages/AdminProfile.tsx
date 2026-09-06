import { memo } from "react"
import UserAdminInfo from "../AdminComponents/AdminProfileComponents.tsx/UserAdminInfo";
import SecurityComponent from "../Components/ProfileComponents/SecurityComponent";
import SignOutComponent from "../AdminComponents/AdminProfileComponents.tsx/SignOutComponent";
import Timezone from "../AdminComponents/AdminProfileComponents.tsx/Timezone";
import SecurityAdminInfo from "../AdminComponents/AdminProfileComponents.tsx/SecurityAdminInfo";
import ExploreAdminComponent from "../AdminComponents/AdminProfileComponents.tsx/ExploreAdminComponent";
import AgenceInfo from "../AdminComponents/AdminProfileComponents.tsx/AgenceInfo";



const AdminProfile = () => {

    return(
        <section className="flex flex-col min-h-screen bg-gray-100 w-full items-center">

            <p className="text-[2em] text-[#222344] font-bold mt-15">
                Profil
            </p>

            <p className="text-[#222344] text-[16px] w-[600px] text-center max-[650px]:w-[300px] mt-5">
                 Gérez vos informations personnelles,
                  la sécurité de votre compte et vos préférences depuis un seul espace.
                   Gardez votre profil à jour afin de profiter d’une expérience d’administration simple,
                    sécurisée et adaptée à vos besoins.
            </p>

            <div className="flex flex-row items-start gap-5 mt-10 max-[900px]:flex-col max-[900px]:items-center
                            max-[900px]:justify-center mb-10
                            ">
                                <div className="flex flex-col items-center gap-5">
                                    <UserAdminInfo/>
                                    <SecurityComponent/>
                                    <SignOutComponent/>
                                    <Timezone/>
                                    <SecurityAdminInfo/>
                                </div>
                                <div className="flex flex-col items-center gap-6">
                                      <ExploreAdminComponent/>
                                      <AgenceInfo/>
                                </div>
                            </div>

        </section>
    )
}

export default memo(AdminProfile);
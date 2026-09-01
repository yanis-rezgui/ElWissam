import { memo } from "react"
import ServiceHero from "../Components/ServicesComponents/ServiceHero"
import Accompagnement from "../Components/ServicesComponents/Accompagnement"
import ServicesSection from "../Components/ServicesComponents/ServicesSection"
import Accompagnement2 from "../Components/ServicesComponents/Accompagnement2"
import ServicesCta from "../Components/ServicesComponents/ServicesCta"


const Services = () => {

    return(

        <section className="flex flex-col w-full">

            <ServiceHero/>
            <Accompagnement/>
            <ServicesSection/>
            <Accompagnement2/>
            <ServicesCta/>
        </section>
    )
}


export default memo(Services)
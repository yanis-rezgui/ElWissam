import ContactHero from "../Components/ContactComponents/ContactHero";
import ContactInfo from "../Components/ContactComponents/ContactInfo";
import Localisation from "../Components/ContactComponents/Localisation";



const Contact = () => {

    return(
        <section className="min-h-screen flex flex-col w-full bg-gray-100 items-center">
           <ContactHero/>
           <ContactInfo/>
           <Localisation/>
        </section>
    )
}

export default Contact;
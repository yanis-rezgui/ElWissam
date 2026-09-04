import { memo } from "react"
import { useTestimonialsAdminContext } from "../AdminContexts/TestimonialsAdminContext"
import TestimonialCard from "../AdminComponents/AdminTestimonialsComponents/TestimonialCard";
import AddTestimonialPop from "../AdminComponents/AdminTestimonialsComponents/AddTestimonialPop";
import DeleteTestimonialPop from "../AdminComponents/AdminTestimonialsComponents/DeleteTestimonialPop";
import UpdateTestimonialPop from "../AdminComponents/AdminTestimonialsComponents/UpdateTestimonialPop";
import TestimonialsFilter from "../AdminComponents/AdminTestimonialsComponents/TestimonialsFilter";


const AdminTestimonials = () => {

    const {allTestimonials, showAddTestimonialPop, showDeleteTestimonialPop, showUpdateTestimonialPop, setShowAddTestimonialPop} = useTestimonialsAdminContext();

    return(
        <>
        <section className="min-h-screen w-full flex flex-col items-center bg-gray-100">

            <p className="mt-[30px] text-[#222344] font-bold text-center text-[1.8em]">
                Avis clients
            </p>

            <p className="text-[16px] text-[#222344] text-center mt-2 w-[400px] leading-5.5
                max-[450px]:text-[15px] max-[450px]:w-[300px]">
                Consultez, ajoutez et gérez les avis clients affichés sur le site de l’agence.
                 Les avis actifs sont visibles publiquement et contribuent à renforcer la confiance des visiteurs.
            </p>

            <button className="bg-[#222344] text-white text-[14px] p-2 rounded-[5px] cursor-pointer
          transition-opacity duration-200 hover:opacity-80 active:opacity-60 mt-3 font-[600]
          "
          onClick={()=>setShowAddTestimonialPop(true)}
          >
                Ajouter un témoignage
            </button>

            <TestimonialsFilter/>

                                <div className="flex flex-wrap justify-center items-center gap-5 mt-10 mb-10">
                       {allTestimonials.map((t)=>{
                        return(
                            <TestimonialCard testimonial={t} key={t.id}/>
                        )
                       })}
                    </div>

        </section>

                {showAddTestimonialPop && <AddTestimonialPop/>}
                 {showDeleteTestimonialPop && <DeleteTestimonialPop/>}
                 {showUpdateTestimonialPop && <UpdateTestimonialPop/>}

        </>
    )
}

export default memo(AdminTestimonials);
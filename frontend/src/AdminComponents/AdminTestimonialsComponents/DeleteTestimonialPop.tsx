import { memo } from "react";
import { useTestimonialsAdminContext } from "../../AdminContexts/TestimonialsAdminContext";


const DeleteTestimonialPop = () => {

    const {setShowDeleteTestimonialPop, deleteTestimonial, loadingDeleteTestimonial, testimonialDetails, msg} = useTestimonialsAdminContext();

    return(
         <div onClick={() => setShowDeleteTestimonialPop(false)} className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
            <div
                
                onClick={(e) => e.stopPropagation()} 
                className="w-[800px] h-[300px] bg-white flex flex-col rounded-[10px] overflow-y-auto
                p-5 relative
                "
            >
                <p className="text-center text-[18px] mt-5 text-[#0F172A]">
                    Etes vous sur de vouloir supprimer l'avis de : <strong>{testimonialDetails?.fullName}</strong> de 
                votre carte ?</p>

                                    <div className="h-[30px] flex justify-center items-center text-[15px] text-center
                    text-red-600
                    ">
                         {msg && <span>{msg}</span>}
                    </div>

                   <div className="flex flex-row justify-center items-center gap-2">
                <button
                 onClick={()=>{
                    deleteTestimonial(testimonialDetails!.id)
                 }}
                className="bg-[#0F172A] text-white text-[15px] font-[500]
                py-2 mt-3 rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80
                active:opacity-60  justify-center px-3 flex flex-row items-center
                gap-1
                ">
                   {loadingDeleteTestimonial ? "Supression..." : "Oui, Supprimer"}
                </button>

                <button 
                onClick={()=>{
                    setShowDeleteTestimonialPop(false);
                   
                }}
                className=" bg-red-600 text-white text-[15px] font-[500]
                py-2 mt-3 rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80
                active:opacity-60 justify-center px-3 flex flex-row items-center
                gap-1 
                ">
                   Annuler
                </button>

                </div>

                <div className="text-[2em] text-[#0F172A] cursor-pointer absolute 
                top-0 right-2 cursor-pointer transition-opacity duration-200
                hover:opacity-80 active:opacity-60
                "
                onClick={()=>setShowDeleteTestimonialPop(false)}
                >
                    &times;
                </div>
            </div>
        </div>
    )
}

export default memo(DeleteTestimonialPop);
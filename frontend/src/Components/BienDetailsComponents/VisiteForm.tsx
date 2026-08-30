import { memo } from "react";
import { useVisiteContext } from "../../Contexts/VisiteContext";
import { useBiensContext } from "../../Contexts/BiensContext";




const VisiteForm = () => {

    const {addVisite, successMsg, errorMsg} = useVisiteContext();
    const {currentBien} = useBiensContext();

    const submitForm = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        const nom = formData.get("nom") as string;
        const email = formData.get("email") as string;
        const telephone = formData.get("telephone") as string;
        const dateSouhaitee = formData.get("dateSouhaitee") as string;
        const message = formData.get("message") as string;

        if(!nom || nom === "") return;
        if(!email || email === "") return;
        if(!telephone || telephone === "") return;
        if(!dateSouhaitee || dateSouhaitee === "") return;
        if(!message || message === "") return;

        await addVisite(nom, email, telephone, dateSouhaitee, message, currentBien!.id);
        
        form.reset()

    }

    

    return(
        <form 
        onSubmit={submitForm}
         className="w-[400px] flex flex-col gap-3 items-center bg-white shadow-2xl p-5 rounded-[10px]
         max-[450px]:w-[300px]
         "
         id="visite"
         >
            
            <p className="text-[1.4em] font-bold">
                Demander une visite 
            </p>

            <p className="text-[17px]">
               Organisez une visite de ce bien 
            </p>

            <div className="flex flex-col gap-1 w-full -scroll-mt-5">
                <label htmlFor="name"
                className="text-[15px] font-[600]"
                >
                    Nom Complet*
                </label>
                <input 
                type="text" 
                name="nom"
                placeholder="Ex : Nabile Belkacem"
                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-50"
                required
                />
            </div>

            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="email"
                className="text-[15px] font-[600]"
                >
                    Email*
                </label>
                <input 
                type="text" 
                name="email"
                placeholder="Ex : nabilebelk@gmail.com"
                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-50"
                required
                />
            </div>

            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="telephone"
                className="text-[15px] font-[600]"
                >
                    Telephone*
                </label>
                <input 
                type="text" 
                name="telephone"
                placeholder="0557894098"
                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-50"
                required
                />
            </div>

            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="dateSouhaitee"
                className="text-[15px] font-[600]"
                >
                    Date Souhaitee
                </label>
                <input 
                type="date" 
                name="dateSouhaitee"
                placeholder="Ex : 15 septembre 2026 "
                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-50"
                />
            </div>

            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="message" className="text-[15px] font-[600]">
                    Message
                </label>

                <textarea 
                className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px] bg-gray-50"
                name="message" id=""></textarea>
            </div>

            <button className="bg-[#222344] text-gray-50 w-full py-2 rounded-[5px] cursor-pointer font-[500]
            transition-opacity duration-200 hover:opacity-80 active:opacity-60
            ">
                Soumettre
            </button>

           <div className="flex flex-col gap-1">
            <p className="text-center text-gray-800 text-[15px]">
                🔒 Vos informations restent confidentielles. Seul l'administrateur de l'agence a accès à ces informations soumises.
            </p>
            <p className="text-center text-gray-800 text-[15px]"> 
                🕐 Réponse généralement sous 24 heures ouvrées.
            </p>
            </div>
           <div className=" h-[45px] max-[500px]:h-[60px]">
            {errorMsg && 
             <p className="text-red-700 font-[500] text-[14px] text-center leading-5">
                {errorMsg}
             </p>
            }

            {
                successMsg &&
                <p className="text-green-700 font-[500] text-[14px] text-center leading-5">
                    {successMsg}
                </p>
            }
            </div>

        </form>
    )
}


export default memo(VisiteForm);
import { memo } from "react"
import { useAuthContext } from "../../Contexts/AuthContext";





const SignUp = () => {

    const {setShowSignIn, signUp, loadingSignUp, msg} = useAuthContext();

    const handleFormSubmit = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const password1 = formData.get("password1") as string;
        const password2 = formData.get("password2") as string;

        await signUp(firstName, lastName, email, password1, password2)

    }
    return(

        <div className="flex flex-col justify-center items-center gap-3">
           <p className="font-bold text-[1.5em]">
            Créer votre compte
           </p>
           <p className="text-center text-[16px] font-[500]">
            Rejoignez ElWissam et retrouvez facilement
            vos biens et demandes de visite.
           </p>

           <form className="flex flex-col gap-3 w-full mt-1"
           onSubmit={handleFormSubmit}
           >

             <div className="flex flex-col gap-1">
                <label htmlFor="firstName"
                className="text-[15px] font-bold"
                >
                    Prénom*
                </label>
                <input type="text"
                name="firstName"
                placeholder="Ex: Ahmed"
                className="p-2 text-[15px] bg-gray-50 border border-gray-300 rounded-[5px]"
                required
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="lastName"
                className="text-[15px] font-bold"
                >
                    Nom*
                </label>
                <input type="text"
                name="lastName"
                className="p-2 text-[15px] bg-gray-50 border border-gray-300 rounded-[5px]"
                placeholder="Ex: Chaib"
                required
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="email"
                className="text-[15px] font-bold"
                >
                    Email*
                </label>
                <input type="email"
                name="email"
                placeholder="ahmedchaib@gmail.com"
                className="p-2 text-[15px] bg-gray-50 border border-gray-300 rounded-[5px]"
                required
                />
            </div>


            <div className="flex flex-col gap-1">
                <label htmlFor="password1"
                className="text-[15px] font-bold"
                >
                    Mot de passe*
                </label>
                <input 
                type="password" 
                name="password1"
                className="p-2 text-[15px] bg-gray-50 border border-gray-300 rounded-[5px]"
                placeholder="Mot de passe"
                required
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password2"
                className="text-[15px] font-bold"
                >
                    Confirmation Mot de passe*
                </label>
                <input 
                type="password" 
                name="password2"
                className="p-2 text-[15px] bg-gray-50 border border-gray-300 rounded-[5px]"
                placeholder="Confirmation du mot de passe"
                required
                />
            </div>

         
             <div className="h-[30px] flex justify-center items-center text-center">

               {msg &&
                 <p className="text-[15px] text-red-600 font-[500]">
                    {msg}
                 </p>
               }
             </div>
           

            <button type="submit"
            className="w-full text-gray-50 bg-[#222344] p-2 rounded-[5px] text-[15px]
            font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60
            "
            >
                {!loadingSignUp ? "Créer mon compte" :  "Création" }
            </button>
           </form>
           <p
           onClick={()=>setShowSignIn(true)}
           className="text-[15px] cursor-pointer text-gray-800 text-center underline
           transition-opacity duration-200 hover:opacity-80 active:opacity-60
           "
           >
            Vous avez déjà un compte ?
            Se connecter
           </p>
        </div>
    )
}


export default memo(SignUp);
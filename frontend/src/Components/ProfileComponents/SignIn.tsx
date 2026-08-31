import { memo } from "react"
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Contexts/AuthContext";




const SignIn = () => {

    const {setShowSignIn, signIn, loadingSignIn, msg} = useAuthContext();

    const handleForm = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        await signIn(email, password);
    }

    return(

        <div className="flex flex-col justify-center items-center gap-3 ">
           <p className="font-bold text-[1.5em]">
            Bienvenue
           </p>
           <p className="text-center text-[16px] font-[500]">
            Connectez-vous à votre espace
           </p>

           <form 
           onSubmit={handleForm}
           className="flex flex-col gap-3 w-full mt-1">

            <div className="flex flex-col gap-1">
                <label htmlFor="email"
                className="text-[15px] font-bold"
                >
                    Email*
                </label>
                <input type="email"
                name="email"
                required
                className="p-2 text-[15px] bg-gray-50 border border-gray-300 rounded-[5px]"
                placeholder="ahmedchaib@gmail.com"
                />
            </div>


            <div className="flex flex-col gap-1">
                <label htmlFor="password"
                className="text-[15px] font-bold"
                >
                    Password*
                </label>
                <input 
                type="password" 
                name="password"
                required
                className="p-2 text-[15px] bg-gray-50 border border-gray-300 rounded-[5px]"
                placeholder="Mot de passe"
                />
            </div>

            <Link to="/"
            className="text-[15px] cursor-pointer text-gray-800 
           transition-opacity duration-200 hover:opacity-80 active:opacity-60
           "
            >Mot de passe oublié ? </Link>

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
                {loadingSignIn ? "Connexion..." :  "Se connecter"}
            </button>
           </form>

           <p onClick={()=>setShowSignIn(false)}
            className="text-[15px] cursor-pointer text-gray-800 text-center underline
           transition-opacity duration-200 hover:opacity-80 active:opacity-60
           "
            >
            Pas encore de compte ?
            Créer un compte
           </p>
        </div>
    )
}


export default memo(SignIn);
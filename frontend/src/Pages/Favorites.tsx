import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, LogIn, UserPlus, SearchX } from "lucide-react";
import { useAuthContext } from "../Contexts/AuthContext"; // ⚠️ adapte le chemin/nom si besoin
import BienCard from "../Components/BiensComponents/BienCard";

const Favorites = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    // =========================
    // VISITEUR NON CONNECTÉ
    // =========================

    if (!user) {
        return (
            <section className="flex flex-col items-center  min-h-screen w-full bg-gray-50 px-5">
                <div className="flex flex-col items-center text-center gap-4 max-w-[420px] bg-white
                border border-gray-200 rounded-2xl shadow-sm p-8 mt-15">

                    <div className="w-16 h-16 rounded-full bg-[#222344] flex items-center justify-center">
                        <Heart size={26} className="text-[#cdad7d]" />
                    </div>

                    <p className="text-[1.4em] font-bold text-[#222344]">
                        Tes favoris t'attendent
                    </p>

                    <p className="text-gray-500 text-[14.5px]">
                        Crée un compte ou connecte-toi pour enregistrer les biens qui
                        t'intéressent et les retrouver ici à tout moment.
                    </p>

                    <div className="flex flex-col gap-2.5 w-full mt-2">
                        <button
                            onClick={() => navigate("/profile")}
                            className="flex items-center justify-center gap-2 w-full bg-[#222344] text-white
                            font-semibold text-[14px] py-2.5 rounded-lg transition-all duration-200
                            hover:bg-[#2f3159] active:scale-95"
                        >
                            <LogIn size={16} />
                            Se connecter
                        </button>

                        <button
                            onClick={() => navigate("/profile")}
                            className="flex items-center justify-center gap-2 w-full bg-white text-[#222344]
                            font-semibold text-[14px] py-2.5 rounded-lg border border-gray-300
                            transition-all duration-200 hover:border-[#222344] active:scale-95"
                        >
                            <UserPlus size={16} />
                            Créer un compte
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    // =========================
    // UTILISATEUR CONNECTÉ
    // =========================

    const favoris = user.favoris ?? [];

    return (
        <section className="flex flex-col items-center min-h-screen w-full bg-gray-100 pb-16">

            <div className="flex flex-col items-center w-full bg-white border-b border-gray-200 pt-10 pb-8 px-4">
                <h1 className="text-[2em] font-bold text-[#222344] text-center">
                    Mes favoris
                </h1>
                <p className="text-gray-500 mt-2 text-[15px] text-center">
                    {favoris.length > 0
                        ? `${favoris.length} bien${favoris.length > 1 ? "s" : ""} enregistré${favoris.length > 1 ? "s" : ""}`
                        : "Tu n'as pas encore de bien enregistré"}
                </p>
            </div>

            {favoris.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-20 text-center px-5">
                    <SearchX size={40} className="text-gray-400" />
                    <p className="text-[#222344] font-semibold">Aucun favori pour le moment</p>
                    <p className="text-gray-500 text-sm max-w-[350px]">
                        Parcours nos biens et clique sur le cœur d'une annonce pour l'ajouter ici.
                    </p>
                    <button
                        onClick={() => navigate("/biens")}
                        className="mt-2 bg-[#222344] text-white font-semibold text-[14px] py-2.5 px-5
                        rounded-lg transition-all duration-200 hover:bg-[#2f3159] active:scale-95"
                    >
                        Découvrir les biens
                    </button>
                </div>
            ) : (
                <div className="flex flex-wrap gap-4 justify-center w-full max-w-[900px] mt-8 px-5">
                    {favoris.map((bien) => (
                        <BienCard bien={bien} key={bien.id} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default memo(Favorites);
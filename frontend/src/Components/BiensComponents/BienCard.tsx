import { memo, useEffect, useState } from "react";
import type { Bien } from "../../Types/Types";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, Ruler, ArrowRight } from "lucide-react";
import { useAuthContext } from "../../Contexts/AuthContext"; // ⚠️ adapte le nom si ton hook s'appelle autrement
import { useFavoritesContext } from "../../Contexts/FavoritesContext";

const BienCard = ({ bien }: { bien: Bien }) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { toggleFavorite, loadingToggleFavorites } = useFavoritesContext();

    const [isFavori, setIsFavori] = useState(
        user?.favoris?.some((f) => f.id === bien.id) ?? false
    );

    // resynchronise l'état local quand user est rafraîchi après un toggle
    // (getUser() est appelé dans toggleFavorite)
    useEffect(() => {
        setIsFavori(user?.favoris?.some((f) => f.id === bien.id) ?? false);
    }, [user]);

    const handleToggleFavori = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user || loadingToggleFavorites) return;

        setIsFavori((prev) => !prev); // optimistic update, resync via useEffect ensuite
        await toggleFavorite(bien.id);
    };

    return (
        <div
            onClick={() => navigate(`/bien/${bien.id}`)}
            className="group relative flex flex-col w-[270px] bg-white rounded-2xl overflow-hidden
            border border-gray-200 shadow-sm cursor-pointer
            transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-300
            max-[500px]:w-full"
        >
            {/* IMAGE */}
            <div className="relative w-full h-[170px] overflow-hidden">
                <img
                    src={bien.images[0].url}
                    alt={bien.nom}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* badge service */}
                <span
                    className={`absolute top-3 left-3 text-[12px] font-semibold px-2.5 py-1 rounded-full
                    ${bien.service === "LOCATION" ? "bg-[#cdad7d] text-[#222344]" : "bg-[#222344] text-[#cdad7d]"}`}
                >
                    {bien.service === "LOCATION" ? "À louer" : "À vendre"}
                </span>

                {/* bouton favoris - uniquement si connecté, apparaît au survol */}
                {user !== null && (
                    <button
                        aria-label={isFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
                        onClick={handleToggleFavori}
                        disabled={loadingToggleFavorites}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center
                        bg-white/90 backdrop-blur-sm shadow-md transition-all duration-200
                        opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                        hover:scale-110 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed
                        ${isFavori ? "opacity-100 translate-y-0" : ""}`}
                    >
                        <Heart
                            size={16}
                            className={isFavori ? "fill-red-500 text-red-500" : "text-[#222344]"}
                        />
                    </button>
                )}
            </div>

            {/* CONTENU */}
            <div className="flex flex-col gap-2 p-3.5">
                <h2 className="text-[16px] font-bold text-[#222344] truncate">{bien.nom}</h2>

                <div className="flex items-center gap-1.5 text-[13.5px] text-gray-500">
                    <MapPin size={14} className="shrink-0 text-[#cdad7d]" />
                    <span className="truncate">{bien.localisation}</span>
                </div>

                <div className="flex items-center justify-between text-[12.5px] text-gray-600 mt-1">
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{bien.type}</span>
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                        <Ruler size={12} /> {bien.superficie} m²
                    </span>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2.5 border-t border-gray-100">
                    <div className="flex flex-col">
                        <span className="text-[17px] font-bold text-[#222344]">
                            {bien.prix.toLocaleString("fr-FR")} DA
                        </span>
                        {bien.negociable && (
                            <span className="text-[11px] text-[#cdad7d] font-medium">
                                Prix négociable
                            </span>
                        )}
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/bien/${bien.id}`);
                        }}
                        className="flex items-center gap-1.5 bg-[#222344] text-white text-[13px] font-medium
                        py-2 px-3.5 rounded-lg transition-all duration-200
                        hover:bg-[#2f3159] hover:gap-2.5 active:scale-95"
                    >
                        Voir <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(BienCard);
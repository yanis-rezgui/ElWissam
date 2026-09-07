import { memo, useState } from "react";
import { generateBienPdf } from "../../utils/generateBienPdf";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBiensContext } from "../../Contexts/BiensContext";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useFavoritesContext } from "../../Contexts/FavoritesContext";
import type { StatutBien } from "../../Types/Types";
import {
  CircleCheck,
  Clock3,
  KeyRound,
  CircleDollarSign,
  Share2,
  Heart,
  Printer,
  Check,
  type LucideIcon,
} from "lucide-react";

interface StatutConfig {
  label: string;
  icon: LucideIcon;
  textColor: string;
  bgColor: string;
}

const statutBienConfig: Record<Exclude<StatutBien, "">, StatutConfig> = {
  DISPONIBLE: {
    label: "Disponible",
    icon: CircleCheck,
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  RESERVE: {
    label: "Réservé",
    icon: Clock3,
    textColor: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  VENDU: {
    label: "Vendu",
    icon: CircleDollarSign,
    textColor: "text-red-600",
    bgColor: "bg-red-50",
  },
  LOUE: {
    label: "Loué",
    icon: KeyRound,
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
};

const FirstSection = () => {
  const { currentBien } = useBiensContext();
  const { user } = useAuthContext();
  const { toggleFavorite, loadingToggleFavorites } = useFavoritesContext();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  const statut = currentBien?.statut;

  const isFavori = user?.favoris?.some((f) => f.id === currentBien?.id) ?? false;

  // =========================
  // PARTAGE
  // =========================

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: currentBien?.nom,
          text: `Découvre ce bien : ${currentBien?.nom} à ${currentBien?.localisation}`,
          url,
        });
      } catch {
        // l'utilisateur a annulé le partage
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Impossible de copier le lien");
    }
  };

  // =========================
  // FAVORIS
  // =========================

  const handleToggleFavori = async () => {
    if (!currentBien) return;

    if (!user) {
      navigate("/profile", { state: { from: window.location.pathname } });
      return;
    }

    await toggleFavorite(currentBien.id);
  };

  // =========================
  // IMPRESSION
  // =========================

  const [generatingPdf, setGeneratingPdf] = useState(false);

const handlePrint = async () => {
    if (!currentBien || generatingPdf) return;

    setGeneratingPdf(true);
    try {
        await generateBienPdf(currentBien);
    } catch (err) {
        console.error("Erreur lors de la génération du PDF", err);
    } finally {
        setGeneratingPdf(false);
    }
};
  const currentStatutConfig = statut && statut !== "" ? statutBienConfig[statut as Exclude<StatutBien, "">] : null;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        {currentStatutConfig && (
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 w-fit
            ${currentStatutConfig.bgColor}
            ${currentStatutConfig.textColor}`}
          >
            {(() => {
              const Icon = currentStatutConfig.icon;
              return (
                <>
                  <Icon size={15} strokeWidth={2.2} />
                  <span className="text-sm font-medium">
                    {currentStatutConfig.label}
                  </span>
                </>
              );
            })()}
          </div>
        )}

        <div className="flex flex-row gap-3 items-center">
          <button
            className="bg-[#222344] text-white px-2 py-1 text-[15px] font-[600] rounded-[5px]
            transition-transform duration-200 hover:scale-105"
          >
            En {currentBien?.service === "LOCATION" ? "Location" : "Vente"}
          </button>
          <button
            className="bg-[#222344] text-white px-2 py-1 text-[15px] font-[600] rounded-[5px]
            transition-transform duration-200 hover:scale-105"
          >
            {currentBien?.type}
          </button>
        </div>
      </div>

      <div
        className="flex flex-row items-center justify-between max-[1350px]:flex-col
        max-[1350px]:items-baseline max-[1350px]:gap-5"
      >
        <div className="flex flex-col gap-3">
          <p className="text-[2em] font-bold leading-9">
            {currentBien?.service === "VENTE" ? "Vente" : "Location"} {currentBien?.nom}
          </p>
          <div className="flex flex-row items-center gap-1 text-[15px] font-[500] text-gray-800">
            <i className="fa-solid fa-location-dot"></i>
            <p>{currentBien?.localisation}</p>
          </div>

          <a
            href="#visite"
            className="bg-[#222344] text-[#cdad7d] w-[190px] text-[15px] py-2 rounded-[5px] font-[600]
            cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 hidden max-[850px]:flex
            flex-row items-center justify-center"
          >
            Réserver une visite <i className="fa-solid fa-location-arrow ml-1"></i>
          </a>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#222344] text-[2em] font-bold">
            {currentBien?.prix ? currentBien.prix.toLocaleString("fr-FR") : "0"} DA
          </p>

          <div className="flex flex-row items-center gap-3 print:hidden relative">
            {/* PARTAGER */}
            <button
              onClick={handleShare}
              className="bg-white px-2.5 py-1.5 text-[14px] font-medium border-2 border-black rounded-[5px]
              flex items-center gap-1.5 cursor-pointer transition-all duration-200
              hover:bg-black hover:text-white active:scale-95"
            >
              {copied ? <Check size={15} /> : <Share2 size={15} />}
              {copied ? "Lien copié" : "Partager"}
            </button>

            {/* FAVORIS */}
            <button
              onClick={handleToggleFavori}
              disabled={loadingToggleFavorites}
              title={!user ? "Connecte-toi pour ajouter aux favoris" : undefined}
              className={`px-2.5 py-1.5 text-[14px] font-medium border-2 rounded-[5px]
              flex items-center gap-1.5 cursor-pointer transition-all duration-200
              disabled:opacity-60 disabled:cursor-not-allowed active:scale-95
              ${isFavori
                ? "bg-[#222344] border-[#222344] text-white"
                : "bg-white border-black hover:bg-black hover:text-white"}`}
            >
              <Heart size={15} className={isFavori ? "fill-red-500 text-red-500" : ""} />
              {isFavori ? "Favori" : "Favoris"}
            </button>

            {/* IMPRIMER */}
            <button
    onClick={handlePrint}
    disabled={generatingPdf}
    className="bg-white px-2.5 py-1.5 text-[14px] font-medium border-2 border-black rounded-[5px]
    flex items-center gap-1.5 cursor-pointer transition-all duration-200
    hover:bg-black hover:text-white active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
>
    {generatingPdf ? (
        <Loader2 size={15} className="animate-spin" />
    ) : (
        <Printer size={15} />
    )}
    {generatingPdf ? "Génération..." : "PDF"}
</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FirstSection);
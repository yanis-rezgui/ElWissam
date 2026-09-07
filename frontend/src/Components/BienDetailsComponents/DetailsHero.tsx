import { memo, useState } from "react";
import { useBiensContext } from "../../Contexts/BiensContext";
import Galerie from "./Galerie";
import { ChevronLeft, ChevronRight, Expand, MapPin } from "lucide-react";

const DetailsHero = () => {
    const { currentBien } = useBiensContext();
    const [openGalerie, setOpenGalerie] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!currentBien) return null;

    const images = currentBien.images;

    const slideLeft = () =>
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    const slideRight = () =>
        setCurrentIndex((prev) => (prev + 1) % images.length);

    return (
        <>
            <div className="w-full bg-[#222344] flex flex-col items-center px-4 pt-10 pb-12">

                {/* EN-TÊTE */}
                <div className="flex flex-col items-center text-center gap-2 max-w-[600px]">
                    <span className="text-[12px] font-semibold tracking-wide uppercase text-[#cdad7d]">
                        {currentBien.service === "LOCATION" ? "À louer" : "À vendre"}
                    </span>
                    <p className="text-gray-50 text-[1.8em] font-bold leading-tight">
                        {currentBien.nom}
                    </p>
                    <div className="flex items-center gap-1.5 text-gray-300 text-[14px]">
                        <MapPin size={15} className="text-[#cdad7d]" />
                        {currentBien.localisation}
                    </div>
                </div>

                {/* CAROUSEL */}
                <div className="relative flex items-center justify-center mt-8 w-full max-w-[720px]">
                    {images.length > 1 && (
                        <button
                            onClick={slideLeft}
                            aria-label="Image précédente"
                            className="absolute left-2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
                            flex items-center justify-center text-white transition-all duration-200
                            hover:bg-white/20 active:scale-90"
                        >
                            <ChevronLeft size={22} />
                        </button>
                    )}

                    <div className="w-full aspect-[4/3] max-h-[440px] rounded-2xl overflow-hidden bg-black/20
                    flex items-center justify-center border border-white/10 shadow-2xl">
                        <img
                            src={images[currentIndex]?.url}
                            alt={currentBien.nom}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {images.length > 1 && (
                        <button
                            onClick={slideRight}
                            aria-label="Image suivante"
                            className="absolute right-2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
                            flex items-center justify-center text-white transition-all duration-200
                            hover:bg-white/20 active:scale-90"
                        >
                            <ChevronRight size={22} />
                        </button>
                    )}

                    {images.length > 0 && (
                        <span className="absolute bottom-3 right-3 text-[12px] font-semibold text-white
                        bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                            {currentIndex + 1}/{images.length}
                        </span>
                    )}
                </div>

                {/* THUMBNAILS */}
                {images.length > 1 && (
                    <div className="flex flex-wrap justify-center items-center gap-2.5 mt-5 max-w-[700px]">
                        {images.map((im, i) => (
                            <button
                                key={im.id}
                                onClick={() => setCurrentIndex(i)}
                                aria-label={`Image ${i + 1}`}
                                className={`w-[56px] h-[56px] rounded-lg overflow-hidden shrink-0
                                transition-all duration-200
                                ${currentIndex === i
                                    ? "ring-2 ring-[#cdad7d] opacity-100"
                                    : "opacity-60 hover:opacity-90"}`}
                            >
                                <img src={im.url} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}

                {/* CTA GALERIE */}
                {images.length > 0 && (
                    <button
                        onClick={() => setOpenGalerie(true)}
                        className="flex items-center gap-2 text-[#222344] bg-gray-50 font-semibold text-[14px]
                        py-2.5 px-5 rounded-full mt-7 transition-all duration-200
                        hover:bg-[#cdad7d] active:scale-95"
                    >
                        <Expand size={15} />
                        Voir toutes les photos
                    </button>
                )}
            </div>

            {openGalerie && (
                <Galerie
                    setShowPop={setOpenGalerie}
                    images={images}
                    initialIndex={currentIndex}
                />
            )}
        </>
    );
};

export default memo(DetailsHero);
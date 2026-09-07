import { memo } from "react";
import { useBiensContext } from "../../Contexts/BiensContext";
import BienCard from "./BienCard";
import BiensPagination from "./BiensPagination";
import { SearchX } from "lucide-react";

const BienCardSkeleton = () => (
    <div className="w-[270px] max-[500px]:w-full h-[330px] rounded-2xl bg-gray-200 animate-pulse" />
);

const AllBiens = () => {
    const { biens, loadingBiens } = useBiensContext();

    return (
        <div className="flex-1 flex flex-col items-center w-full max-w-[900px]">
            {loadingBiens ? (
                <div className="flex flex-wrap gap-4 justify-center w-full">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <BienCardSkeleton key={i} />
                    ))}
                </div>
            ) : biens.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                    <SearchX size={40} className="text-gray-400" />
                    <p className="text-[#222344] font-semibold">Aucun bien ne correspond à ta recherche</p>
                    <p className="text-gray-500 text-sm">Essaie d'élargir tes filtres ou ton budget.</p>
                </div>
            ) : (
                <div className="flex flex-wrap gap-4 justify-center w-full">
                    {biens.map((b) => (
                        <BienCard bien={b} key={b.id} />
                    ))}
                </div>
            )}

            <BiensPagination />
        </div>
    );
};

export default memo(AllBiens);
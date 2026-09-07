import { memo } from "react";
import BiensSearch from "../Components/BiensComponents/BiensSearch";
import BiensFilters from "../Components/BiensComponents/BiensFilters";
import AllBiens from "../Components/BiensComponents/AllBiens";

const Biens = () => {
    return (
        <section className="flex flex-col items-center bg-gray-100 w-full min-h-screen pb-16">

            <div className="flex flex-col items-center w-full bg-white border-b border-gray-200 pb-8 pt-10 px-4">
                <h1 className="text-[2.1em] font-bold text-[#222344] text-center">
                    Nos biens
                </h1>
                <p className="text-gray-500 mt-2 text-[15.5px] text-center max-w-[500px]">
                    Découvrez notre sélection de biens immobiliers à vendre et à louer.
                </p>

                <BiensSearch />
            </div>

            <div className="flex flex-row items-start justify-center mt-8 gap-6 w-full px-5
            max-[900px]:flex-col max-[900px]:items-center">
                <BiensFilters />
                <AllBiens />
            </div>
        </section>
    );
};

export default memo(Biens);
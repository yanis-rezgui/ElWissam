import { memo } from "react";
import { useAdminVisitesContext } from "../../AdminContexts/AdminVisitesContext";


const AdminVisitesSearch = () => {
    const { search, setSearch } = useAdminVisitesContext();

    return (
        <div className="bg-gray-300 w-full flex justify-center items-center p-2 fixed top-[60px] z-40">
            <div className="relative max-[750px]:w-full">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Recherche par nom, email ou téléphone..."
                    className="w-[700px] text-[14px] border border-gray-300 px-3
                    h-[40px] rounded-[10px] resize-none
                    focus:outline-none focus:ring-2 focus:ring-[#222344] bg-gray-50 text-[#222344]
                    max-[750px]:w-full"
                />
                <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#222344] text-[20px] pr-2 cursor-pointer py-1"
                >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
        </div>
    );
};

export default memo(AdminVisitesSearch);
import { memo, useState } from "react";
import type { Commune } from "../Types/Types";
import { useAdminCommuneContext } from "../AdminContexts/AdminCommuneContext";
import CommunesFilter from "../AdminComponents/AdminCommunesComponents/CommunesFilter";
import CommunesStats from "../AdminComponents/AdminCommunesComponents/CommunesStats";
import AdminCommunesTable from "../AdminComponents/AdminCommunesComponents/AdminCommunesTable";
import AddCommunePop from "../AdminComponents/AdminCommunesComponents/AddCommunePop";
import UpdateCommunePop from "../AdminComponents/AdminCommunesComponents/UpdateCommunePop";
import DeleteCommunePop from "../AdminComponents/AdminCommunesComponents/DeleteCommunePop";

const AdminCommunes = () => {

    const { showCreatePop, setShowCreatePop, showUpdatePop, showDeletePop } = useAdminCommuneContext();

    const [selectedCommune, setSelectedCommune] = useState<Commune | null>(null);

    return (
        <>
            <section className="flex flex-col min-h-screen w-full items-center bg-gray-100">

                <p className="mt-[30px] text-[#222344] font-bold text-center text-[1.8em]">
                    Gestion des communes
                </p>

                <p className="text-[16px] text-[#222344] text-center mt-2 w-[400px] leading-5.5
                max-[450px]:text-[15px] max-[450px]:w-[300px]">
                    Gérez les communes dans lesquelles votre agence traite des biens immobiliers.
                    Ajoutez, modifiez et activez facilement les communes affichées sur le site.
                </p>

                <button
                    className="bg-[#222344] text-white text-[14px] p-2 rounded-[5px] cursor-pointer
                    transition-opacity duration-200 hover:opacity-80 active:opacity-60 mt-3 font-[600]"
                    onClick={() => setShowCreatePop(true)}
                >
                    + Ajouter une commune
                </button>

                <CommunesStats />
                <CommunesFilter />
                <AdminCommunesTable
                    onSelectCommune={(commune) => setSelectedCommune(commune)}
                />
            </section>

            {showCreatePop && <AddCommunePop />}
            {showUpdatePop && selectedCommune && <UpdateCommunePop commune={selectedCommune} />}
            {showDeletePop && selectedCommune && <DeleteCommunePop commune={selectedCommune} />}
        </>
    );
};

export default memo(AdminCommunes);
import AdminVisitesSearch from "../AdminComponents/AdminVisitesComponents/AdminVisitesSearch";
import AdminVisitesTable from "../AdminComponents/AdminVisitesComponents/AdminVisitesTable";
import AdminVisitesFilter from "../AdminComponents/AdminVisitesComponents/AdminVisitesFilter";
import VisitesStats from "../AdminComponents/AdminVisitesComponents/VisitesStats";
import DeleteVisitePop from "../AdminComponents/AdminVisitesComponents/DeleteVisitePop";
import { useAdminVisitesContext } from "../AdminContexts/AdminVisitesContext";

const AdminVisites = () => {
    const { showDeletePop } = useAdminVisitesContext();

    return (
        <>
            <section className="flex flex-col min-h-screen w-full items-center bg-gray-100">
                <AdminVisitesSearch />

                <p className="mt-[90px] text-[#222344] font-bold text-center text-[1.8em]">
                    Gestion des visites
                </p>

                <p className="text-[16px] text-[#222344] text-center mt-2 w-[400px] leading-5.5
                max-[450px]:text-[15px] max-[450px]:w-[300px]">
                    Gérez l'ensemble des demandes de visite de votre agence.
                    Suivez, confirmez et mettez à jour facilement leur statut.
                </p>

                <VisitesStats />
                <AdminVisitesFilter />
                <AdminVisitesTable />
            </section>

            {showDeletePop && <DeleteVisitePop />}
        </>
    );
};

export default AdminVisites;
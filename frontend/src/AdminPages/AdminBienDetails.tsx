import { useParams, useNavigate } from "react-router-dom";
import { useBiensContext } from "../Contexts/BiensContext";

import { memo, useEffect, useState } from "react";
import type { Bien } from "../Types/Types";
import BienDetailsHeader from "../AdminComponents/AdminBienDetailsComponents/BienDetailsHeader";
import FirstDetailsSection from "../AdminComponents/AdminBienDetailsComponents/FirstDetailsSection";
import InformationGenerales from "../AdminComponents/AdminBienDetailsComponents/InformationGenerales";
import DetailsSupplementaires from "../AdminComponents/AdminBienDetailsComponents/DetailsSupplementaires";
import GestionImages from "../AdminComponents/AdminBienDetailsComponents/GestionImages";
import ModificationActions from "../AdminComponents/AdminBienDetailsComponents/ModificationActions";
import { useBiensAdminContext } from "../AdminContexts/BiensAdminContext";
import Toast from "../AdminComponents/AdminBienDetailsComponents/Toast";
import DeleteBienPop from "../AdminComponents/AdminBiensComponents/DeleteBienPop";


const AdminBienDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getBien, currentBien, loadingBien } = useBiensContext();
    const { updateBien, loadingUpdateBien, errorMsg , showDeletePop} = useBiensAdminContext();

    useEffect(() => {
        getBien(id);
    }, [id]);

    const [modifBien, setModifBien] = useState<Bien | null>(null);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        if (currentBien) {
            const saved = localStorage.getItem(`modifBien-${currentBien.id}`);
            setModifBien(saved ? JSON.parse(saved) : currentBien);
        }
    }, [currentBien]);

    useEffect(() => {
        if (modifBien) {
            localStorage.setItem(`modifBien-${modifBien.id}`, JSON.stringify(modifBien));
        }
    }, [modifBien]);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !modifBien?.nom ||
            !modifBien?.description ||
            !modifBien?.localisation ||
            !modifBien?.type ||
            !modifBien?.service ||
            modifBien?.prix === undefined ||
            modifBien?.superficie === undefined
        ) {
            setToast({ message: "Veuillez remplir tous les champs obligatoires.", type: "error" });
            return;
        }

        const formData = new FormData();
        formData.append("nom", modifBien.nom);
        formData.append("description", modifBien.description);
        formData.append("prix", String(modifBien.prix));
        formData.append("negociable", String(modifBien.negociable ?? false));
        formData.append("statut", modifBien.statut);
        formData.append("localisation", modifBien.localisation);
        formData.append("superficie", String(modifBien.superficie));
        formData.append("type", modifBien.type);
        formData.append("service", modifBien.service);
        formData.append("features", JSON.stringify(modifBien.features || []));
        formData.append("localisationMap", modifBien.localisationMap || "");
        formData.append("oldImages", JSON.stringify(modifBien.images || []));

        newImages.forEach((file) => formData.append("images", file));

        const success  = await updateBien(modifBien.id, formData);

        if (success) {
            setToast({ message: "Bien mis à jour avec succès !", type: "success" });
            localStorage.removeItem(`modifBien-${modifBien.id}`);
            setNewImages([]);
            await getBien(id);
        } else {
            setToast({ message: errorMsg || "Une erreur est survenue.", type: "error" });
        }
    };

    return (
        <>
        <section className="flex flex-col min-h-screen w-full items-center bg-gray-100">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {loadingBien ? (
                <p className="text-[17px] text-gray-900 font-bold mt-40 text-center">Chargement ...</p>
            ) : !currentBien ? (
                <p className="text-[17px] text-gray-900 font-bold mt-40 text-center">Bien non disponible</p>
            ) : (
                <>
                    <p className="text-[1.8em] mt-20 font-bold text-center underline px-3 leading-8">
                        {currentBien?.nom}
                    </p>

                    <div className="flex flex-col w-[1000px] mt-10 max-[1050px]:w-full px-5 pb-20">
                        <BienDetailsHeader />
                        <FirstDetailsSection />

                        <p className="mt-15 font-bold text-[1.8em] text-[#222344] underline">
                            Modifier Le Bien:
                        </p>

                        <form onSubmit={submitForm} className="flex flex-col w-full items-center gap-5 mt-5">
                            <InformationGenerales modifBien={modifBien} setModifBien={setModifBien} />
                            <DetailsSupplementaires modifBien={modifBien} setModifBien={setModifBien} />
                            <GestionImages
                                oldImages={modifBien?.images || []}
                                setOldImages={(images) => setModifBien({ ...modifBien!, images })}
                                newImages={newImages}
                                setNewImages={setNewImages}
                            />
                            <ModificationActions loading={loadingUpdateBien} onCancel={() => navigate(-1)} />
                        </form>
                    </div>
                </>
            )}
        </section>

        {showDeletePop && <DeleteBienPop/>}
        </>
    );
};

export default memo(AdminBienDetails);
import { useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import type { Bien } from "../Types/Types";
import InformationGenerales from "../AdminComponents/AdminBienDetailsComponents/InformationGenerales";
import DetailsSupplementaires from "../AdminComponents/AdminBienDetailsComponents/DetailsSupplementaires";
import GestionImages from "../AdminComponents/AdminBienDetailsComponents/GestionImages";
import { useBiensAdminContext } from "../AdminContexts/BiensAdminContext";
import Toast from "../AdminComponents/AdminBienDetailsComponents/Toast";


const emptyBien: Bien = {
    id: "",
    nom: "",
    description: "",
    prix: 0,
    negociable: false,
    statut: "DISPONIBLE",
    localisation: "",
    superficie: 0,
    type: "",
    service: "",
    features: [],
    localisationMap: "",
    images: [],
    updatedAt: new Date().toISOString()
};

const STORAGE_KEY = "nouveauBien-draft";

const AdminBienAjout = () => {
    const navigate = useNavigate();
    const { addBien, loadingAddBien, errorMsg } = useBiensAdminContext();

    const [newBien, setNewBien] = useState<Bien>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : emptyBien;
    });
    const [newImages, setNewImages] = useState<File[]>([]);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newBien));
    }, [newBien]);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !newBien.nom ||
            !newBien.description ||
            !newBien.localisation ||
            !newBien.type ||
            !newBien.service ||
            newBien.prix === undefined ||
            newBien.superficie === undefined
        ) {
            setToast({ message: "Veuillez remplir tous les champs obligatoires.", type: "error" });
            return;
        }

        const formData = new FormData();
        formData.append("nom", newBien.nom);
        formData.append("description", newBien.description);
        formData.append("prix", String(newBien.prix));
        formData.append("negociable", String(newBien.negociable ?? false));
        formData.append("localisation", newBien.localisation);
        formData.append("superficie", String(newBien.superficie));
        formData.append("type", newBien.type);
        formData.append("service", newBien.service);
        formData.append("features", JSON.stringify(newBien.features || []));
        formData.append("localisationMap", newBien.localisationMap || "");

        newImages.forEach((file) => formData.append("images", file));

        const success = await addBien(formData);

        if (success) {
            setToast({ message: "Bien ajouté avec succès !", type: "success" });
            localStorage.removeItem(STORAGE_KEY);
            setNewBien(emptyBien);
            setNewImages([]);
            setTimeout(() => navigate("/admin/biens"), 1200);
        } else {
            setToast({ message: errorMsg || "Une erreur est survenue.", type: "error" });
        }
    };

    return (
        <section className="flex flex-col min-h-screen w-full items-center bg-gray-100">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <p className="text-[1.8em] mt-20 font-bold text-center underline px-3 leading-8">
                Ajouter Un Nouveau Bien
            </p>

            <div className="flex flex-col w-[1000px] mt-10 max-[1050px]:w-full px-5 pb-20">
                <div
                    onClick={() => navigate(-1)}
                    className="text-[#222344] underline cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 mb-5"
                >
                    ← Retour aux biens
                </div>

                <form onSubmit={submitForm} className="flex flex-col w-full items-center gap-5">
                    <InformationGenerales modifBien={newBien} setModifBien={(b) => setNewBien(b as Bien)} />
                    <DetailsSupplementaires
                        modifBien={newBien}
                        setModifBien={(b) => setNewBien(b as Bien)}
                        hideStatut
                    />
                    <GestionImages
                        oldImages={[]}
                        setOldImages={() => {}}
                        newImages={newImages}
                        setNewImages={setNewImages}
                    />

                    <div className="flex flex-row gap-3 items-center justify-end w-full mt-3 max-[600px]:flex-col max-[600px]:items-stretch">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="bg-gray-200 text-[#222344] text-[14px] cursor-pointer
                            transition-opacity duration-200 hover:opacity-80 active:opacity-60
                            p-2 px-4 rounded-[5px] font-[600]"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loadingAddBien}
                            className="bg-[#222344] text-white text-[14px] cursor-pointer
                            transition-opacity duration-200 hover:opacity-80 active:opacity-60
                            disabled:opacity-50 disabled:cursor-not-allowed
                            p-2 px-4 rounded-[5px] font-[600]"
                        >
                            {loadingAddBien ? (
                                <><i className="fa-solid fa-spinner fa-spin"></i> Ajout en cours...</>
                            ) : (
                                <><i className="fa-solid fa-plus"></i> Ajouter le bien</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default memo(AdminBienAjout);
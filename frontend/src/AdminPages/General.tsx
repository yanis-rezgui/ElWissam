import { memo, useEffect, useState } from "react";
import type { Agency } from "../Types/Types";
import { useAgencyAdminContext } from "../AdminContexts/AgencyAdminContext";

const inputClass =
    "border border-gray-300 rounded-[5px] p-2 outline-none w-full text-[14px] bg-white " +
    "focus:border-[#222344] transition-colors duration-200";

const labelClass = "text-[13px] font-[500] text-gray-600 mb-1";

const cardClass =
    "bg-white rounded-[8px] p-5 w-full flex flex-col gap-4 shadow-sm border border-gray-100";

const sectionTitleClass = "text-[16px] font-[700] text-[#222344] mb-1";

const General = () => {
    const { agency, loadingAgencyInfo, updateAgency, loadingUpdateAgency, errorMsg } = useAgencyAdminContext();

    const [form, setForm] = useState<Agency | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        if (agency) {
            setForm(agency);
        }
    }, [agency]);

    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(timer);
    }, [toast]);

    if (loadingAgencyInfo || !form) {
        return (
            <section className="flex flex-col min-h-screen w-full items-center bg-gray-100">
                <p className="mt-[90px] text-[#222344] font-bold text-center">
                    Chargement des paramètres...
                </p>
            </section>
        );
    }

    const handleNameChange = (value: string) => {
        setForm({ ...form, name: value });
    };

    const handleEmailChange = (value: string) => {
        setForm({ ...form, email: value });
    };

    const handleAddressChange = (value: string) => {
        setForm({ ...form, address: value });
    };

    const handleMapsUrlChange = (value: string) => {
        setForm({ ...form, mapsUrl: value });
    };

    const handlePhoneChange = (index: number, value: string) => {
        const updated = [...form.phone];
        updated[index] = value;
        setForm({ ...form, phone: updated });
    };

    const handleAddPhone = () => {
        setForm({ ...form, phone: [...form.phone, ""] });
    };

    const handleRemovePhone = (index: number) => {
        setForm({ ...form, phone: form.phone.filter((_, i) => i !== index) });
    };

    const handleSocialChange = (index: number, field: "name" | "url", value: string) => {
        const updated = [...(form.socialLinks || [])];
        updated[index] = { ...updated[index], [field]: value };
        setForm({ ...form, socialLinks: updated });
    };

    const handleAddSocial = () => {
        setForm({ ...form, socialLinks: [...(form.socialLinks || []), { name: "", url: "" }] });
    };

    const handleRemoveSocial = (index: number) => {
        setForm({
            ...form,
            socialLinks: (form.socialLinks || []).filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async () => {
        if (
            !form.name.trim() ||
            form.phone.length === 0 ||
            form.phone.some((p) => p.trim().length < 10) ||
            !form.email?.trim() ||
            !form.address.trim()
        ) {
            setToast({ message: "Veuillez remplir tous les champs obligatoires.", type: "error" });
            return;
        }

        const success = await updateAgency(form);

        if (success) {
            setToast({ message: "Informations mises à jour avec succès !", type: "success" });
        } else {
            setToast({ message: errorMsg || "Une erreur est survenue.", type: "error" });
        }
    };

    return (
        <section className="flex flex-col min-h-screen w-full items-center bg-gray-100">
            {toast && (
                <div
                    className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-[5px] text-white text-[14px]
                    font-[600] shadow-md ${toast.type === "success" ? "bg-green-600" : "bg-red-500"}`}
                >
                    {toast.message}
                </div>
            )}

            <p className="mt-[90px] text-[#222344] font-bold text-center text-[1.8em]">
                Paramètres généraux
            </p>

            <p className="text-[16px] text-[#222344] text-center mt-2 w-[400px] leading-5.5
            max-[450px]:text-[15px] max-[450px]:w-[300px]">
                Gérez les informations publiques de votre agence : coordonnées,
                adresse, lien Google Maps et réseaux sociaux.
            </p>

            <div className="flex flex-col gap-6 w-[600px] max-[650px]:w-full max-[650px]:px-5 mt-10 mb-10">
                {/* Agence */}
                <div className={cardClass}>
                    <p className={sectionTitleClass}>Agence</p>
                    <div className="flex flex-col">
                        <label className={labelClass}>Nom de l'agence</label>
                        <input
                            type="text"
                            className={inputClass}
                            value={form.name}
                            maxLength={100}
                            onChange={(e) => handleNameChange(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className={labelClass}>Adresse</label>
                        <input
                            type="text"
                            className={inputClass}
                            value={form.address}
                            onChange={(e) => handleAddressChange(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className={labelClass}>Lien Google Maps</label>
                        <input
                            type="text"
                            className={inputClass}
                            value={form.mapsUrl || ""}
                            onChange={(e) => handleMapsUrlChange(e.target.value)}
                        />
                    </div>
                </div>

                {/* Contact */}
                <div className={cardClass}>
                    <p className={sectionTitleClass}>Contact</p>

                    <div className="flex flex-col">
                        <label className={labelClass}>Email</label>
                        <input
                            type="email"
                            className={inputClass}
                            value={form.email || ""}
                            onChange={(e) => handleEmailChange(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Numéros de téléphone</label>
                        {form.phone.map((number, index) => (
                            <div key={index} className="flex gap-3 items-center">
                                <input
                                    type="text"
                                    className={inputClass}
                                    value={number}
                                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                                />
                                {form.phone.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemovePhone(index)}
                                        className="text-[13px] text-red-500 p-2 rounded-[5px] cursor-pointer
                                        transition-opacity duration-200 hover:opacity-70 active:opacity-50 shrink-0"
                                    >
                                        Supprimer
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddPhone}
                            className="text-[14px] p-2 border border-[#222344] text-[#222344] rounded-[5px]
                            font-[600] cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50 self-start"
                        >
                            + Ajouter un numéro
                        </button>
                    </div>
                </div>

                {/* Réseaux sociaux */}
                <div className={cardClass}>
                    <p className={sectionTitleClass}>Réseaux sociaux</p>

                    {(form.socialLinks || []).map((social, index) => (
                        <div
                            key={index}
                            className="flex gap-3 items-end max-[500px]:flex-col max-[500px]:items-stretch
                            border-b border-gray-100 pb-4 last:border-none last:pb-0"
                        >
                            <div className="flex flex-col flex-1">
                                <label className={labelClass}>Nom</label>
                                <input
                                    type="text"
                                    className={inputClass}
                                    value={social.name}
                                    onChange={(e) => handleSocialChange(index, "name", e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col flex-[2]">
                                <label className={labelClass}>URL</label>
                                <input
                                    type="text"
                                    className={inputClass}
                                    value={social.url}
                                    onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveSocial(index)}
                                className="text-[13px] text-red-500 p-2 rounded-[5px] cursor-pointer
                                transition-opacity duration-200 hover:opacity-70 active:opacity-50 shrink-0"
                            >
                                Supprimer
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddSocial}
                        className="text-[14px] p-2 border border-[#222344] text-[#222344] rounded-[5px]
                        font-[600] cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50 self-start"
                    >
                        + Ajouter un réseau social
                    </button>
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loadingUpdateAgency}
                    className="bg-[#222344] text-white text-[14px] p-2 rounded-[5px] cursor-pointer
                    transition-opacity duration-200 hover:opacity-80 active:opacity-60
                    disabled:opacity-50 disabled:cursor-not-allowed font-[600]"
                >
                    {loadingUpdateAgency ? (
                        <><i className="fa-solid fa-spinner fa-spin"></i> Enregistrement...</>
                    ) : (
                        <><i className="fa-solid fa-check"></i> Enregistrer les modifications</>
                    )}
                </button>
            </div>
        </section>
    );
};

export default memo(General);
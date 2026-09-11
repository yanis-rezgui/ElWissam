import { memo, useRef, useState } from "react";
import { useAdminCommuneContext } from "../../AdminContexts/AdminCommuneContext";

const AddCommunePop = () => {

    const { setShowCreatePop, createCommune, loadingCreateCommune } = useAdminCommuneContext();

    const [name, setName] = useState<string>("");
    const [active, setActive] = useState<string>("true");
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string>("");
    const [isDragging, setIsDragging] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/avif"];

    const handleFile = (file: File | undefined | null) => {
        if (!file) return;
        if (!allowedTypes.includes(file.type)) return;
        setImage(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files?.[0]);
    };

    const handleCreate = async () => {

        setError("");

        if (!name || name.trim() === "") {
            setError("Le nom de la commune est requis");
            return;
        }

        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("active", active);

        if (image) {
            formData.append("image", image);
        }

        await createCommune(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-[800px] bg-white flex flex-col rounded-[10px] overflow-y-auto max-h-[90vh]"
            >
                <div className="px-4 py-2 flex flex-row w-full justify-between items-center
               border-b border-b-gray-300
               ">
                    <p className="text-[1.5em] font-bold text-[#0F172A]">Nouvelle Commune</p>

                    <span
                        onClick={() => setShowCreatePop(false)}
                        className="text-[2em] cursor-pointer text-[#0F172A]
                 transition-opacity duration-200 hover:opacity-80 active:opacity-60
                 ">&times;</span>
                </div>

                <div className="p-4 flex flex-col gap-3">

                    <div className="flex flex-col gap-1">
                        <label className="text-[15px] font-[600] text-[#0F172A]">Nom de la commune*</label>
                        <input
                            type="text"
                            value={name}
                            placeholder="Ex: Hydra"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px]
                    bg-gray-100
                    "
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[15px] font-[600] text-[#0F172A]">Activer*</label>
                        <select
                            value={active}
                            onChange={(e) => setActive(e.target.value)}
                            className="w-full border border-gray-300 rounded-[5px] p-2 text-[15px]
                    bg-gray-100
                    "
                            required
                        >
                            <option value="true">Oui</option>
                            <option value="false">Non</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[15px] font-[600] text-[#0F172A]">Image</label>

                        {!image && (
                            <div
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                onClick={() => inputRef.current?.click()}
                                className={`flex flex-col items-center justify-center gap-2 w-full h-[150px]
                                border-2 border-dashed rounded-[10px] cursor-pointer transition-colors duration-200
                                ${isDragging ? "border-[#222344] bg-gray-100" : "border-gray-300 bg-gray-50"}`}
                            >
                                <i className="fa-solid fa-cloud-arrow-up text-[2em] text-[#222344]"></i>
                                <p className="text-[14px] text-gray-500 text-center px-3">
                                    Glissez-déposez une image ici, ou cliquez pour sélectionner
                                </p>
                                <input
                                    ref={inputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/jpg,image/avif"
                                    className="hidden"
                                    onChange={(e) => handleFile(e.target.files?.[0])}
                                />
                            </div>
                        )}

                        {image && (
                            <div className="relative w-[120px] h-[120px]">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="preview"
                                    className="w-full h-full object-cover rounded-[5px] border-2 border-[#cdad7d]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setImage(null)}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white w-[22px] h-[22px] 
                                    rounded-full flex items-center justify-center text-[12px] cursor-pointer hover:opacity-80"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="h-[30px] flex justify-center items-center text-[15px] text-center
                    text-red-600
                    ">
                        {error && <span>{error}</span>}
                    </div>

                    <button
                        className="bg-[#0F172A] text-white font-bold text-[15px]
                w-full cursor-pointer transition-opacity duration-200 hover:opacity-80
                active:opacity-60 py-2 rounded-[5px] mt-5
                "
                        disabled={loadingCreateCommune}
                        onClick={handleCreate}
                    >
                        {loadingCreateCommune ? "Création..." : "Créer"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default memo(AddCommunePop);
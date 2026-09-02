import { memo, useRef, useState } from "react";

interface GestionImagesProps {
    oldImages: string[];
    setOldImages: (images: string[]) => void;
    newImages: File[];
    setNewImages: (files: File[]) => void;
}

const GestionImages = ({ oldImages, setOldImages, newImages, setNewImages }: GestionImagesProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/avif"];

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        const validFiles = Array.from(files).filter((f) => allowedTypes.includes(f.type));
        setNewImages([...newImages, ...validFiles]);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const removeOldImage = (index: number) => setOldImages(oldImages.filter((_, i) => i !== index));
    const removeNewImage = (index: number) => setNewImages(newImages.filter((_, i) => i !== index));

    return (
        <div className="flex flex-col gap-3 w-full bg-white p-3 rounded-[10px] shadow-2xl">
            <p className="text-[1.4em] font-bold underline">Images du bien:</p>

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
                    Glissez-déposez vos images ici, ou cliquez pour sélectionner
                </p>
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/jpg,image/avif"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
                {oldImages.map((img, i) => (
                    <div key={`old-${i}`} className="relative w-[100px] h-[100px]">
                        <img src={img} alt="" className="w-full h-full object-cover rounded-[5px] border border-gray-300" />
                        <button
                            type="button"
                            onClick={() => removeOldImage(i)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white w-[22px] h-[22px] 
                            rounded-full flex items-center justify-center text-[12px] cursor-pointer hover:opacity-80"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                ))}

                {newImages.map((file, i) => (
                    <div key={`new-${i}`} className="relative w-[100px] h-[100px]">
                        <img
                            src={URL.createObjectURL(file)}
                            alt=""
                            className="w-full h-full object-cover rounded-[5px] border-2 border-[#cdad7d]"
                        />
                        <button
                            type="button"
                            onClick={() => removeNewImage(i)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white w-[22px] h-[22px] 
                            rounded-full flex items-center justify-center text-[12px] cursor-pointer hover:opacity-80"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <span className="absolute bottom-0 left-0 bg-[#222344] text-white text-[9px] px-1 rounded-tr-[5px] rounded-bl-[5px]">
                            nouvelle
                        </span>
                    </div>
                ))}
            </div>

            {oldImages.length === 0 && newImages.length === 0 && (
                <p className="text-[13px] text-gray-400 italic">Aucune image pour ce bien</p>
            )}
        </div>
    );
};

export default memo(GestionImages);
import { memo } from "react";

const ModificationActions = ({ loading, onCancel }: { loading: boolean; onCancel: () => void }) => {
    return (
        <div className="flex flex-row gap-3 items-center justify-end w-full mt-3 max-[600px]:flex-col max-[600px]:items-stretch">
            <button
                type="button"
                onClick={onCancel}
                className="bg-gray-200 text-[#222344] text-[14px] cursor-pointer
                transition-opacity duration-200 hover:opacity-80 active:opacity-60
                p-2 px-4 rounded-[5px] font-[600]"
            >
                Annuler
            </button>
            <button
                type="submit"
                disabled={loading}
                className="bg-[#222344] text-white text-[14px] cursor-pointer
                transition-opacity duration-200 hover:opacity-80 active:opacity-60
                disabled:opacity-50 disabled:cursor-not-allowed
                p-2 px-4 rounded-[5px] font-[600]"
            >
                {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Enregistrement...</> : <><i className="fa-solid fa-check"></i> Enregistrer les modifications</>}
            </button>
        </div>
    );
};

export default memo(ModificationActions);
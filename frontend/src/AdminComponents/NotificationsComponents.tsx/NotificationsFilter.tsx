// ─── NotificationsFilter.tsx ──────────────────────────────────────────────────
import { memo } from "react";
import { useNotificationsContext } from "../../AdminContexts/NotificationsContext";

const FILTERS: { value: boolean | undefined; label: string }[] = [
    { value: undefined, label: "Toutes" },
    { value: false, label: "Non lues" },
    { value: true, label: "Lues" },
];

const NotificationsFilter = () => {
    const { read, setRead, notificationsStats } = useNotificationsContext();

    return (
        <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => {
                const isActive = read === f.value;

                return (
                    <button
                        key={String(f.value)}
                        onClick={() => setRead(f.value)}
                        className={`flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full border cursor-pointer
                        transition-all duration-200
                            ${isActive
                                ? "bg-[#222344] text-white border-transparent"
                                : "bg-transparent text-gray-500 border-gray-200 hover:bg-gray-100"
                            }`}
                    >
                        {f.label}
                        {f.value === false && notificationsStats.unread > 0 && (
                            <span
                                className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full leading-none
                                ${isActive ? "bg-white/20 text-white" : "bg-red-100 text-red-700"}`}
                            >
                                {notificationsStats.unread}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default memo(NotificationsFilter);
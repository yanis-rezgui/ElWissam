// ─── NotificationItem.tsx ─────────────────────────────────────────────────────
import { memo, useState } from "react";
import { useNotificationsContext } from "../../AdminContexts/NotificationsContext";
import type { Notification } from "../../Types/Types";

// ─── Config par type de notification ─────────────────────────────────────────
const TYPE_CONFIG = {
    INFO: {
        label: "Information",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-700",
        badgeBg: "bg-blue-50",
        badgeText: "text-blue-800",
        dot: "bg-blue-400",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
        ),
    },
    SUCCESS: {
        label: "Action réussie",
        iconBg: "bg-green-50",
        iconColor: "text-green-700",
        badgeBg: "bg-green-50",
        badgeText: "text-green-800",
        dot: "bg-green-500",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><path d="M8 12l3 3l5-5" />
            </svg>
        ),
    },
    WARNING: {
        label: "À surveiller",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-700",
        badgeBg: "bg-amber-50",
        badgeText: "text-amber-800",
        dot: "bg-amber-400",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        ),
    },
    ERROR: {
        label: "Erreur critique",
        iconBg: "bg-red-50",
        iconColor: "text-red-700",
        badgeBg: "bg-red-50",
        badgeText: "text-red-800",
        dot: "bg-red-500",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
            </svg>
        ),
    },
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffH = Math.floor(diffMs / 3600000);
    const diffD = Math.floor(diffMs / 86400000);

    if (diffMin < 1) return "À l'instant";
    if (diffMin < 60) return `Il y a ${diffMin} min`;
    if (diffH < 24) return `Il y a ${diffH}h`;
    if (diffD === 1) return `Hier, ${date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`;
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
    notification: Notification;
    isLast: boolean;
}

const NotificationItem = ({ notification, isLast }: Props) => {
    const { markAsRead, loadingMarkAsRead } = useNotificationsContext();

    const [marking, setMarking] = useState(false);

    const cfg = TYPE_CONFIG[notification.type as keyof typeof TYPE_CONFIG] ?? TYPE_CONFIG.INFO;

    const handleMarkAsRead = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setMarking(true);
        await markAsRead(notification.id);
        setMarking(false);
    };

    return (
        <div
            className={`flex items-start gap-3 p-4 transition-colors group
                ${!isLast ? "border-b border-gray-50" : ""}
                ${!notification.read ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-50"}
                ${notification.read ? "opacity-70" : ""}
            `}
        >
            {/* Icône type */}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.iconBg} ${cfg.iconColor}`}>
                {cfg.icon}
            </div>

            {/* Contenu */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 mb-0.5">
                    {notification.title}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-2">
                    {notification.message}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}>
                        {cfg.label}
                    </span>
                    <span className="text-xs text-gray-400">
                        {formatDate(notification.createdAt)}
                    </span>
                </div>
            </div>

            {/* Dot non-lu + bouton "marquer comme lu" (uniquement si non lue) */}
            {!notification.read && (
                <div className="flex flex-col items-center gap-2 flex-shrink-0 pt-0.5">
                    <div className={`w-2 h-2 rounded-full ${cfg.dot}`} aria-label="Non lu" />
                    <button
                        onClick={handleMarkAsRead}
                        disabled={loadingMarkAsRead || marking}
                        title="Marquer comme lu"
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md
                        hover:bg-gray-200 text-gray-400 hover:text-gray-600 cursor-pointer disabled:cursor-not-allowed"
                        aria-label="Marquer comme lu"
                    >
                        {marking ? (
                            <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M5 12l5 5l10-10" />
                            </svg>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default memo(NotificationItem);
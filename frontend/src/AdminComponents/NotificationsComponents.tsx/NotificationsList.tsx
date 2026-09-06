// ─── NotificationsList.tsx ────────────────────────────────────────────────────
import { memo } from "react";
import { useNotificationsContext } from "../../AdminContexts/NotificationsContext";
import NotificationItem from "./NotificationItem";

const NotificationsList = () => {
    const { notifications, loadingNotifications } = useNotificationsContext();

    if (loadingNotifications) {
        return (
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <SkeletonRow key={i} />
                ))}
            </div>
        );
    }

    if (notifications.length === 0) {
        return (
            <div className="bg-white border border-gray-100 rounded-xl p-12 flex flex-col items-center justify-center gap-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                </svg>
                <p className="text-sm">Aucune notification</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            {notifications.map((notif, i) => (
                <NotificationItem
                    key={notif.id}
                    notification={notif}
                    isLast={i === notifications.length - 1}
                />
            ))}
        </div>
    );
};

export default memo(NotificationsList);

// ─── SkeletonRow (local) ──────────────────────────────────────────────────────
function SkeletonRow() {
    return (
        <div className="flex items-start gap-3 p-4 border-b border-gray-50 last:border-b-0 animate-pulse">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="h-3.5 bg-gray-100 rounded w-1/3" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
                <div className="h-3 bg-gray-100 rounded w-1/4" />
            </div>
        </div>
    );
}
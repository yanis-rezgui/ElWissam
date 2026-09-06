// ─── Notifications.tsx ────────────────────────────────────────────────────────
import { memo, useEffect, useState } from "react";
import { useNotificationsContext } from "../AdminContexts/NotificationsContext";
import Toast from "../AdminComponents/AdminBienDetailsComponents/Toast";
import NotificationsFilter from "../AdminComponents/NotificationsComponents.tsx/NotificationsFilter";
import NotificationsList from "../AdminComponents/NotificationsComponents.tsx/NotificationsList";

const Notifications = () => {
    const {
        notificationsStats,
        loadingNotificationsStats,
        markAllAsRead,
        loadingMarkAllAsRead,
        pagination,
        currentPage,
        setCurrentPage,
        msg,
    } = useNotificationsContext();

    const [toast, setToast] = useState<{ message: string; type: "error" } | null>(null);

    useEffect(() => {
        if (msg) {
            setToast({ message: msg, type: "error" });
        }
    }, [msg]);

    return (
        <section className="flex flex-col min-h-screen w-full items-center bg-gray-100">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <p className="mt-[90px] text-[#222344] font-bold text-center text-[1.8em]">
                Notifications
            </p>

            <p className="text-[16px] text-[#222344] text-center mt-2 w-[400px] leading-5.5
            max-[450px]:text-[15px] max-[450px]:w-[300px]">
                Suivez l'ensemble des activités et alertes liées à votre agence.
                Consultez, filtrez et marquez facilement vos notifications comme lues.
            </p>

            <div className="flex flex-col w-[700px] mt-10 max-[750px]:w-full px-5 pb-20">

                {/* KPI Cards */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <KpiCard label="Total" value={notificationsStats.total} loading={loadingNotificationsStats} color="text-[#222344]" />
                    <KpiCard label="Non lues" value={notificationsStats.unread} loading={loadingNotificationsStats} color="text-red-700" />
                    <KpiCard label="Lues" value={notificationsStats.read} loading={loadingNotificationsStats} color="text-green-700" />
                </div>

                {/* Filtre + tout marquer comme lu */}
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                    <NotificationsFilter />

                    {notificationsStats.unread > 0 && (
                        <button
                            onClick={markAllAsRead}
                            disabled={loadingMarkAllAsRead}
                            className="flex items-center gap-2 text-sm px-4 py-2 rounded-[5px] border border-gray-200
                            text-gray-500 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60
                            disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingMarkAllAsRead ? (
                                <><i className="fa-solid fa-spinner fa-spin"></i> Marquage...</>
                            ) : (
                                <><i className="fa-solid fa-check-double"></i> Tout marquer comme lu</>
                            )}
                        </button>
                    )}
                </div>

                {/* Liste */}
                <NotificationsList />

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="bg-gray-200 text-[#222344] text-[14px] cursor-pointer
                            transition-opacity duration-200 hover:opacity-80 active:opacity-60
                            disabled:opacity-40 disabled:cursor-not-allowed
                            p-2 px-4 rounded-[5px] font-[600]"
                        >
                            ← Précédent
                        </button>

                        <span className="text-sm text-[#222344] font-[600]">
                            Page {pagination.page} / {pagination.totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage >= pagination.totalPages}
                            className="bg-gray-200 text-[#222344] text-[14px] cursor-pointer
                            transition-opacity duration-200 hover:opacity-80 active:opacity-60
                            disabled:opacity-40 disabled:cursor-not-allowed
                            p-2 px-4 rounded-[5px] font-[600]"
                        >
                            Suivant →
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
};

export default memo(Notifications);

// ─── KpiCard (local) ──────────────────────────────────────────────────────────
interface KpiCardProps {
    label: string;
    value: number;
    color: string;
    loading: boolean;
}

function KpiCard({ label, value, color, loading }: KpiCardProps) {
    return (
        <div className="bg-white border border-gray-100 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            {loading ? (
                <div className="h-6 w-10 bg-gray-100 rounded animate-pulse" />
            ) : (
                <p className={`text-xl font-medium ${color}`}>{value}</p>
            )}
        </div>
    );
}
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import type {
    Notification,
    NotificationsPagination,
    NotificationsStats
} from "../Types/Types";

import { useAuthContext } from "../Contexts/AuthContext";


// =========================================================
// TYPES
// =========================================================

interface NotificationsContextType {

    // =========================
    // NOTIFICATIONS
    // =========================

    notifications: Notification[];
    loadingNotifications: boolean;

    getNotifications: () => Promise<void>;


    // =========================
    // FILTER
    // =========================

    read: boolean | undefined;
    setRead: (value: boolean | undefined) => void;


    // =========================
    // PAGINATION
    // =========================

    currentPage: number;
    setCurrentPage: (page: number) => void;

    pageLimit: number;
    setPageLimit: (limit: number) => void;

    pagination: NotificationsPagination | null;


    // =========================
    // MARK AS READ
    // =========================

    markAsRead: (id: string) => Promise<boolean>;
    loadingMarkAsRead: boolean;


    // =========================
    // MARK ALL AS READ
    // =========================

    markAllAsRead: () => Promise<boolean>;
    loadingMarkAllAsRead: boolean;


    // =========================
    // STATS
    // =========================

    notificationsStats: NotificationsStats;

    getNotificationsStats: () => Promise<void>;

    loadingNotificationsStats: boolean;


    // =========================
    // MESSAGE
    // =========================

    msg: string | null;
}


// =========================================================
// CONTEXT
// =========================================================

const NotificationsContext =
    createContext<NotificationsContextType | null>(null);


// =========================================================
// PROVIDER
// =========================================================

export const NotificationsProvider = ({
    children
}: {
    children: React.ReactNode
}) => {

    const { token } = useAuthContext();


    // =====================================================
    // NOTIFICATIONS
    // =====================================================

    const [notifications, setNotifications] =
        useState<Notification[]>([]);

    const [loadingNotifications, setLoadingNotifications] =
        useState<boolean>(false);


    // =====================================================
    // FILTER
    // =====================================================

    const [read, setRead] =
        useState<boolean | undefined>(undefined);


    // =====================================================
    // PAGINATION
    // =====================================================

    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [pageLimit, setPageLimit] =
        useState<number>(10);

    const [pagination, setPagination] =
        useState<NotificationsPagination | null>(null);


    // =====================================================
    // MARK AS READ
    // =====================================================

    const [loadingMarkAsRead, setLoadingMarkAsRead] =
        useState<boolean>(false);


    // =====================================================
    // MARK ALL AS READ
    // =====================================================

    const [loadingMarkAllAsRead, setLoadingMarkAllAsRead] =
        useState<boolean>(false);


    // =====================================================
    // STATS
    // =====================================================

    const [notificationsStats, setNotificationsStats] =
        useState<NotificationsStats>({
            total: 0,
            unread: 0,
            read: 0
        });

    const [loadingNotificationsStats, setLoadingNotificationsStats] =
        useState<boolean>(false);


    // =====================================================
    // MESSAGE
    // =====================================================

    const [msg, setMsg] =
        useState<string | null>(null);


    // =====================================================
    // GET NOTIFICATIONS
    // =====================================================

    const getNotifications = async () => {

        try {

            setLoadingNotifications(true);
            setMsg(null);


            const params = new URLSearchParams();


            params.append(
                "page",
                String(currentPage)
            );


            params.append(
                "limit",
                String(pageLimit)
            );


            if (read !== undefined) {

                params.append(
                    "read",
                    String(read)
                );

            }


            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/notifications?${params.toString()}`,
                {
                    method: "GET",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            const data = await res.json();


            if (!res.ok) {

                setMsg(
                    data.error ||
                    data.message ||
                    "Erreur lors de la récupération des notifications"
                );

                throw new Error(
                    data.error ||
                    data.message ||
                    "Error in getting notifications"
                );

            }


            console.log(
                "Notifications : ",
                data.data
            );


            setNotifications(
                data.data
            );


            setPagination(
                data.pagination
            );


        } catch (err) {

            console.error(err);

        } finally {

            setLoadingNotifications(false);

        }

    };


    // =====================================================
    // MARK AS READ
    // =====================================================

    const markAsRead = async (
        id: string
    ): Promise<boolean> => {

        try {

            setLoadingMarkAsRead(true);
            setMsg(null);


            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/notifications/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            const data = await res.json();


            if (!res.ok) {

                setMsg(
                    data.error ||
                    data.message ||
                    "Erreur lors de la lecture de la notification"
                );

                return false;

            }


            // Mettre directement à jour la notification
            setNotifications(prev =>
                prev.map(notification =>
                    notification.id === id
                        ? {
                            ...notification,
                            read: true
                        }
                        : notification
                )
            );


            // Mettre à jour les statistiques
            setNotificationsStats(prev => {

                if (prev.unread <= 0) {
                    return prev;
                }

                return {
                    ...prev,
                    unread: prev.unread - 1,
                    read: prev.read + 1
                };

            });


            return true;


        } catch (err) {

            console.error(err);

            setMsg(
                "Erreur réseau, veuillez réessayer"
            );

            return false;

        } finally {

            setLoadingMarkAsRead(false);

        }

    };


    // =====================================================
    // MARK ALL AS READ
    // =====================================================

    const markAllAsRead = async (): Promise<boolean> => {

        try {

            setLoadingMarkAllAsRead(true);
            setMsg(null);


            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/notifications`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            const data = await res.json();


            if (!res.ok) {

                setMsg(
                    data.error ||
                    data.message ||
                    "Erreur lors de la lecture des notifications"
                );

                return false;

            }


            // Toutes les notifications deviennent lues
            setNotifications(prev =>
                prev.map(notification => ({
                    ...notification,
                    read: true
                }))
            );


            // Mise à jour des statistiques
            setNotificationsStats(prev => ({
                ...prev,
                read: prev.read + prev.unread,
                unread: 0
            }));


            return true;


        } catch (err) {

            console.error(err);

            setMsg(
                "Erreur réseau, veuillez réessayer"
            );

            return false;

        } finally {

            setLoadingMarkAllAsRead(false);

        }

    };


    // =====================================================
    // GET NOTIFICATIONS STATS
    // =====================================================

    const getNotificationsStats = async () => {

        try {

            setLoadingNotificationsStats(true);


            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/notifications/stats`,
                {
                    method: "GET",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            const data = await res.json();


            if (!res.ok) {

                throw new Error(
                    data.error ||
                    data.message ||
                    "Error in getting notifications stats"
                );

            }


            console.log(
                "Notifications stats : ",
                data.data
            );


            setNotificationsStats(
                data.data
            );


        } catch (err) {

            console.error(err);

        } finally {

            setLoadingNotificationsStats(false);

        }

    };


    // =====================================================
    // RESET PAGE WHEN FILTER CHANGES
    // =====================================================

    useEffect(() => {

        setCurrentPage(1);

    }, [read]);


    // =====================================================
    // FETCH NOTIFICATIONS
    // =====================================================

    useEffect(() => {

        if (!token) return;

        getNotifications();

    }, [
        token,
        currentPage,
        pageLimit,
        read
    ]);


    // =====================================================
    // FETCH STATS
    // =====================================================

    useEffect(() => {

        if (!token) return;

        getNotificationsStats();

    }, [token]);


    // =====================================================
    // PROVIDER
    // =====================================================

    return (
        <NotificationsContext.Provider
            value={{

                // Notifications
                notifications,
                loadingNotifications,
                getNotifications,


                // Filter
                read,
                setRead,


                // Pagination
                currentPage,
                setCurrentPage,

                pageLimit,
                setPageLimit,

                pagination,


                // Mark as read
                markAsRead,
                loadingMarkAsRead,


                // Mark all as read
                markAllAsRead,
                loadingMarkAllAsRead,


                // Stats
                notificationsStats,
                getNotificationsStats,
                loadingNotificationsStats,


                // Message
                msg

            }}
        >
            {children}
        </NotificationsContext.Provider>
    );

};


// =========================================================
// HOOK
// =========================================================

export const useNotificationsContext = () => {

    const context =
        useContext(NotificationsContext);


    if (!context) {

        throw new Error(
            "Please use useNotificationsContext inside the NotificationsProvider"
        );

    }


    return context;
};
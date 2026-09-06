import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useDashboardContext } from "../AdminContexts/DashboardContext";
import { useAuthContext } from "../Contexts/AuthContext";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatCurrency = (amount: number) =>
    `${amount.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} DA`;

const typeColors: Record<string, string> = {
    APPARTEMENT: "#3b82f6",
    TERRAIN: "#22c55e",
    LOCAL: "#f59e0b",
    VILLA: "#a855f7",
};

const statutBienColors: Record<string, string> = {
    DISPONIBLE: "#22c55e",
    RESERVE: "#f59e0b",
    VENDU: "#6b7280",
    LOUE: "#3b82f6",
};

const serviceColors: Record<string, string> = {
    LOCATION: "#3b82f6",
    VENTE: "#222344",
};

const statutVisiteColors: Record<string, string> = {
    EN_ATTENTE: "#f59e0b",
    CONTACTE: "#3b82f6",
    VISITE_CONFIRMEE: "#a855f7",
    TERMINEE: "#22c55e",
    ANNULEE: "#ef4444",
};

const statutVisiteLabels: Record<string, string> = {
    EN_ATTENTE: "En attente",
    CONTACTE: "Contacté",
    VISITE_CONFIRMEE: "Confirmée",
    TERMINEE: "Terminée",
    ANNULEE: "Annulée",
};

const roleColors: Record<string, string> = {
    ADMIN: "#222344",
    USER: "#9ca3af",
};

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
    if (diffD === 1) return "Hier";
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

// ─── Small reusable pieces ────────────────────────────────────────────────────

const ChartCard = ({
    title,
    children,
    className = "",
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`flex flex-col bg-white rounded-[10px] shadow-sm border border-gray-100
        p-4 gap-3 ${className}`}
    >
        <h3 className="text-[15px] font-bold text-[#222344]">{title}</h3>
        {children}
    </motion.div>
);

const KPICard = ({
    icon,
    label,
    value,
    iconBg,
}: {
    icon: string;
    label: string;
    value: string;
    iconBg: string;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-row items-center gap-3 bg-white rounded-[10px] shadow-sm
        border border-gray-100 p-4"
    >
        <div className={`flex items-center justify-center w-[42px] h-[42px] rounded-[8px]
        ${iconBg} text-white shrink-0`}>
            <i className={`fa-solid ${icon} text-[16px]`}></i>
        </div>
        <div className="flex flex-col overflow-hidden">
            <p className="text-[13px] text-gray-500 font-[500] truncate">{label}</p>
            <p className="text-[18px] text-gray-900 font-bold truncate">{value}</p>
        </div>
    </motion.div>
);

const ActionCard = ({
    icon,
    label,
    value,
    iconBg,
    onClick,
}: {
    icon: string;
    label: string;
    value: number;
    iconBg: string;
    onClick: () => void;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClick}
        className="flex flex-row items-center justify-between gap-3 bg-white rounded-[10px] shadow-sm
        border border-gray-100 p-4 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
    >
        <div className="flex flex-row items-center gap-3">
            <div className={`flex items-center justify-center w-[42px] h-[42px] rounded-[8px]
            ${iconBg} text-white shrink-0`}>
                <i className={`fa-solid ${icon} text-[16px]`}></i>
            </div>
            <div className="flex flex-col">
                <p className="text-[13px] text-gray-500 font-[500]">{label}</p>
                <p className="text-[18px] text-gray-900 font-bold">{value}</p>
            </div>
        </div>
        <i className="fa-solid fa-chevron-right text-gray-300 text-[14px]"></i>
    </motion.div>
);

// ─── Main page ────────────────────────────────────────────────────────────────

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { dashboardStats, loadingDashboardStats } = useDashboardContext();

    const { biens, visites, users, notifications, testimonials } = dashboardStats;

    // ── Chart data ──

    const biensParTypeData = useMemo(() => {
        const entries = Object.entries(biens.parType);
        return {
            labels: entries.map(([type]) => type),
            datasets: [
                {
                    data: entries.map(([, count]) => count),
                    backgroundColor: entries.map(([type]) => typeColors[type]),
                    borderWidth: 0,
                },
            ],
        };
    }, [biens.parType]);

    const biensParStatutData = useMemo(() => {
        const entries = Object.entries(biens.parStatut);
        return {
            labels: entries.map(([statut]) => statut),
            datasets: [
                {
                    data: entries.map(([, count]) => count),
                    backgroundColor: entries.map(([statut]) => statutBienColors[statut]),
                    borderWidth: 0,
                },
            ],
        };
    }, [biens.parStatut]);

    const biensParServiceData = useMemo(() => {
        const entries = Object.entries(biens.parService);
        return {
            labels: entries.map(([service]) => service),
            datasets: [
                {
                    data: entries.map(([, count]) => count),
                    backgroundColor: entries.map(([service]) => serviceColors[service]),
                    borderWidth: 0,
                },
            ],
        };
    }, [biens.parService]);

    const visitesParStatutData = useMemo(() => {
        const entries = Object.entries(visites.parStatut);
        return {
            labels: entries.map(([statut]) => statutVisiteLabels[statut] ?? statut),
            datasets: [
                {
                    label: "Visites",
                    data: entries.map(([, count]) => count),
                    backgroundColor: entries.map(([statut]) => statutVisiteColors[statut]),
                    borderRadius: 5,
                },
            ],
        };
    }, [visites.parStatut]);

    const topLocalisationsData = useMemo(() => {
        return {
            labels: biens.topLocalisations.map((l) => l.localisation),
            datasets: [
                {
                    label: "Biens",
                    data: biens.topLocalisations.map((l) => l.total),
                    backgroundColor: "#222344",
                    borderRadius: 5,
                },
            ],
        };
    }, [biens.topLocalisations]);

    const usersParRoleData = useMemo(() => {
        const entries = Object.entries(users.parRole);
        return {
            labels: entries.map(([role]) => role),
            datasets: [
                {
                    data: entries.map(([, count]) => count),
                    backgroundColor: entries.map(([role]) => roleColors[role]),
                    borderWidth: 0,
                },
            ],
        };
    }, [users.parRole]);

    // ── Chart options ──

    const donutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom" as const,
                labels: { boxWidth: 12, font: { size: 11 } },
            },
        },
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
    };

    const horizontalBarOptions = {
        indexAxis: "y" as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true } },
    };

    // ── Initial loading state ──

    if (loadingDashboardStats && biens.total === 0 && visites.total === 0) {
        return (
            <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 w-full">
                <i className="fa-solid fa-spinner fa-spin text-[2em] text-[#222344] mb-3"></i>
                <p className="text-[1.1em] text-gray-700">Chargement du tableau de bord...</p>
            </section>
        );
    }

    return (
        <section className="min-h-screen flex flex-col items-center bg-gray-100 w-full pb-15">

            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[#222344] text-[1.8em] font-bold mt-[90px] text-center"
            >
                Bon retour, {user?.firstName}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-center px-3 text-gray-500 mt-2 text-[15px]"
            >
                Aperçu de l'activité de votre agence aujourd'hui.
            </motion.p>

            {/* ── Actions requises ── */}
            <div className="grid grid-cols-1 min-[600px]:grid-cols-3 gap-4 w-full px-4 lg:px-10 mt-8 max-w-[1300px]">
                <ActionCard
                    icon="fa-clock"
                    label="Visites en attente"
                    value={visites.parStatut.EN_ATTENTE}
                    iconBg="bg-amber-500"
                    onClick={() => navigate("/admin/visites")}
                />
                <ActionCard
                    icon="fa-bell"
                    label="Notifications non lues"
                    value={notifications.nonLues}
                    iconBg="bg-red-500"
                    onClick={() => navigate("/admin/notifications")}
                />
                <ActionCard
                    icon="fa-comment-dots"
                    label="Avis à modérer"
                    value={testimonials.inactifs}
                    iconBg="bg-purple-500"
                    onClick={() => navigate("/admin/testimonials")}
                />
            </div>

            {/* ── KPIs ── */}
            <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-4
            gap-4 w-full px-4 lg:px-10 mt-4 max-w-[1300px]">
                <KPICard
                    icon="fa-building"
                    label="Total des biens"
                    value={biens.total.toString()}
                    iconBg="bg-[#222344]"
                />
                <KPICard
                    icon="fa-sack-dollar"
                    label="Valeur du catalogue"
                    value={formatCurrency(biens.valeurCatalogue)}
                    iconBg="bg-green-600"
                />
                <KPICard
                    icon="fa-arrow-trend-up"
                    label="Nouveaux biens (7j)"
                    value={biens.nouveauxCetteSemaine.toString()}
                    iconBg="bg-blue-600"
                />
                <KPICard
                    icon="fa-calendar-check"
                    label="Nouvelles visites (7j)"
                    value={visites.nouvellesCetteSemaine.toString()}
                    iconBg="bg-purple-600"
                />
                <KPICard
                    icon="fa-house-user"
                    label="Total des visites"
                    value={visites.total.toString()}
                    iconBg="bg-indigo-600"
                />
                <KPICard
                    icon="fa-star"
                    label="Note moyenne des avis"
                    value={testimonials.noteMoyenne > 0 ? `${testimonials.noteMoyenne} / 5` : "—"}
                    iconBg="bg-amber-500"
                />
                <KPICard
                    icon="fa-comments"
                    label="Total des avis"
                    value={testimonials.total.toString()}
                    iconBg="bg-teal-600"
                />
                <KPICard
                    icon="fa-users"
                    label="Utilisateurs inscrits"
                    value={users.total.toString()}
                    iconBg="bg-gray-700"
                />
            </div>

            {/* ── Répartition des biens ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full px-4 lg:px-10 mt-6 max-w-[1300px]">
                <ChartCard title="Biens par type">
                    <div className="h-[240px] sm:h-[280px] w-full">
                        <Doughnut data={biensParTypeData} options={donutOptions} />
                    </div>
                </ChartCard>

                <ChartCard title="Biens par statut">
                    <div className="h-[240px] sm:h-[280px] w-full">
                        <Doughnut data={biensParStatutData} options={donutOptions} />
                    </div>
                </ChartCard>

                <ChartCard title="Biens par service">
                    <div className="h-[240px] sm:h-[280px] w-full">
                        <Doughnut data={biensParServiceData} options={donutOptions} />
                    </div>
                </ChartCard>
            </div>

            {/* ── Pipeline visites + Top localisations ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full px-4 lg:px-10 mt-5 max-w-[1300px]">
                <ChartCard title="Pipeline des demandes de visite">
                    <div className="h-[260px] sm:h-[300px] w-full">
                        <Bar data={visitesParStatutData} options={barOptions} />
                    </div>
                </ChartCard>

                <ChartCard title="Top 5 des localisations">
                    <div className="h-[260px] sm:h-[300px] w-full">
                        {biens.topLocalisations.length === 0 ? (
                            <p className="text-gray-400 text-[14px] text-center mt-10">
                                Aucune donnée disponible
                            </p>
                        ) : (
                            <Bar data={topLocalisationsData} options={horizontalBarOptions} />
                        )}
                    </div>
                </ChartCard>
            </div>

            {/* ── Utilisateurs + Visites récentes + Notifications récentes ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full px-4 lg:px-10 mt-5 max-w-[1300px]">

                <ChartCard title="Utilisateurs par rôle">
                    <div className="h-[240px] sm:h-[260px] w-full">
                        <Doughnut data={usersParRoleData} options={donutOptions} />
                    </div>
                </ChartCard>

                <ChartCard title="Visites récentes" className="lg:col-span-1">
                    <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1">
                        {visites.recentes.length === 0 ? (
                            <p className="text-gray-400 text-[14px] text-center mt-10">
                                Aucune visite pour le moment
                            </p>
                        ) : (
                            visites.recentes.map((v) => (
                                <div
                                    key={v.id}
                                    className="flex flex-row items-center justify-between gap-2
                                    border-b border-gray-50 pb-2 last:border-b-0"
                                >
                                    <div className="flex flex-col overflow-hidden">
                                        <p className="text-[13px] font-[600] text-gray-800 truncate">
                                            {v.nom}
                                        </p>
                                        <p className="text-[12px] text-gray-500 truncate">
                                            {v.bien?.nom ?? "Bien supprimé"}
                                        </p>
                                    </div>
                                    <span
                                        className="text-[11px] font-[600] px-2 py-1 rounded-[5px] shrink-0"
                                        style={{
                                            backgroundColor: `${statutVisiteColors[v.statut]}1A`,
                                            color: statutVisiteColors[v.statut],
                                        }}
                                    >
                                        {statutVisiteLabels[v.statut] ?? v.statut}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </ChartCard>

                <ChartCard title="Notifications récentes">
                    <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1">
                        {notifications.recentes.length === 0 ? (
                            <p className="text-gray-400 text-[14px] text-center mt-10">
                                Aucune notification pour le moment
                            </p>
                        ) : (
                            notifications.recentes.map((n) => (
                                <div
                                    key={n.id}
                                    className="flex flex-col gap-0.5 border-b border-gray-50 pb-2 last:border-b-0"
                                >
                                    <div className="flex flex-row items-center justify-between gap-2">
                                        <p className="text-[13px] font-[600] text-gray-800 truncate">
                                            {n.title}
                                        </p>
                                        {!n.read && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-[12px] text-gray-500 truncate">
                                        {n.message}
                                    </p>
                                    <p className="text-[11px] text-gray-400">
                                        {formatDate(n.createdAt)}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </ChartCard>

            </div>

        </section>
    );
};

export default memo(Dashboard);
import { memo, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useNotificationsContext } from "../../AdminContexts/NotificationsContext";
import Icon from "../../Icons/Icons";

// -- Définition des liens du menu, séparés par section --
// (au lieu de répéter le même bloc JSX pour chaque lien, on décrit juste
// les données ici, et on les affiche avec un seul composant réutilisable)

type NavItem = {
    label: string;
    path: string;
    icon: string;
    badge?: number;
};

const MAIN_LINKS: NavItem[] = [
    { label: "Dashboard", path: "/admin/dashboard", icon: "ChartBarBig" },
    { label: "Notifications", path: "/admin/notifications", icon: "Bell" }, // badge ajouté dynamiquement
    { label: "Vos Biens", path: "/admin/biens", icon: "House" },
    { label: "Demandes de visites", path: "/admin/visites", icon: "MapPinHouse" },
    { label: "Utilisateurs", path: "/admin/users", icon: "Users" },
    { label: "Avis clients", path: "/admin/testimonials", icon: "UserStar" },
    { label: "Communes", path: "/admin/communes", icon: "MapPinned" },
    { label: "Guide d'utilisation", path: "/admin/guide", icon: "PanelRightDashed" },
];

const SETTINGS_LINKS: NavItem[] = [
    { label: "Général", path: "/admin/general", icon: "Cog" },
    { label: "Profile", path: "/admin/profile", icon: "User" },
];

const AdminHeader = () => {

    const [showSide, setShowSide] = useState<boolean>(() => {
        const saved = localStorage.getItem('showSide');
        return saved ? JSON.parse(saved) : false;
    });

    const { signOut } = useAuthContext();
    const { notificationsStats } = useNotificationsContext();

    const navigate = useNavigate();
    const location = useLocation(); // corrige la version précédente : garantit un re-render actif au changement de route

    useEffect(() => {
        localStorage.setItem('showSide', JSON.stringify(showSide));
    }, [showSide]);

    const goTo = (path: string) => {
        navigate(path);
        // sur mobile, on referme la sidebar après un clic pour éviter de cacher le contenu
        if (window.innerWidth < 600) setShowSide(false);
    };

    const NavLink = ({ item }: { item: NavItem }) => {
        const isActive = location.pathname === item.path;
        const badge = item.label === "Notifications" ? notificationsStats.unread : undefined;

        return (
            <div
                onClick={() => goTo(item.path)}
                className={`relative flex flex-row items-center gap-3 px-4 py-3 text-[15px] cursor-pointer
                border-l-4 transition-colors duration-150
                ${isActive
                        ? "border-l-[#cdad7d] bg-[#222344]/5 text-[#222344] font-semibold"
                        : "border-l-transparent text-gray-600 hover:bg-gray-100 hover:text-[#222344]"
                    }`}
            >
                <div className="relative">
                    <Icon name={item.icon} size={22} />
                    {badge != null && badge > 0 && (
                        <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1
                            flex items-center justify-center rounded-full
                            bg-red-500 text-white text-[10px] font-bold leading-none">
                            {badge > 9 ? "9+" : badge}
                        </span>
                    )}
                </div>
                <p>{item.label}</p>
            </div>
        );
    };

    return (
        <>
            <header className="w-full flex flex-row items-center px-5 h-[60px] bg-[#222344] text-[#cdad7d] fixed top-0 z-50">
                <div className="flex flex-row gap-5 items-center max-[600px]:gap-3">
                    <button
    onClick={() => setShowSide(prev => !prev)}
    aria-label="Ouvrir le menu"
    className="flex items-center justify-center w-8 h-8 cursor-pointer"
>
    <motion.div
        animate={showSide ? "open" : "closed"}
        className="relative w-7 h-6"
    >
        <motion.span
            className="absolute left-0 top-0 w-7 h-[2px] bg-[#cdad7d] rounded"
            variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 10 },
            }}
            transition={{ duration: 0.3 }}
        />
        <motion.span
            className="absolute left-0 top-[10px] w-7 h-[2px] bg-[#cdad7d] rounded"
            variants={{
                closed: { opacity: 1, x: 0 },
                open: { opacity: 0, x: -10 },
            }}
            transition={{ duration: 0.2 }}
        />
        <motion.span
            className="absolute left-0 top-[20px] w-7 h-[2px] bg-[#cdad7d] rounded"
            variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -10 },
            }}
            transition={{ duration: 0.3 }}
        />
    </motion.div>
</button>
                    <div className="text-[1.5em] max-[600px]:text-[1.2em] font-bold flex flex-row items-center gap-2">
                        panneau administrateur <Icon name="BrickWallShield" size={27} />
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {showSide && (
                    <>
                        {/* Overlay mobile : cliquer en dehors ferme le menu, sans rien changer sur desktop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSide(false)}
                            className="fixed inset-0 bg-black/30 z-40 min-[601px]:hidden mt-[60px]"
                        />

                        <motion.nav
                            initial={{ x: -250, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -250, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex flex-col h-[calc(100%-60px)] bg-white shadow-2xl z-50 fixed left-0 w-[250px] mt-[60px]"
                        >
                            <div className="flex flex-col gap-1 p-4 border-b border-b-gray-200">
                                <div className="text-[1.6em] text-[#222344] font-bold">
                                    EL AHLEM
                                </div>
                                <div className="text-[13px] font-sans text-gray-500 leading-5">
                                    Gérez facilement l'ensemble de votre activité immobilière depuis cet espace.
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                <h3 className="text-[12px] tracking-wide text-gray-400 font-semibold px-4 pt-4 pb-1 uppercase">
                                    Menu principal
                                </h3>
                                <div className="flex flex-col">
                                    {MAIN_LINKS.map(item => (
                                        <NavLink key={item.path} item={item} />
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-t-gray-200">
                                <h3 className="text-[12px] tracking-wide text-gray-400 font-semibold px-4 pt-3 pb-1 uppercase">
                                    Paramètres
                                </h3>
                                <div className="flex flex-col">
                                    {SETTINGS_LINKS.map(item => (
                                        <NavLink key={item.path} item={item} />
                                    ))}
                                    <div
                                        onClick={signOut}
                                        className="flex flex-row items-center gap-3 px-4 py-3 text-red-600 text-[15px] border-l-4 border-l-transparent hover:bg-red-50 cursor-pointer"
                                    >
                                        <Icon name="LogOut" size={22} />
                                        <p>Déconnexion</p>
                                    </div>
                                </div>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default memo(AdminHeader);

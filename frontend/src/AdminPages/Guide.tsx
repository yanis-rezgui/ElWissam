import { memo, useState } from "react";
import { motion } from "framer-motion";
import Icon from "../Icons/Icons";

// ─── Config : types de notifications (aligné sur ton enum Prisma) ────────────

const NOTIFICATION_TYPES = [
    {
        type: "NEW_BIEN",
        label: "Nouveau bien",
        desc: "Un administrateur a ajouté un nouveau bien au catalogue.",
        color: "text-blue-700",
        bg: "bg-blue-50",
        icon: "fa-house-circle-check",
    },
    {
        type: "NEW_VISITE",
        label: "Nouvelle demande de visite",
        desc: "Un client a envoyé une demande de visite pour un bien.",
        color: "text-purple-700",
        bg: "bg-purple-50",
        icon: "fa-calendar-plus",
    },
    {
        type: "NEW_USER",
        label: "Nouvel utilisateur",
        desc: "Un nouveau client vient de créer un compte sur le site.",
        color: "text-teal-700",
        bg: "bg-teal-50",
        icon: "fa-user-plus",
    },
    {
        type: "STATUS_CHANGED",
        label: "Statut modifié",
        desc: "Le statut d'un bien ou d'une demande de visite vient de changer.",
        color: "text-amber-700",
        bg: "bg-amber-50",
        icon: "fa-arrows-rotate",
    },
    {
        type: "NEW_TESTIMONIAL",
        label: "Nouveau témoignage",
        desc: "Un client a envoyé un nouvel avis sur votre agence.",
        color: "text-green-700",
        bg: "bg-green-50",
        icon: "fa-comment-dots",
    },
    {
        type: "SECURITY",
        label: "Sécurité",
        desc: "Une action sensible a été effectuée sur un compte (mot de passe, connexion...).",
        color: "text-red-700",
        bg: "bg-red-50",
        icon: "fa-shield-halved",
    },
] as const;

// ─── Config : statuts des biens ───────────────────────────────────────────────

const BIEN_STATUTS = [
    { label: "Disponible", color: "#22c55e", desc: "Le bien est actuellement disponible à la vente ou à la location." },
    { label: "Réservé", color: "#f59e0b", desc: "Une réservation est en cours pour ce bien." },
    { label: "Vendu", color: "#6b7280", desc: "Le bien a été vendu et n'est plus disponible." },
    { label: "Loué", color: "#3b82f6", desc: "Le bien a été loué et n'est plus disponible." },
];

// ─── Config : pipeline des visites (aligné sur ton enum StatutDemande) ───────

const VISITE_STATUTS = [
    { label: "En attente", color: "#f59e0b", icon: "fa-hourglass-half" },
    { label: "Contacté", color: "#3b82f6", icon: "fa-phone" },
    { label: "Visite confirmée", color: "#a855f7", icon: "fa-calendar-check" },
    { label: "Terminée", color: "#22c55e", icon: "fa-flag-checkered" },
    { label: "Annulée", color: "#ef4444", icon: "fa-circle-xmark" },
];

// ─── Config : FAQ ──────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
    {
        q: "Pourquoi mon nouveau bien n'apparaît-il pas sur le site public ?",
        r: "Vérifiez qu'il a bien été enregistré dans la liste des biens et que son statut est \"Disponible\". Les biens \"Vendu\" ou \"Loué\" restent visibles dans l'admin mais peuvent être filtrés côté public.",
    },
    {
        q: "Pourquoi je ne reçois pas de notification pour un événement ?",
        r: "Les notifications arrivent en temps réel via une connexion WebSocket. Vérifiez votre connexion internet, et si le problème persiste, rafraîchissez la page pour rétablir la connexion.",
    },
    {
        q: "Comment retirer une photo d'un bien ?",
        r: "Ouvrez le bien concerné, cliquez sur les informations à modifier, retirez la photo dans la section \"Gestion des images\", puis enregistrez vos modifications.",
    },
    {
        q: "Comment changer un bien de \"Disponible\" à \"Vendu\" ?",
        r: "Ouvrez le bien depuis la liste, modifiez son statut dans le formulaire, puis enregistrez. Une notification \"Statut modifié\" sera automatiquement générée.",
    },
    {
        q: "Comment ajouter un nouveau bien au catalogue ?",
        r: "Depuis la page \"Vos Biens\", cliquez sur \"+ Ajouter un bien\", renseignez les champs obligatoires (nom, description, prix, localisation, superficie, type, service), ajoutez des photos si besoin, puis validez.",
    },
    {
        q: "Un témoignage peut-il être supprimé après publication ?",
        r: "Oui. Depuis la page \"Avis clients\", vous pouvez à tout moment modifier, désactiver ou supprimer un témoignage, qu'il soit visible publiquement ou non.",
    },
    {
        q: "Que se passe-t-il si j'oublie mon mot de passe administrateur ?",
        r: "Contactez le développeur de la plateforme pour une réinitialisation manuelle, aucune procédure de récupération automatique n'étant disponible pour l'instant.",
    },
];

// ─── Config : sommaire ─────────────────────────────────────────────────────────

const SOMMAIRE = [
    { id: "dashboard", icon: "ChartBarBig", title: "Tableau de bord", desc: "Comprendre vos statistiques" },
    { id: "biens", icon: "House", title: "Biens immobiliers", desc: "Ajouter, modifier, gérer les statuts" },
    { id: "visites", icon: "MapPinHouse", title: "Demandes de visite", desc: "Suivre les demandes clients" },
    { id: "notifications", icon: "Bell", title: "Notifications", desc: "Comprendre les alertes reçues" },
    { id: "utilisateurs", icon: "Users", title: "Utilisateurs", desc: "Consulter et gérer les comptes" },
    { id: "testimonials", icon: "UserStar", title: "Avis clients", desc: "Gérer les témoignages" },
    { id: "agence", icon: "Cog", title: "Informations agence", desc: "Modifier les infos publiques" },
    { id: "securite", icon: "User", title: "Compte & sécurité", desc: "Mot de passe, déconnexion" },
] as const;

// ─── Petits composants réutilisables ──────────────────────────────────────────

const SectionWrapper = ({
    id,
    icon,
    title,
    children,
}: {
    id: string;
    icon: string;
    title: string;
    children: React.ReactNode;
}) => (
    <motion.section
        id={id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="scroll-mt-[80px] bg-white rounded-[12px] border border-gray-100 shadow-sm p-6 max-[500px]:p-4"
    >
        <div className="flex flex-row items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-[8px] bg-[#222344] text-white flex items-center justify-center shrink-0">
                <i className={`fa-solid ${icon} text-[16px]`}></i>
            </div>
            <h2 className="text-[19px] font-bold text-[#222344]">{title}</h2>
        </div>
        <div className="flex flex-col gap-4 text-[14.5px] text-gray-700 leading-relaxed">
            {children}
        </div>
    </motion.section>
);

const StepList = ({ steps }: { steps: string[] }) => (
    <ol className="flex flex-col gap-2.5">
        {steps.map((step, i) => (
            <li key={i} className="flex flex-row items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#222344] text-white text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                </span>
                <span>{step}</span>
            </li>
        ))}
    </ol>
);

const InfoNote = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-row items-start gap-2.5 bg-blue-50 text-blue-800 rounded-[8px] p-3 text-[13.5px]">
        <i className="fa-solid fa-circle-info mt-0.5 shrink-0"></i>
        <p>{children}</p>
    </div>
);

const WarningNote = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-row items-start gap-2.5 bg-amber-50 text-amber-800 rounded-[8px] p-3 text-[13.5px]">
        <i className="fa-solid fa-triangle-exclamation mt-0.5 shrink-0"></i>
        <p>{children}</p>
    </div>
);

const StatusLegendItem = ({ color, label, desc }: { color: string; label: string; desc: string }) => (
    <div className="flex flex-row items-start gap-3">
        <span className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ backgroundColor: color }} />
        <div className="flex flex-col">
            <span className="font-[600] text-gray-800 text-[14px]">{label}</span>
            <span className="text-gray-500 text-[13.5px]">{desc}</span>
        </div>
    </div>
);

const FaqAccordionItem = ({ q, r }: { q: string; r: string }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="border border-gray-100 rounded-[8px] overflow-hidden">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex flex-row items-center justify-between gap-3 p-3.5 text-left cursor-pointer
                bg-gray-50 hover:bg-gray-100 transition-colors"
            >
                <span className="text-[14px] font-[600] text-[#222344]">{q}</span>
                <i className={`fa-solid fa-chevron-down text-gray-400 text-[12px] transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}></i>
            </button>

            {open && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="p-3.5 text-[13.5px] text-gray-600 leading-relaxed bg-white"
                >
                    {r}
                </motion.div>
            )}
        </div>
    );
};

// ─── Page principale ───────────────────────────────────────────────────────────

const Guide = () => {
    const [search, setSearch] = useState("");

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const filteredFaq = FAQ_ITEMS.filter(
        (item) =>
            item.q.toLowerCase().includes(search.toLowerCase()) ||
            item.r.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="flex flex-col min-h-screen w-full items-center bg-gray-100 pb-16">

            {/* ── Header ── */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[#222344] font-bold text-center text-[1.8em] mt-[90px]"
            >
                Guide d'utilisation
            </motion.h1>

            <p className="text-[16px] text-[#222344] text-center mt-2 w-[500px] leading-5.5
            max-[550px]:text-[15px] max-[550px]:w-[320px]">
                Retrouvez ici toutes les informations nécessaires pour gérer efficacement
                votre agence et votre site web, sans avoir besoin de contacter votre développeur.
            </p>

            {/* ── Barre de recherche ── */}
            <div className="relative w-[420px] max-[460px]:w-[320px] mt-5">
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[14px]"></i>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher dans la FAQ..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-[14px]
                    text-gray-700 outline-none focus:border-[#222344] transition-colors"
                />
            </div>

            <div className="flex flex-col w-[900px] max-[950px]:w-full gap-6 mt-8 px-5 max-w-[900px]">

                {/* ── Sommaire ── */}
                <div className="grid grid-cols-2 min-[650px]:grid-cols-4 gap-3">
                    {SOMMAIRE.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ y: -3 }}
                            onClick={() => scrollToSection(item.id)}
                            className="flex flex-col items-center text-center gap-2 bg-white rounded-[10px]
                            border border-gray-100 shadow-sm p-4 cursor-pointer transition-shadow hover:shadow-md"
                        >
                            <div className="w-10 h-10 rounded-full bg-gray-100 text-[#222344] flex items-center justify-center">
                                <Icon name={item.icon} size={20} />
                            </div>
                            <p className="text-[13px] font-[600] text-[#222344] leading-tight">{item.title}</p>
                            <p className="text-[11.5px] text-gray-400 leading-tight">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* ── Tableau de bord ── */}
                <SectionWrapper id="dashboard" icon="fa-chart-line" title="Tableau de bord">
                    <p>
                        Le tableau de bord vous donne une vue d'ensemble immédiate de l'activité de
                        votre agence : nombre de biens, valeur du catalogue, demandes de visite en
                        attente, notifications non lues et note moyenne de vos avis clients.
                    </p>
                    <ul className="flex flex-col gap-1.5 list-disc list-inside">
                        <li><strong>Répartition des biens</strong> — par type, statut et service, pour visualiser l'équilibre de votre catalogue.</li>
                        <li><strong>Pipeline des visites</strong> — combien de demandes sont à chaque étape du traitement.</li>
                        <li><strong>Top localisations</strong> — les zones géographiques les plus représentées dans votre offre.</li>
                        <li><strong>Activité récente</strong> — dernières visites et notifications, sans avoir à naviguer ailleurs.</li>
                    </ul>
                    <InfoNote>
                        Les cartes "Visites en attente", "Notifications non lues" et "Avis à modérer"
                        sont cliquables : elles vous redirigent directement vers la page concernée.
                    </InfoNote>
                </SectionWrapper>

                {/* ── Biens ── */}
                <SectionWrapper id="biens" icon="fa-house" title="Biens immobiliers">
                    <div>
                        <p className="font-[600] text-gray-800 mb-2">Ajouter un bien</p>
                        <StepList
                            steps={[
                                "Rendez-vous dans la section \"Vos Biens\".",
                                "Cliquez sur \"+ Ajouter un bien\".",
                                "Renseignez le nom, la description, le prix, la localisation et la superficie.",
                                "Choisissez le type (Appartement, Terrain, Local, Villa) et le service (Location, Vente).",
                                "Ajoutez les caractéristiques et, si besoin, un lien vers une carte.",
                                "Ajoutez des photos de qualité.",
                                "Cliquez sur \"Ajouter le bien\".",
                            ]}
                        />
                    </div>

                    <InfoNote>
                        Utilisez des photos nettes et une description précise : c'est ce qui donne
                        une image professionnelle de votre agence à vos visiteurs.
                    </InfoNote>

                    <div>
                        <p className="font-[600] text-gray-800 mb-2">Modifier un bien</p>
                        <p>
                            Ouvrez le bien depuis la liste, modifiez les champs souhaités
                            (informations, caractéristiques, photos, statut), puis enregistrez.
                        </p>
                    </div>

                    <div>
                        <p className="font-[600] text-gray-800 mb-3">Signification des statuts</p>
                        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-3">
                            {BIEN_STATUTS.map((s) => (
                                <StatusLegendItem key={s.label} color={s.color} label={s.label} desc={s.desc} />
                            ))}
                        </div>
                    </div>
                </SectionWrapper>

                {/* ── Visites ── */}
                <SectionWrapper id="visites" icon="fa-calendar-days" title="Demandes de visite">
                    <p>
                        Lorsqu'un client s'intéresse à un bien, il peut soumettre une demande de
                        visite depuis le site public. Chaque demande contient : nom, email,
                        téléphone, bien concerné, date souhaitée, message éventuel et statut.
                    </p>

                    <div>
                        <p className="font-[600] text-gray-800 mb-3">Le parcours d'une demande</p>
                        <div className="flex flex-row max-[600px]:flex-col items-center gap-2 flex-wrap">
                            {VISITE_STATUTS.map((s, i) => (
                                <div key={s.label} className="flex flex-row max-[600px]:flex-col items-center gap-2">
                                    <div
                                        className="flex flex-row items-center gap-2 px-3 py-2 rounded-full text-[12.5px] font-[600]"
                                        style={{ backgroundColor: `${s.color}1A`, color: s.color }}
                                    >
                                        <i className={`fa-solid ${s.icon}`}></i>
                                        {s.label}
                                    </div>
                                    {i < VISITE_STATUTS.length - 1 && (
                                        <i className="fa-solid fa-arrow-right max-[600px]:fa-arrow-down text-gray-300 text-[13px]"></i>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <InfoNote>
                        Dès qu'une nouvelle demande est envoyée, une notification apparaît
                        automatiquement dans votre panneau d'administration — inutile de
                        rafraîchir la page.
                    </InfoNote>
                </SectionWrapper>

                {/* ── Notifications ── */}
                <SectionWrapper id="notifications" icon="fa-bell" title="Notifications">
                    <p>
                        Les notifications vous tiennent informé en temps réel de tout ce qui se
                        passe sur votre plateforme, sans action de votre part.
                    </p>

                    <div className="grid grid-cols-1 min-[600px]:grid-cols-2 gap-3">
                        {NOTIFICATION_TYPES.map((n) => (
                            <div key={n.type} className={`flex flex-row items-start gap-3 rounded-[8px] p-3 ${n.bg}`}>
                                <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 ${n.color}`}>
                                    <i className={`fa-solid ${n.icon} text-[13px]`}></i>
                                </div>
                                <div className="flex flex-col">
                                    <span className={`text-[13.5px] font-[600] ${n.color}`}>{n.label}</span>
                                    <span className="text-[12.5px] text-gray-600">{n.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <InfoNote>
                        Un point rouge sur la cloche de la barre latérale indique le nombre de
                        notifications non lues. Cliquez sur une notification pour la marquer comme lue.
                    </InfoNote>
                </SectionWrapper>

                {/* ── Utilisateurs ── */}
                <SectionWrapper id="utilisateurs" icon="fa-users" title="Utilisateurs">
                    <p>
                        Cette section liste tous les comptes clients et administrateurs de la
                        plateforme. Vous pouvez :
                    </p>
                    <ul className="flex flex-col gap-1.5 list-disc list-inside">
                        <li>Rechercher un utilisateur par nom ou email.</li>
                        <li>Filtrer par rôle (<strong>ADMIN</strong> ou <strong>USER</strong>).</li>
                        <li>Consulter les informations d'un compte.</li>
                        <li>Modifier le prénom, le nom ou le rôle d'un utilisateur.</li>
                        <li>Supprimer définitivement un compte.</li>
                    </ul>
                    <WarningNote>
                        La suppression d'un utilisateur est définitive et supprime également ses
                        favoris associés. Cette action ne peut pas être annulée.
                    </WarningNote>
                </SectionWrapper>

                {/* ── Témoignages ── */}
                <SectionWrapper id="testimonials" icon="fa-star" title="Avis clients">
                    <p>
                        Les témoignages affichés sur votre site public sont gérés depuis cette
                        page. Chaque avis possède une note (1 à 5), un message et un statut
                        <strong> actif / inactif</strong> qui détermine sa visibilité publique.
                    </p>
                    <ul className="flex flex-col gap-1.5 list-disc list-inside">
                        <li>Ajoutez manuellement un témoignage reçu par un autre canal.</li>
                        <li>Activez ou désactivez un avis pour contrôler sa visibilité publique.</li>
                        <li>Modifiez ou supprimez un témoignage à tout moment.</li>
                    </ul>
                    <InfoNote>
                        Seuls les témoignages marqués comme "actifs" apparaissent sur le site
                        visible par vos clients.
                    </InfoNote>
                </SectionWrapper>

                {/* ── Agence ── */}
                <SectionWrapper id="agence" icon="fa-building" title="Informations de l'agence">
                    <p>
                        Cette section centralise les informations publiques de votre agence,
                        affichées sur le site visiteurs :
                    </p>
                    <ul className="flex flex-col gap-1.5 list-disc list-inside">
                        <li>Nom de l'agence</li>
                        <li>Numéro(s) de téléphone</li>
                        <li>Adresse email de contact</li>
                        <li>Adresse du bureau</li>
                        <li>Lien Google Maps</li>
                        <li>Réseaux sociaux (Facebook, TikTok, etc.)</li>
                    </ul>
                    <WarningNote>
                        Les informations renseignées ici sont directement utilisées sur le site
                        public. Vérifiez-les attentivement avant d'enregistrer.
                    </WarningNote>
                </SectionWrapper>

                {/* ── Sécurité ── */}
                <SectionWrapper id="securite" icon="fa-shield-halved" title="Compte & sécurité">
                    <p>
                        Depuis votre page Profil, vous pouvez modifier votre prénom, votre nom,
                        et votre mot de passe à tout moment.
                    </p>
                    <ul className="flex flex-col gap-1.5 list-disc list-inside">
                        <li>Ne partagez jamais vos identifiants administrateur.</li>
                        <li>Déconnectez-vous systématiquement sur un ordinateur partagé.</li>
                        <li>Utilisez un mot de passe fort (majuscule, chiffre, caractère spécial).</li>
                    </ul>
                    <WarningNote>
                        En cas de mot de passe oublié, aucune récupération automatique n'est
                        disponible pour l'instant : contactez votre développeur pour une
                        réinitialisation manuelle.
                    </WarningNote>
                </SectionWrapper>

                {/* ── FAQ ── */}
                <SectionWrapper id="faq" icon="fa-circle-question" title="Questions fréquentes">
                    {filteredFaq.length === 0 ? (
                        <p className="text-gray-400 text-center py-6 text-[14px]">
                            Aucun résultat pour "{search}"
                        </p>
                    ) : (
                        <div className="flex flex-col gap-2.5">
                            {filteredFaq.map((item) => (
                                <FaqAccordionItem key={item.q} q={item.q} r={item.r} />
                            ))}
                        </div>
                    )}
                </SectionWrapper>

            </div>
        </section>
    );
};

export default memo(Guide);
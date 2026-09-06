import prisma from "../config/prisma.js";


export const getDashboardStats = async (req, res, next) => {

    try {

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const [

            // =========================
            // BIENS
            // =========================

            totalBiens,
            biensParType,
            biensParStatut,
            biensParService,
            valeurCatalogue,
            nouveauxBiensSemaine,
            topLocalisations,

            // =========================
            // VISITES
            // =========================

            totalVisites,
            visitesParStatut,
            nouvellesVisitesSemaine,
            visitesRecentes,

            // =========================
            // USERS
            // =========================

            totalUsers,
            usersParRole,

            // =========================
            // NOTIFICATIONS
            // =========================

            totalNotifications,
            unreadNotifications,
            notificationsRecentes,

            // =========================
            // TESTIMONIALS
            // =========================

            totalTestimonials,
            testimonialsInactifs,
            testimonialsMoyenne,

        ] = await Promise.all([

            prisma.bien.count(),

            prisma.bien.groupBy({
                by: ["type"],
                _count: { id: true },
            }),

            prisma.bien.groupBy({
                by: ["statut"],
                _count: { id: true },
            }),

            prisma.bien.groupBy({
                by: ["service"],
                _count: { id: true },
            }),

            prisma.bien.aggregate({
                where: { statut: "DISPONIBLE" },
                _sum: { prix: true },
            }),

            prisma.bien.count({
                where: { createdAt: { gte: oneWeekAgo } },
            }),

            prisma.bien.groupBy({
                by: ["localisation"],
                _count: { id: true },
                orderBy: {
                    _count: { id: "desc" },
                },
                take: 5,
            }),

            prisma.demandeVisite.count(),

            prisma.demandeVisite.groupBy({
                by: ["statut"],
                _count: { id: true },
            }),

            prisma.demandeVisite.count({
                where: { createdAt: { gte: oneWeekAgo } },
            }),

            prisma.demandeVisite.findMany({
                take: 5,
                orderBy: [
                    { createdAt: "desc" },
                    { id: "desc" },
                ],
                include: {
                    bien: true,
                },
            }),

            prisma.user.count(),

            prisma.user.groupBy({
                by: ["role"],
                _count: { id: true },
            }),

            prisma.notification.count(),

            prisma.notification.count({
                where: { read: false },
            }),

            prisma.notification.findMany({
                take: 5,
                orderBy: [
                    { createdAt: "desc" },
                    { id: "desc" },
                ],
            }),

            prisma.testimonial.count(),

            prisma.testimonial.count({
                where: { active: false },
            }),

            prisma.testimonial.aggregate({
                where: { active: true },
                _avg: { rating: true },
            }),

        ]);


        // =========================================================
        // FORMATAGE DES GROUPBY (pour toujours avoir toutes les clés)
        // =========================================================

        const biensParTypeStats = {
            APPARTEMENT: 0,
            TERRAIN: 0,
            LOCAL: 0,
            VILLA: 0,
        };

        biensParType.forEach((item) => {
            biensParTypeStats[item.type] = item._count.id;
        });


        const biensParStatutStats = {
            DISPONIBLE: 0,
            RESERVE: 0,
            VENDU: 0,
            LOUE: 0,
        };

        biensParStatut.forEach((item) => {
            biensParStatutStats[item.statut] = item._count.id;
        });


        const biensParServiceStats = {
            LOCATION: 0,
            VENTE: 0,
        };

        biensParService.forEach((item) => {
            biensParServiceStats[item.service] = item._count.id;
        });


        const visitesParStatutStats = {
            EN_ATTENTE: 0,
            CONTACTE: 0,
            VISITE_CONFIRMEE: 0,
            TERMINEE: 0,
            ANNULEE: 0,
        };

        visitesParStatut.forEach((item) => {
            visitesParStatutStats[item.statut] = item._count.id;
        });


        const usersParRoleStats = {
            ADMIN: 0,
            USER: 0,
        };

        usersParRole.forEach((item) => {
            usersParRoleStats[item.role] = item._count.id;
        });


        const topLocalisationsFormatted = topLocalisations.map((item) => ({
            localisation: item.localisation,
            total: item._count.id,
        }));


        // =========================================================
        // RESPONSE
        // =========================================================

        return res.status(200).json({

            success: true,
            message: "Statistiques du dashboard récupérées avec succès",

            data: {

                biens: {
                    total: totalBiens,
                    parType: biensParTypeStats,
                    parStatut: biensParStatutStats,
                    parService: biensParServiceStats,
                    valeurCatalogue: valeurCatalogue._sum.prix || 0,
                    nouveauxCetteSemaine: nouveauxBiensSemaine,
                    topLocalisations: topLocalisationsFormatted,
                },

                visites: {
                    total: totalVisites,
                    parStatut: visitesParStatutStats,
                    nouvellesCetteSemaine: nouvellesVisitesSemaine,
                    recentes: visitesRecentes,
                },

                users: {
                    total: totalUsers,
                    parRole: usersParRoleStats,
                },

                notifications: {
                    total: totalNotifications,
                    nonLues: unreadNotifications,
                    recentes: notificationsRecentes,
                },

                testimonials: {
                    total: totalTestimonials,
                    inactifs: testimonialsInactifs,
                    noteMoyenne: testimonialsMoyenne._avg.rating
                        ? Number(testimonialsMoyenne._avg.rating.toFixed(1))
                        : 0,
                },

            },

        });

    } catch (err) {

        next(err);

    }

};
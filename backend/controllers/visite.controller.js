import prisma from "../config/prisma.js";

export const addVisite = async (req, res, next) => {
    try {
        const {
            nom,
            email,
            telephone,
            dateSouhaitee,
            message,
            bienId,
        } = req.body;

        // ============================================================
        // VALIDATION DU BIEN
        // ============================================================

        if (!bienId || typeof bienId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Identifiant du bien invalide",
            });
        }

        const bien = await prisma.bien.findUnique({
            where: {
                id: bienId,
            },
        });

        if (!bien) {
            return res.status(404).json({
                success: false,
                message: "Bien introuvable",
            });
        }

        // ============================================================
        // VALIDATION DU NOM
        // ============================================================

        if (!nom || typeof nom !== "string" || nom.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Nom invalide",
            });
        }

        // ============================================================
        // VALIDATION DE L'EMAIL
        // ============================================================

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !email ||
            typeof email !== "string" ||
            email.trim() === "" ||
            !emailRegex.test(email.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: "Adresse email invalide",
            });
        }

        // ============================================================
        // VALIDATION DU TELEPHONE
        // ============================================================

        if (
            !telephone ||
            typeof telephone !== "string" ||
            telephone.trim() === ""
        ) {
            return res.status(400).json({
                success: false,
                message: "Numéro de téléphone invalide",
            });
        }

        // ============================================================
        // VALIDATION DE LA DATE
        // ============================================================

        if (!dateSouhaitee) {
            return res.status(400).json({
                success: false,
                message: "Veuillez sélectionner une date de visite",
            });
        }

        const date = new Date(dateSouhaitee);

        if (isNaN(date.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Date de visite invalide",
            });
        }

        // ============================================================
        // CREATION DE LA DEMANDE
        // ============================================================

        const newReservation = await prisma.demandeVisite.create({
            data: {
                nom: nom.trim(),
                email: email.trim().toLowerCase(),
                telephone: telephone.trim(),
                dateSouhaitee: date,
                message: message?.trim() || null,

                // Le statut initial est défini par le serveur
                statut: "EN_ATTENTE",

                // Relation avec le bien
                bien: {
                    connect: {
                        id: bienId,
                    },
                },
            },
        });

        // ============================================================
        // RESPONSE
        // ============================================================

        return res.status(201).json({
            success: true,
            message: "Demande de visite créée avec succès",
            data: newReservation,
        });

    } catch (error) {
        next(error);
    }
};




export const getVisits = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            statut,
            search,
        } = req.query;

        const where = {};

        // =========================
        // FILTRE STATUT
        // =========================

        if (statut && statut.trim() !== "") {
            where.statut = statut;
        }

        // =========================
        // RECHERCHE
        // =========================

        if (search && search.trim() !== "") {
            const searchValue = search.trim();

            where.OR = [
                {
                    email: {
                        contains: searchValue,
                        mode: "insensitive",
                    },
                },
                {
                    nom: {
                        contains: searchValue,
                        mode: "insensitive",
                    },
                },
                {
                    telephone: {
                        contains: searchValue,
                        mode: "insensitive",
                    },
                },
            ];
        }

        // =========================
        // PAGINATION
        // =========================

        const currentPage = Math.max(
            Number(page) || 1,
            1
        );

        const pageLimit = Math.min(
            Math.max(Number(limit) || 10, 1),
            50
        );

        const skip = (currentPage - 1) * pageLimit;

        // =========================
        // RECUPERATION DES VISITES
        // =========================

        const visites = await prisma.demandeVisite.findMany({
            where,

            include: {
                bien: true,
            },

            skip,

            take: pageLimit,

            orderBy: [
                {
                    createdAt: "desc",
                },
                {
                    id: "desc",
                },
            ],
        });

        // =========================
        // TOTAL
        // =========================

        const total = await prisma.demandeVisite.count({
            where,
        });

        const totalPages = Math.ceil(
            total / pageLimit
        );

        // =========================
        // RESPONSE
        // =========================

        return res.status(200).json({
            success: true,

            data: visites,

            pagination: {
                page: currentPage,
                limit: pageLimit,
                total,
                totalPages,
            },
        });

    } catch (err) {
        next(err);
    }
};


export const modifyStatus = async(req, res, next) => {

    try{

        const visiteId = req.params.id;

        const visite = await prisma.demandeVisite.findUnique({
            where : {
                id : visiteId
            }
        });

        if(!visite){
            return res.status(404).json({
                success: false,
                message : "Error visite not found"
            });
        }

        const {statut} = req.body;

        const statuts = ["EN_ATTENTE",
            "CONTACTE",
            "VISITE_CONFIRMEE",
            "TERMINEE",
            "ANNULEE"];

        if(!statuts.includes(statut)){
            return res.status(400).json({
                success: false,
                message : "Error invalid status"
            });
        }

        const newVisite = await prisma.demandeVisite.update({
            where : {
                id : visiteId
            },
            data : {
                statut : statut.trim()
            },
            include : {
                bien : true
            }
        });

        return res.status(200).json({
            success : true,
            message : "Status updated successfully",
            data : newVisite
        });

    }catch(err){
        next(err)
    }
}


export const deleteVisite = async(req, res, next) =>{

    try{

        const visiteId = req.params.id;

        const visite = await prisma.demandeVisite.findUnique({
            where : {
                id : visiteId
            }
        });

        if(!visite){
            return res.status(404).json({
                success : false,
                message : "Error visite not found"
            });
        }

        const deletedVisite = await prisma.demandeVisite.delete({
            where : {
                id : visiteId
            }
        });

        return res.status(200).json({
            success : true,
            message: "visite deleted successfully",

        });
    }catch(err){
        next(err);
    }
}


export const deleteAllTerminee = async(req, res, next) => {

    try{

        const visites = await prisma.demandeVisite.deleteMany({
            where : {
                statut : "TERMINEE"
            }
        });

        return res.status(200).json({
            success : true,
            message : "Deleted all TERMINEE vistes"
        });
    }catch(err){
        next(err);
    }
}

export const deleteAllAnnulee = async(req, res, next) => {

    try{

        const visites = await prisma.demandeVisite.deleteMany({
            where : {
                statut : "ANNULEE"
            }
        });


        return res.status(200).json({
            success : true,
            message : "Visites Annulee deleted"
        })
    }catch(err){
        next(err);
    }
}


export const getVisitsStats = async (req, res, next) => {
    try {
        const [
            total,
            enAttente,
            contacte,
            visiteConfirmee,
            terminee,
            annulee,
        ] = await Promise.all([
            prisma.demandeVisite.count(),

            prisma.demandeVisite.count({
                where: {
                    statut: "EN_ATTENTE",
                },
            }),

            prisma.demandeVisite.count({
                where: {
                    statut: "CONTACTE",
                },
            }),

            prisma.demandeVisite.count({
                where: {
                    statut: "VISITE_CONFIRMEE",
                },
            }),

            prisma.demandeVisite.count({
                where: {
                    statut: "TERMINEE",
                },
            }),

            prisma.demandeVisite.count({
                where: {
                    statut: "ANNULEE",
                },
            }),
        ]);

        return res.status(200).json({
            success: true,
            data: {
                total,
                enAttente,
                contacte,
                visiteConfirmee,
                terminee,
                annulee,
            },
        });

    } catch (err) {
        next(err);
    }
};
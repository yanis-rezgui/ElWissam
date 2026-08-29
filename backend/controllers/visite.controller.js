import prisma from "../config/prisma.js";

const addVisite = async (req, res, next) => {
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

export default addVisite;
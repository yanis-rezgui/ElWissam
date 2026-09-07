import { cloudinary } from "../config/env.js";
import prisma from "../config/prisma.js";
import { notifyAdmins } from "../services/notifications.service.js";
import {
    uploadImage,
    deleteImage
} from "../services/cloudinary.service.js";


export const updateBien = async (req, res, next) => {
    try {
        const bienId = req.params.id;

        const bien = await prisma.bien.findUnique({
            where: {
                id: bienId
            }
        });

        if (!bien) {
            return res.status(404).json({
                success: false,
                message: "Bien introuvable"
            });
        }

        const updates = {};

        const {
            nom,
            description,
            prix,
            negociable,
            statut,
            localisation,
            superficie,
            type,
            service,
            features,
            localisationMap
        } = req.body;


        // =========================
        // NOM
        // =========================

        if (nom !== undefined) {
            if (typeof nom !== "string" || nom.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Le nom est requis"
                });
            }

            updates.nom = nom.trim();
        }


        // =========================
        // DESCRIPTION
        // =========================

        if (description !== undefined) {
            if (
                typeof description !== "string" ||
                description.trim() === ""
            ) {
                return res.status(400).json({
                    success: false,
                    message: "La description est requise"
                });
            }

            updates.description = description.trim();
        }


        // =========================
        // PRIX
        // =========================

        if (prix !== undefined) {
            const prixNumber = Number(prix);

            if (isNaN(prixNumber) || prixNumber < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Le prix est invalide"
                });
            }

            updates.prix = prixNumber;
        }


        // =========================
// NEGOCIABLE
// =========================

        if (negociable !== undefined) {
            const negociableValue =
                typeof negociable === "string"
                    ? negociable === "true"
                    : negociable;

            if (typeof negociableValue !== "boolean") {
                return res.status(400).json({
                    success: false,
                    message: "La valeur de negociable est invalide"
                });
            }

            updates.negociable = negociableValue;
        }


        // =========================
        // STATUT
        // =========================

        if (statut !== undefined) {
            const statutsValides = [
                "DISPONIBLE",
                "RESERVE",
                "VENDU",
                "LOUE"
            ];

            if (!statutsValides.includes(statut)) {
                return res.status(400).json({
                    success: false,
                    message: "Le statut du bien est invalide"
                });
            }

            updates.statut = statut;
        }


        // =========================
        // LOCALISATION
        // =========================

        if (localisation !== undefined) {
            if (
                typeof localisation !== "string" ||
                localisation.trim() === ""
            ) {
                return res.status(400).json({
                    success: false,
                    message: "La localisation est requise"
                });
            }

            updates.localisation = localisation.trim();
        }


        // =========================
        // SUPERFICIE
        // =========================

        if (superficie !== undefined) {
            const superficieNumber = Number(superficie);

            if (
                isNaN(superficieNumber) ||
                superficieNumber <= 0
            ) {
                return res.status(400).json({
                    success: false,
                    message: "La superficie est invalide"
                });
            }

            updates.superficie = superficieNumber;
        }


        // =========================
        // TYPE
        // =========================

        if (type !== undefined) {
            const typesValides = [
                "APPARTEMENT",
                "TERRAIN",
                "LOCAL",
                "VILLA"
            ];

            if (!typesValides.includes(type)) {
                return res.status(400).json({
                    success: false,
                    message: "Le type du bien est invalide"
                });
            }

            updates.type = type;
        }


        // =========================
        // SERVICE
        // =========================

        if (service !== undefined) {
            const servicesValides = [
                "LOCATION",
                "VENTE"
            ];

            if (!servicesValides.includes(service)) {
                return res.status(400).json({
                    success: false,
                    message: "Le service du bien est invalide"
                });
            }

            updates.service = service;
        }


        // =========================
        // FEATURES
        // =========================

        if (features !== undefined) {
    let parsedFeatures;

    try {
        parsedFeatures =
            typeof features === "string"
                ? JSON.parse(features)
                : features;
    } catch {
        return res.status(400).json({
            success: false,
            message: "Les caractéristiques sont invalides",
        });
    }

    if (
        !Array.isArray(parsedFeatures) ||
        !parsedFeatures.every(
            (feature) => typeof feature === "string"
        )
    ) {
        return res.status(400).json({
            success: false,
            message: "Les caractéristiques sont invalides",
        });
    }

    updates.features = parsedFeatures
        .map((feature) => feature.trim())
        .filter(Boolean);
}


        // =========================
        // LOCALISATION MAP
        // =========================

        if (localisationMap !== undefined) {
            if (
                localisationMap !== null &&
                typeof localisationMap !== "string"
            ) {
                return res.status(400).json({
                    success: false,
                    message: "La localisation de la carte est invalide"
                });
            }

            updates.localisationMap =
                localisationMap === null
                    ? null
                    : localisationMap.trim();
        }


     


      
// =========================
// IMAGES
// =========================

// Récupérer les images actuelles du bien
const currentImages = await prisma.bienImage.findMany({
    where: {
        bienId: bienId
    }
});


// ==========================================
// IMAGES EXISTANTES CONSERVEES
// ==========================================

let existingImageIds = [];

if (req.body.existingImageIds !== undefined) {

    try {

        existingImageIds =
            typeof req.body.existingImageIds === "string"
                ? JSON.parse(req.body.existingImageIds)
                : req.body.existingImageIds;

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: "Impossible de lire les images existantes"
        });

    }


    if (!Array.isArray(existingImageIds)) {

        return res.status(400).json({
            success: false,
            message: "Le format des images existantes est invalide"
        });

    }


    if (
        !existingImageIds.every(
            (id) => typeof id === "string"
        )
    ) {

        return res.status(400).json({
            success: false,
            message: "Les identifiants des images sont invalides"
        });

    }

}


// ==========================================
// IMAGES SUPPRIMEES
// ==========================================

const imagesToDelete = currentImages.filter(
    (image) =>
        !existingImageIds.includes(image.id)
);


// ==========================================
// SUPPRESSION CLOUDINARY + DATABASE
// ==========================================

if (imagesToDelete.length > 0) {

    for (const image of imagesToDelete) {

        // Supprimer de Cloudinary
        await deleteImage(image.publicId);

        // Supprimer de PostgreSQL
        await prisma.bienImage.delete({
            where: {
                id: image.id
            }
        });

    }

}


// ==========================================
// NOUVELLES IMAGES
// ==========================================

if (
    req.files &&
    Array.isArray(req.files) &&
    req.files.length > 0
) {

    const uploadedImages = await Promise.all(
        req.files.map(uploadImage)
    );


    await prisma.bienImage.createMany({

        data: uploadedImages.map((image) => ({

            url: image.url,

            publicId: image.publicId,

            bienId: bienId

        }))

    });

}

           // =========================
        // AUCUNE MODIFICATION
        // =========================

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Aucune modification fournie"
            });
        }
            
        const oldStatus = bien.statut;


        // =========================
        // UPDATE
        // =========================

        const updatedBien = await prisma.bien.update({
            where: {
                id: bienId
            },
            data: updates
        });

            if (oldStatus !== updatedBien.statut) {
        await notifyAdmins({
            title: "Statut du bien modifié",
            message: `Le bien "${updatedBien.nom}" est maintenant "${updatedBien.statut}".`,
            type: "STATUS_CHANGED"
        });
    }


        return res.status(200).json({
            success: true,
            message: "Bien mis à jour avec succès",
            bien: updatedBien
        });

    } catch (error) {
        next(error);
    }
};





export const addBien = async (req, res, next) => {
    try {

        const {
            nom,
            description,
            prix,
            negociable,
            localisation,
            superficie,
            type,
            service,
            features,
            localisationMap
        } = req.body;


        const newBien = {};


        // =========================
        // NOM
        // =========================

        if (nom === undefined || typeof nom !== "string" || nom.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Le nom du bien est requis"
            });
        }

        newBien.nom = nom.trim();


        // =========================
        // DESCRIPTION
        // =========================

        if (
            description === undefined ||
            typeof description !== "string" ||
            description.trim() === ""
        ) {
            return res.status(400).json({
                success: false,
                message: "La description du bien est requise"
            });
        }

        newBien.description = description.trim();


        // =========================
        // PRIX
        // =========================

        if (prix === undefined) {
            return res.status(400).json({
                success: false,
                message: "Le prix du bien est requis"
            });
        }

        const prixNumber = Number(prix);

        if (isNaN(prixNumber) || prixNumber < 0) {
            return res.status(400).json({
                success: false,
                message: "Le prix est invalide"
            });
        }

        newBien.prix = prixNumber;


        // =========================
        // NEGOCIABLE
        // =========================

        if (negociable !== undefined) {

            const negociableValue =
                typeof negociable === "string"
                    ? negociable === "true"
                    : negociable;

            if (typeof negociableValue !== "boolean") {
                return res.status(400).json({
                    success: false,
                    message: "La valeur de negociable est invalide"
                });
            }

            newBien.negociable = negociableValue;
        }


        // =========================
        // STATUT
        // =========================

       newBien.statut = "DISPONIBLE";


        // =========================
        // LOCALISATION
        // =========================

        if (
            localisation === undefined ||
            typeof localisation !== "string" ||
            localisation.trim() === ""
        ) {
            return res.status(400).json({
                success: false,
                message: "La localisation est requise"
            });
        }

        newBien.localisation = localisation.trim();


        // =========================
        // SUPERFICIE
        // =========================

        if (superficie === undefined) {
            return res.status(400).json({
                success: false,
                message: "La superficie est requise"
            });
        }

        const superficieNumber = Number(superficie);

        if (
            isNaN(superficieNumber) ||
            superficieNumber <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "La superficie est invalide"
            });
        }

        newBien.superficie = superficieNumber;


        // =========================
        // TYPE
        // =========================

        if (type === undefined) {
            return res.status(400).json({
                success: false,
                message: "Le type du bien est requis"
            });
        }

        const typesValides = [
            "APPARTEMENT",
            "TERRAIN",
            "LOCAL",
            "VILLA"
        ];

        if (!typesValides.includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Le type du bien est invalide"
            });
        }

        newBien.type = type;


        // =========================
        // SERVICE
        // =========================

        if (service === undefined) {
            return res.status(400).json({
                success: false,
                message: "Le service du bien est requis"
            });
        }

        const servicesValides = [
            "LOCATION",
            "VENTE"
        ];

        if (!servicesValides.includes(service)) {
            return res.status(400).json({
                success: false,
                message: "Le service du bien est invalide"
            });
        }

        newBien.service = service;


        // =========================
        // FEATURES
        // =========================

        if (features !== undefined) {

            let parsedFeatures = [];

            try {
                parsedFeatures =
                    typeof features === "string"
                        ? JSON.parse(features)
                        : features;

                if (!Array.isArray(parsedFeatures)) {
                    return res.status(400).json({
                        success: false,
                        message: "Les caractéristiques sont invalides"
                    });
                }

            } catch {
                return res.status(400).json({
                    success: false,
                    message: "Format des caractéristiques invalide"
                });
            }

            if (
                !parsedFeatures.every(
                    (feature) => typeof feature === "string"
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Les caractéristiques sont invalides"
                });
            }

            newBien.features = parsedFeatures
                .map((feature) => feature.trim())
                .filter(Boolean);
        } else {
            newBien.features = [];
        }


        // =========================
        // LOCALISATION MAP
        // =========================

        if (localisationMap !== undefined) {

            if (
                localisationMap !== null &&
                typeof localisationMap !== "string"
            ) {
                return res.status(400).json({
                    success: false,
                    message: "La localisation de la carte est invalide"
                });
            }

            newBien.localisationMap =
                localisationMap === null
                    ? null
                    : localisationMap.trim();
        }

        //=========
        //IMAGES

let uploadedImages = [];

if (
    req.files &&
    Array.isArray(req.files) &&
    req.files.length > 0
) {

    uploadedImages = await Promise.all(
        req.files.map(uploadImage)
    );

}


        // =========================
        // CREATE BIEN
        // =========================

        const createdBien = await prisma.bien.create({

            data: {

                ...newBien,

                images: {
                    create: uploadedImages.map((image) => ({
                        url: image.url,
                        publicId: image.publicId
                    }))
                }

            },

            include: {
                images: true
            }

        });

        // =========================
        // RESPONSE
        // =========================

        await notifyAdmins({
            title: "Nouveau bien ajouté",
            message: `Le bien "${createdBien.nom}" a été ajouté au catalogue.`,
            type: "NEW_BIEN"
        });

        return res.status(201).json({
            success: true,
            message: "Bien ajouté avec succès",
            data: createdBien
        });

    } catch (error) {
        next(error);
    }
};



export const deleteBien = async (req, res, next) => {

    try {

        const bienId = req.params.id;


        // =========================
        // RECUPERER LE BIEN
        // =========================

        const bien = await prisma.bien.findUnique({
            where: {
                id: bienId
            },
            include: {
                images: true
            }
        });


        if (!bien) {

            return res.status(404).json({
                success: false,
                message: "Bien introuvable"
            });

        }


        // =========================
        // SUPPRIMER LES IMAGES
        // DE CLOUDINARY
        // =========================

        if (bien.images.length > 0) {

            for (const image of bien.images) {

                await deleteImage(image.publicId);

            }

        }


        // =========================
        // SUPPRIMER LE BIEN
        // =========================
        // Grâce à onDelete: Cascade,
        // les BienImage seront également
        // supprimées de PostgreSQL.

        const deletedBien = await prisma.bien.delete({
            where: {
                id: bienId
            }
        });


        // =========================
        // RESPONSE
        // =========================

        return res.status(200).json({

            success: true,

            message: "Bien supprimé avec succès",

            data: deletedBien.id

        });


    } catch (error) {

        next(error);

    }

};
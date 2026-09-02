import { cloudinary } from "../config/env.js";
import prisma from "../config/prisma.js";


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
        // AUCUNE MODIFICATION
        // =========================

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Aucune modification fournie"
            });
        }


      
// =========================
// IMAGES
// =========================

let finalImages = bien.images;

// Anciennes images conservées envoyées depuis le front
if (req.body.oldImages !== undefined) {
    try {
        const oldImages = JSON.parse(req.body.oldImages);

        if (!Array.isArray(oldImages)) {
            return res.status(400).json({
                success: false,
                message: "Le format des anciennes images est invalide"
            });
        }

        if (!oldImages.every(image => typeof image === "string")) {
            return res.status(400).json({
                success: false,
                message: "Les anciennes images sont invalides"
            });
        }

        finalImages = oldImages;

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Impossible de lire les anciennes images"
        });
    }
}


// Nouvelles images uploadées
if (
    req.files &&
    Array.isArray(req.files) &&
    req.files.length > 0
) {
    const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "Immob"
                },
                (error, result) => {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(result.secure_url);
                    }

                }
            );

            stream.end(file.buffer);
        });
    });

    const results = await Promise.all(uploadPromises);

    finalImages = [
        ...finalImages,
        ...results
    ];
}


// Toujours mettre à jour images si oldImages
// ou de nouvelles images ont été envoyées
if (
    req.body.oldImages !== undefined ||
    (req.files && req.files.length > 0)
) {
    updates.images = finalImages;
}
 
            


        // =========================
        // UPDATE
        // =========================

        const updatedBien = await prisma.bien.update({
            where: {
                id: bienId
            },
            data: updates
        });


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


        // =========================
        // IMAGES
        // =========================

        let imageUrls = [];

        if (
            req.files &&
            Array.isArray(req.files) &&
            req.files.length > 0
        ) {

            const uploadPromises = req.files.map(
                (file) =>
                    new Promise((resolve, reject) => {

                        const stream =
                            cloudinary.uploader.upload_stream(
                                {
                                    folder: "Immob"
                                },
                                (error, result) => {

                                    if (error) {
                                        reject(error);
                                    } else {
                                        resolve(result.secure_url);
                                    }

                                }
                            );

                        stream.end(file.buffer);
                    })
            );

            imageUrls = await Promise.all(uploadPromises);
        }

        newBien.images = imageUrls;


        // =========================
        // CREATE BIEN
        // =========================

        const createdBien = await prisma.bien.create({
            data: newBien
        });


        // =========================
        // RESPONSE
        // =========================

        return res.status(201).json({
            success: true,
            message: "Bien ajouté avec succès",
            data: createdBien
        });

    } catch (error) {
        next(error);
    }
};



export const deleteBien = async(req, res, next) => {

    try{

        const bienId = req.params.id;

        const bien = await prisma.bien.findUnique({
            where : {
                id : bienId
            }
        });

        if(!bien){

            return res.status(404).json({
                success: false,
                message: "Error bien not found"
            }) ;
        }

        const deletedBien = await prisma.bien.delete({
            where : {
                id : bienId
            }
        });

        return res.status(200).json({
            success : true,
            message : "Bien deleted successfully",
            data : deletedBien.id
        })

    }catch(err){
        next(err);
    }
}
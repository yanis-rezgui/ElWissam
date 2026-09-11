import prisma from "../config/prisma.js";
import {
    uploadImage,
    deleteImage
} from "../services/cloudinary.service.js";



export const getAllCommunes = async(req , res , next) => {

    try{

       
        const { page = 1,
            limit = 10,active,
             name} = req.query;
    
        const where = {};

        if(active === "true" || active === "false"){
            where.active = active === "true";
        }

        if (name && name.trim() !== "") {
    where.name = {
        contains: name.trim(),
        mode: "insensitive",
    };
}

        const currentPage = Math.max(Number(page) || 1, 1);

        const pageLimit = Math.min(
            Math.max(Number(limit) || 10, 1),
            50
        );

        const skip = (currentPage - 1) * pageLimit;

        const allCommunes = await prisma.commune.findMany({
           where,
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

        const total = await prisma.commune.count();

        const totalPages = Math.ceil(total / pageLimit);

        const totalActive = await prisma.commune.count({
            where : {
                active : true
            }
        });
        const totalNotActive = await prisma.commune.count({
            where : {
                active : false
            }
        });
        
        return res.status(200).json({
           success: true,
           message: "Communes fetched successfully",
           data : {
            communes : allCommunes,
            total,
            totalActive,
            totalNotActive,
            pagination: {
                page: currentPage,
                limit: pageLimit,
                total,
                totalPages,
            },
           }
        })
    }catch(err){
        console.error(err);
    }
}


export const clientCommunes = async(req, res, next) => {

    try{

        const communes = await prisma.commune.findMany({
            where : {
                active : true
            }
        });

        return res.status(200).json({
            success : true,
            message : "Client communes fetched successfully",
            data: communes
        });
    }catch(err){
        next(err);
    }
}


// ============================================================
// CREATE COMMUNE
// ============================================================

export const createCommune = async (req, res, next) => {
    try {

        const {
            name,
            active
        } = req.body;


        // =========================
        // NAME
        // =========================

        if (
            name === undefined ||
            typeof name !== "string" ||
            name.trim() === ""
        ) {
            return res.status(400).json({
                success: false,
                message: "Le nom de la commune est requis"
            });
        }


        // =========================
        // ACTIVE
        // =========================

        let activeValue = true;

        if (active !== undefined) {

            activeValue =
                typeof active === "string"
                    ? active === "true"
                    : active;

            if (typeof activeValue !== "boolean") {
                return res.status(400).json({
                    success: false,
                    message: "La valeur de active est invalide"
                });
            }
        }


        // =========================
        // IMAGE
        // =========================

        let uploadedImage = null;

        if (req.file) {

            uploadedImage = await uploadImage(req.file);

        }


        // =========================
        // CREATE COMMUNE
        // =========================

        const createdCommune = await prisma.commune.create({
            data: {
                name: name.trim(),
                active: activeValue,

                imageUrl: uploadedImage
                    ? uploadedImage.url
                    : null,

                imagePublicId: uploadedImage
                    ? uploadedImage.publicId
                    : null,
            }
        });


        // =========================
        // RESPONSE
        // =========================

        return res.status(201).json({
            success: true,
            message: "Commune créée avec succès",
            data: createdCommune
        });

    } catch (error) {
        next(error);
    }
};




// ============================================================
// UPDATE COMMUNE
// ============================================================


export const updateCommune = async (req, res, next) => {
    try {

        const communeId = req.params.id;


        // =========================
        // FIND COMMUNE
        // =========================

        const commune = await prisma.commune.findUnique({
            where: {
                id: communeId
            }
        });


        if (!commune) {
            return res.status(404).json({
                success: false,
                message: "Commune introuvable"
            });
        }


        const updates = {};

        const {
            name,
            active
        } = req.body;


        // =========================
        // NAME
        // =========================

        if (name !== undefined) {

            if (
                typeof name !== "string" ||
                name.trim() === ""
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Le nom de la commune est invalide"
                });
            }

            updates.name = name.trim();
        }


        // =========================
        // ACTIVE
        // =========================

        if (active !== undefined) {

            const activeValue =
                typeof active === "string"
                    ? active === "true"
                    : active;

            if (typeof activeValue !== "boolean") {
                return res.status(400).json({
                    success: false,
                    message: "La valeur de active est invalide"
                });
            }

            updates.active = activeValue;
        }


        // =========================
        // IMAGE
        // =========================

        if (req.file) {

            // --------------------------------
            // 1. Upload nouvelle image
            // --------------------------------

            const uploadedImage = await uploadImage(req.file);


            // --------------------------------
            // 2. Supprimer ancienne image
            // --------------------------------

            if (commune.imagePublicId) {

                await deleteImage(commune.imagePublicId);

            }


            // --------------------------------
            // 3. Update image data
            // --------------------------------

            updates.imageUrl = uploadedImage.url;
            updates.imagePublicId = uploadedImage.publicId;
        }


        // =========================
        // CHECK MODIFICATIONS
        // =========================

        if (Object.keys(updates).length === 0) {

            return res.status(400).json({
                success: false,
                message: "Aucune modification fournie"
            });

        }


        // =========================
        // UPDATE DATABASE
        // =========================

        const updatedCommune = await prisma.commune.update({
            where: {
                id: communeId
            },
            data: updates
        });


        // =========================
        // RESPONSE
        // =========================

        return res.status(200).json({
            success: true,
            message: "Commune mise à jour avec succès",
            data: updatedCommune
        });

    } catch (error) {
        next(error);
    }
};


// ============================================================
// DELETE COMMUNE
// ============================================================

export const deleteCommune = async (req, res, next) => {
    try {

        const communeId = req.params.id;


        // =========================
        // FIND COMMUNE
        // =========================

        const commune = await prisma.commune.findUnique({
            where: {
                id: communeId
            }
        });


        if (!commune) {
            return res.status(404).json({
                success: false,
                message: "Commune introuvable"
            });
        }


        // =========================
        // DELETE CLOUDINARY IMAGE
        // =========================

        if (commune.imagePublicId) {

            await deleteImage(commune.imagePublicId);

        }


        // =========================
        // DELETE DATABASE
        // =========================

        const deletedCommune = await prisma.commune.delete({
            where: {
                id: communeId
            }
        });


        // =========================
        // RESPONSE
        // =========================

        return res.status(200).json({
            success: true,
            message: "Commune supprimée avec succès",
            data: deletedCommune.id
        });

    } catch (error) {
        next(error);
    }
};


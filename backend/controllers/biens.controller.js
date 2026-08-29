import prisma from "../config/prisma.js";

export const getBiens = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            service,
            type,
            prixMin,
            prixMax,
            search
        } = req.query;

        const where = {};

        // =========================
        // FILTRE SERVICE
        // =========================

        if (service && service.trim() !== "") {
            where.service = service;
        }

        // =========================
        // FILTRE TYPE
        // =========================

        if (type && type.trim() !== "") {
            where.type = type;
        }

        // =========================
        // RECHERCHE
        // =========================

        if (search && search.trim() !== "") {
            where.OR = [
                {
                    nom: {
                        contains: search.trim(),
                        mode: "insensitive",
                    },
                },
                {
                    localisation: {
                        contains: search.trim(),
                        mode: "insensitive",
                    },
                },
            ];
        }

        // =========================
        // FILTRE PRIX
        // =========================

        if (prixMin || prixMax) {
            where.prix = {};

            if (prixMin && Number(prixMin) >= 0) {
                where.prix.gte = Number(prixMin);
            }

            if (prixMax && Number(prixMax) >= 0) {
                where.prix.lte = Number(prixMax);
            }
        }

        // =========================
        // PAGINATION
        // =========================

        const currentPage = Math.max(Number(page) || 1, 1);

        const pageLimit = Math.min(
            Math.max(Number(limit) || 10, 1),
            50
        );

        const skip = (currentPage - 1) * pageLimit;

        // =========================
        // RECUPERATION DES BIENS
        // =========================

        const biens = await prisma.bien.findMany({
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

        // =========================
        // TOTAL
        // =========================

        const total = await prisma.bien.count({
            where,
        });

        const totalPages = Math.ceil(total / pageLimit);

        // =========================
        // RESPONSE
        // =========================

        return res.status(200).json({
            success: true,

            data: biens,

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



export const getBien = async(req , res , next) => {

    try{

        const bienId = req.params.id;

        const bien = await prisma.bien.findUnique({
            where : {
                id : bienId
            }
        });

        if(!bien){
            return res.status(404).json({
                success : false,
                message : "Error bien not found"
            });
        }

        return res.status(200).json({
            success : true,
            message : "Bien fetched successfully",
            data : bien
        });
    }catch(err){
        next(err);
    }
}
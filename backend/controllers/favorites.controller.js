import prisma from "../config/prisma.js";

export const toggleFavorites = async (req, res, next) => {

    try {

        const bienId = req.params.id;
        const userId = req.user.id;

        // Vérifier que le bien existe
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

        // Vérifier si le bien est déjà dans les favoris
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                favoris: {
                    where: {
                        id: bienId
                    },
                    select: {
                        id: true
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur introuvable"
            });
        }

        const isFavorite = user.favoris.length > 0;

        // Retirer des favoris
        if (isFavorite) {

            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    favoris: {
                        disconnect: {
                            id: bienId
                        }
                    }
                }
            });

            return res.status(200).json({
                success: true,
                isFavorite: false,
                message: "Bien retiré des favoris"
            });
        }

        // Ajouter aux favoris
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                favoris: {
                    connect: {
                        id: bienId
                    }
                }
            }
        });

        return res.status(200).json({
            success: true,
            isFavorite: true,
            message: "Bien ajouté aux favoris"
        });

    } catch (error) {

        next(error);

    }
};


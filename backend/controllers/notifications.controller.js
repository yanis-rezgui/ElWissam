import prisma from "../config/prisma.js";


export const getAllNotifications = async (req, res, next) => {

    try {

        const {
            read,
            page = 1,
            limit = 10,
        } = req.query;

        const where = {};

        if (read === "true" || read === "false") {
            where.read = read === "true";
        }

        const currentPage = Math.max(Number(page) || 1, 1);

        const pageLimit = Math.min(
            Math.max(Number(limit) || 10, 1),
            50
        );

        const skip = (currentPage - 1) * pageLimit;


        const [allNotifications, total] = await Promise.all([

            prisma.notification.findMany({
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
            }),

            prisma.notification.count({
                where,
            }),

        ]);


        return res.status(200).json({
            success: true,
            message: "Notifications récupérées avec succès",
            data: allNotifications,

            pagination: {
                page: currentPage,
                limit: pageLimit,
                total,
                totalPages: Math.ceil(total / pageLimit),
            },
        });

    } catch (err) {

        next(err);

    }
};


export const markAsRead = async(req, res, next) =>{

    try{

        const notificationId = req.params.id;
        const notification = await prisma.notification.update({
            where : {
                id : notificationId
            },
            data : {
                read : true
            }
        });

        return res.status(200).json({
            success : true,
            message : "Notification marqué comme lu",
            data : notification,
            
        });

    }catch(err){
        next(err);
    }
}


export const markAllAsRead = async (req, res, next) => {

    try {

        const result = await prisma.notification.updateMany({

            where: {
                read: false,
            },

            data: {
                read: true,
            },

        });


        return res.status(200).json({
            success: true,
            message: "All notifications marked as read",
            data: {
                updatedCount: result.count
            }
        });

    } catch (err) {

        next(err);

    }
};


export const getNotificationsStats = async (req, res, next) => {

    try {

        const [
            totalNotifications,
            unreadNotifications,
            readNotifications
        ] = await Promise.all([

            prisma.notification.count(),

            prisma.notification.count({
                where: {
                    read: false,
                },
            }),

            prisma.notification.count({
                where: {
                    read: true,
                },
            }),

        ]);


        return res.status(200).json({
            success: true,
            message: "Statistiques des notifications récupérées avec succès",
            data: {
                total: totalNotifications,
                unread: unreadNotifications,
                read: readNotifications,
            },
        });

    } catch (err) {

        next(err);

    }
};


import prisma from "../config/prisma.js";

export const notifyAdmins = async ({
    title,
    message,
    type
}) => {

    const admins = await prisma.user.findMany({
        where: {
            role: "ADMIN"
        },
        select: {
            id: true
        }
    });

    await prisma.notification.createMany({
        data: admins.map((admin) => ({
            title,
            message,
            type,
            userId: admin.id
        }))
    });
};
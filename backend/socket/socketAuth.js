import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { JWT_SECRET } from "../config/env.js";

const socketAuth = async (socket, next) => {

    try {

        const token = socket.handshake.auth?.token;

        if (!token) {
            return next(new Error("Unauthorized"));
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        });

        if (!user) {
            return next(new Error("Unauthorized"));
        }

        socket.user = user;

        next();

    } catch (error) {

        console.error("Socket authentication error:", error);

        next(new Error("Unauthorized"));
    }
};

export default socketAuth;
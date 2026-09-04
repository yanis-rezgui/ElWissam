import prisma from "../config/prisma.js"
import bcrypt from "bcrypt"


export const getAllUsers = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            role
        } = req.query;

        const where = {};

        // =========================
        // RECHERCHE
        // =========================

        if (search && search.trim() !== "") {
            where.OR = [
                {
                    firstName: {
                        contains: search.trim(),
                        mode: "insensitive",
                    },
                },
                {
                    lastName: {
                        contains: search.trim(),
                        mode: "insensitive",
                    },
                },
                {
                    email: {
                        contains: search.trim(),
                        mode: "insensitive",
                    },
                },
            ];
        }

        // =========================
        // FILTRE ROLE
        // =========================

        if (
            role &&
            ["ADMIN", "USER"].includes(role.trim())
        ) {
            where.role = role.trim();
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
        // RECUPERATION DES USERS
        // =========================

        const users = await prisma.user.findMany({
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

            // IMPORTANT :
            // On ne renvoie jamais le password
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });

        // =========================
        // TOTAL
        // =========================

        const total = await prisma.user.count({
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

            message: "Users got successfully",

            data: users,

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

export const updateUser = async(req , res , next) => {

    try{

        const userId = req.params.id;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if(!user){
            return res.status(404).json({
                success : false,
                message : "Error user not found",
            
            });
        }

        const {firstName, lastName, role}= req.body;

        const where = {}

        if(firstName && firstName.trim() !== ""){
            where.firstName = firstName.trim();
        }

        if(lastName && lastName.trim() !== ""){
            where.lastName = lastName.trim();
        }

        if(role && ["ADMIN", "USER"].includes(role.trim())){
            where.role = role.trim();
        }

        const updatedUser = await prisma.user.update({
            where : {
                id : userId
            },
            data :where
        });

        return res.status(200).json({
            success : true,
            message: "User updated successfully"
        });
        

    }catch(err){
        next(err);
    }
}


export const addUser = async(req , res , next) => {

    try{

        const {firstName, lastName, role, email, password1, password2} = req.body;

        

        if(!firstName || firstName.trim() === ""){
            return res.status(400).json({
                success : false,
                message : "Le prénom est requis"
            });
        }

        if(!lastName || lastName.trim() === ""){
            return res.status(400).json({
                success : false,
                message : "Le nom de famille est requis"
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!email || !emailRegex.test(email)){
            return res.status(400).json({
                success : false,
                message : "Error email not found"
            });
        }

        const existingUser = await prisma.user.findFirst({
            where : {
                email
            }
        });

        if(existingUser){
            return res.status(409).json({
                success : false,
                message : "Utilisateur deja existants"
            })
        }

        if(!role || !["ADMIN", "USER"].includes(role.trim())){
            return res.status(400).json({
                success : true,
                message : "Erreure le role doit etre soit 'USER' ou 'ADMIN'"
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(password1 !== password2){
            return res.status(400).json({
                success : false,
                message : "Mots de passes incompatiblent"
            })
        }

        if(!password1 || !passwordRegex.test(password1)){
            return res.status(400).json({
                success : false,
                message : "Le mot de passe doit avoir une longeur de 8 caracteres minimum, et contenir en moins une majuscule, un chiffre et un signe(?,!..)"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password1, salt);

        const newUser = await prisma.user.create({
            data : {
            firstName : firstName.trim(),
            lastName : lastName.trim(),
            email : email.trim(),
            role : role.trim(),
            password : hashedPassword}
        });

        return res.status(201).json({
            success : true,
            message : "User created successfully"
        });
    }catch(err){
        next(err);
    }
}


export const deleteUser = async(req, res , next) => {

    try{

        const userId = req.params.id;

        const user = await prisma.user.findUnique({
            where : {
                id : userId
            }
        });

        if(!user){
            return res.status(404).json({
                success : false,
                message : "Error user not found"
            });
        }

        await prisma.user.delete({
            where: {
                id: userId
            }
        });

        return res.status(200).json({
            success : true,
            message: "user deleted successfully"
        });
    }catch(err){
        next(err);
    }
}
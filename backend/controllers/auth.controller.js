import { Role } from "@prisma/client";
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken"



export const signUp = async(req , res , next) => {

    try{

        const {firstName, lastName, email, password1, password2} = req.body;

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
            firstName,
            lastName,
            email,
            password : hashedPassword}
        });

         const token = jwt.sign({userId : newUser.id}, JWT_SECRET, {expiresIn : JWT_EXPIRES_IN});

        const userResponse = {
            id : newUser.id,
            firstName : newUser.firstName,
            lastName : newUser.lastName,
            email : newUser.email,
            role : newUser.role,
            createdAt : newUser.createdAt,
            updatedAt : newUser.updatedAt
        }

        return res.status(201).json({
            success : false,
            message: "user created successfully",
            data : {
                token,
                userResponse
            }
        });

    }catch(err){
        next(err);
    }
}



export const signIn = async(req, res, next) => {

    try{

        const {email, password} = req.body;

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!email || !emailRegex.test(email)){
            return res.status(400).json({
                success : false,
                message : "Error email not found"
            });
        }

        const existingUser = await prisma.user.findUnique({
            where : {
                email
            }
        });

        if(!existingUser){
            return res.status(404).json({
                success : false,
                message : "Erreure utilisateur introuvable"
            });
        }

        const isValidPassword = await bcrypt.compare(password, existingUser.password);

        if(!isValidPassword){
            return res.status(400).json({
                success : false,
                message : "Erreure mot de passe invalide"
            });
        }

        const token = jwt.sign({userId : existingUser.id}, JWT_SECRET, {expiresIn : JWT_EXPIRES_IN});

         const userResponse = {
            id : existingUser.id,
            firstName : existingUser.firstName,
            lastName : existingUser.lastName,
            email : existingUser.lastName,
            role : existingUser.role,
            createdAt : existingUser.createdAt,
            updatedAt : existingUser.updatedAt
        }

        return res.status(201).json({
            success : false,
            message: "user signed In successfully",
            data : {
                token,
                userResponse
            }
        });


    }catch(err){
        next(err);
    }
}


export const signOut = async(req, res, next) => {

    try{
        res.status(200).json({
            success : true,
            message : "User signed out successfully"
        });
    }catch(err){
        next(err);
    }
}



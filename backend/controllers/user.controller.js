import prisma from "../config/prisma.js";
import bcrypt from "bcrypt"


export const getCurrentUser = async(req , res , next) => {

    try{

        const user = req.user;

        if(!user){
            return res.status(404).json({
                success : false,
                message : "Error user not found"
            });
        }

        const userResponse = {
            id : user.id,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            role : user.role,
            createdAt : user.createdAt,
            updatedAt : user.updatedAt
        }

        return res.status(200).json({
            success : true,
            message : "user fetched successfully",
            data : userResponse
        });

    }catch(err){
        next(err);
    }
}


export const updateUserInfo = async(req , res , next) => {

    try{

        const user = req.user;

        if(!user){
            return res.status(400).json({
                success : false,
                message : "Error user not found"
            });
        }

        const {firstName, lastName} = req.body;

        if(!firstName || firstName === ""){
            return res.status(400).json({
                success : false,
                message : "firstName is required"
            })
        }

        if(!lastName || lastName.trim() === ""){
            return res.status(400).json({
                success : false,
                message: "Error lastName is required"
            });
        }

        const updatedUser = await prisma.user.update({
            where : {
                id : user.id
            },
            data : {
                firstName : firstName.trim(),
                lastName : lastName.trim()
            }
        });

        const userResponse = {
            id : updatedUser.id,
            firstName : updatedUser.firstName,
            lastName : updatedUser.lastName,
            email : updatedUser.email,
            role : updatedUser.role,
            createdAt : updatedUser.createdAt,
            updatedAt : updatedUser.updatedAt
        }

        return res.status(200).json({
            success : true,
            message : "User updated",
            data : userResponse
        });


    }catch(err){
        next(err);
    }
}


export const updatePassword = async(req, res, next) => {

    try{

        const user = req.user;

        if(!user){
            return res.status(404).json({
                success : false,
                message: "Error user not found",
            });
        }

        const {oldPassword, newPassword1, newPassword2} = req.body;

        const isValidOldPassword = await bcrypt.compare(oldPassword, user.password)

        if(!isValidOldPassword){
            return res.status(400).json({
                success : false,
                message : "L'ancien mot de passe est incorrect."
            });
        }

        if(newPassword1 != newPassword2){
            return res.status(400).json({
                success: false,
                message : "Mot de passe de confirmation invalide"
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(!newPassword1 || !passwordRegex.test(newPassword1)){
            return res.status(400).json({
                success : false,
                message : "Le mot de passe doit avoir une longeur de 8 caracteres minimum, et contenir en moins une majuscule, un chiffre et un signe(?,!..)"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword1, salt);

        const updatedUser = await prisma.user.update({
            where : {
                id : user.id
            },
            data : {
                password : hashedPassword
            }
        })

        return res.status(200).json({
            success : true,
            message : "Mot de passe modifier avec succes"
        });

    }catch(err){
        next(err);
    }
}
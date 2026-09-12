import crypto from "crypto";
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import sendEmail from "../services/sendEmail.js";
import { CLIENT_URL } from "../config/env.js";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


// ============================================================
// FORGOT PASSWORD
// POST /api/v1/auth/forgot-password
// ============================================================

export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email || typeof email !== "string" || email.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "L'email est requis"
            });
        }

        const user = await prisma.user.findUnique({
            where: { email: email.trim().toLowerCase() }
        });

        // Réponse identique que le compte existe ou non (anti énumération d'emails)
        if (!user) {
            return res.status(200).json({
                success: true,
                message: "Si un compte existe, un lien de réinitialisation a été envoyé."
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        const resetExpires = new Date(Date.now() + 15 * 60 * 1000);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                passwordResetToken: hashedToken,
                passwordResetExpires: resetExpires
            }
        });

        const resetUrl = `${CLIENT_URL}/reset-password/${resetToken}`;

        try {
            await sendEmail({
                to: user.email,
                subject: "Réinitialisation de votre mot de passe - El Ahlem",
                html: `
                    <h2>Réinitialisation du mot de passe</h2>
                    <p>Vous avez demandé la réinitialisation du mot de passe de votre compte.</p>
                    <p>Cliquez sur le lien ci-dessous (valide 15 minutes) :</p>
                    <a href="${resetUrl}">Réinitialiser mon mot de passe</a>
                    <p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
                `
            });
        } catch (emailErr) {
            // Si l'envoi échoue, on annule le token pour ne pas laisser un token actif inutile
            await prisma.user.update({
                where: { id: user.id },
                data: { passwordResetToken: null, passwordResetExpires: null }
            });
            throw emailErr;
        }

        return res.status(200).json({
            success: true,
            message: "Si un compte existe, un lien de réinitialisation a été envoyé."
        });

    } catch (err) {
        next(err);
    }
};


// ============================================================
// RESET PASSWORD
// POST /api/v1/auth/reset-password
// ============================================================

export const resetPassword = async (req, res, next) => {
    try {
        const { token, password1, password2 } = req.body;

        if (!token || !password1 || !password2) {
            return res.status(400).json({
                success: false,
                message: "Tous les champs sont requis"
            });
        }

        if (password1 !== password2) {
            return res.status(400).json({
                success: false,
                message: "Mots de passe incompatibles"
            });
        }

        if (!passwordRegex.test(password1)) {
            return res.status(400).json({
                success: false,
                message: "Le mot de passe doit avoir une longeur de 8 caracteres minimum, et contenir en moins une majuscule, un chiffre et un signe(?,!..)"
            });
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await prisma.user.findFirst({
            where: {
                passwordResetToken: hashedToken,
                passwordResetExpires: { gt: new Date() }
            }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Token invalide ou expiré"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password1, salt);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetExpires: null
            }
        });

        return res.status(200).json({
            success: true,
            message: "Mot de passe réinitialisé avec succès"
        });

    } catch (err) {
        next(err);
    }
};
import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 8,
    message: {
        success: false,
        message: "Trop de tentatives de connexion. Veuillez réessayer plus tard."
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true, // ne compte que les échecs
});

export const signUpLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 5,
    message: {
        success: false,
        message: "Trop de comptes créés depuis cette adresse IP. Veuillez réessayer plus tard."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const passwordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: {
        success: false,
        message: "Trop de demandes. Veuillez réessayer plus tard."
    },
    standardHeaders: true,
    legacyHeaders: false,
});
import rateLimit from "express-rate-limit";

const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 300,                // 300 requêtes / IP / 15 min
    message: {
        success: false,
        message: "Trop de requêtes. Veuillez réessayer plus tard."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default globalRateLimiter;
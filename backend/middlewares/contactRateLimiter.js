// middleware/contactRateLimiter.ts

import rateLimit from "express-rate-limit";

const contactRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5,                 // maximum 5 requêtes
    message: {
        success: false,
        message: "Trop de demandes. Veuillez réessayer plus tard."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default contactRateLimiter;
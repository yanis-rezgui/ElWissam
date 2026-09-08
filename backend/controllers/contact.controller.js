
import {
    CONTACT_EMAIL
} from "../config/env.js";
import sendEmail from "../services/sendEmail.js";

const contactUs = async (req, res, next) => {

    try {

        const { nom, email, telephone, objet, message } = req.body;

        // =========================
        // VALIDATION
        // =========================

        if (!nom || nom.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Le nom est requis"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Une adresse email valide est requise"
            });
        }

        if (
            !telephone ||
            telephone.trim() === "" ||
            telephone.length !== 10 ||
            !/^\d{10}$/.test(telephone)
        ) {
            return res.status(400).json({
                success: false,
                message: "Le numéro de téléphone doit contenir 10 chiffres"
            });
        }

        if (!objet || objet.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "L'objet est requis"
            });
        }

        if (!message || message.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Le message est requis"
            });
        }


        // =========================
        // ENVOI DE L'EMAIL
        // =========================

        try {

            await sendEmail({
                to: CONTACT_EMAIL,
                subject: `Nouveau message de contact : ${objet}`,

                html: `
                    <h2>Nouveau message depuis le site immobilier</h2>

                    <p>
                        Vous avez reçu un nouveau message depuis
                        le formulaire de contact.
                    </p>

                    <hr>

                    <h3>Informations du client</h3>

                    <p>
                        <strong>Nom :</strong> ${nom}
                    </p>

                    <p>
                        <strong>Email :</strong> ${email}
                    </p>

                    <p>
                        <strong>Téléphone :</strong> ${telephone}
                    </p>

                    <p>
                        <strong>Objet :</strong> ${objet}
                    </p>

                    <hr>

                    <h3>Message</h3>

                    <p>
                        ${message}
                    </p>

                    <hr>

                    <p>
                        Message envoyé depuis le site immobilier.
                    </p>
                `,

                replyTo: email
            });

        } catch (emailErr) {

            console.error(
                "Erreur lors de l'envoi de l'email :",
                emailErr
            );

            return res.status(500).json({
                success: false,
                message: "Impossible d'envoyer le message. Veuillez réessayer plus tard."
            });
        }

        // =========================
        // SUCCESS
        // =========================

        return res.status(200).json({
            success: true,
            message: "Votre message a été envoyé avec succès."
        });

    } catch (error) {

        next(error);

    }
};

export default contactUs;
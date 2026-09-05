import prisma from "../config/prisma.js"



export const getAgencyInformation = async(req , res , next) => {

    try{

        const agency = await prisma.agency.findUnique({
            where : {
                id : 1
            }
        });

        if(!agency){
            return res.status(404).json({
                success : false,
                message : "Error agency not found"
            });
        }

        return res.status(200).json({
            success : true,
            message : "Agency found successfully",
            data : agency
        });
    }catch(err){
        next(err);
    }
}


export const updateAgency = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      mapsUrl,
      socialLinks,
    } = req.body;

    // =========================
    // Validation du nom
    // =========================

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Erreur : le nom de l'agence est requis",
      });
    }

    // =========================
    // Validation des téléphones
    // =========================

    if (
      !Array.isArray(phone) ||
      phone.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Erreur : au moins un numéro de téléphone est requis",
      });
    }

    for (const number of phone) {
      if (typeof number !== "string") {
        return res.status(400).json({
          success: false,
          message: "Erreur : les numéros de téléphone doivent être des chaînes de caractères",
        });
      }

      if (number.trim().length < 10) {
        return res.status(400).json({
          success: false,
          message:
            "Erreur : chaque numéro de téléphone doit contenir au minimum 10 caractères",
        });
      }
    }

    // =========================
    // Validation de l'email
    // =========================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Erreur : le mail doit respecter le format nom@nom.domaine",
      });
    }

    // =========================
    // Validation de l'adresse
    // =========================

    if (
      !address ||
      typeof address !== "string" ||
      address.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Erreur : l'adresse du bureau est requise",
      });
    }

    // =========================
    // Validation de mapsUrl
    // =========================

    if (mapsUrl !== null && mapsUrl !== undefined) {
      if (typeof mapsUrl !== "string") {
        return res.status(400).json({
          success: false,
          message: "Erreur : le lien Google Maps est invalide",
        });
      }
    }

    // =========================
    // Validation des réseaux sociaux
    // =========================

    if (socialLinks !== null && socialLinks !== undefined) {
      if (!Array.isArray(socialLinks)) {
        return res.status(400).json({
          success: false,
          message: "Erreur : les réseaux sociaux doivent être un tableau",
        });
      }

      for (const social of socialLinks) {
        if (
          !social ||
          typeof social !== "object" ||
          typeof social.name !== "string" ||
          typeof social.url !== "string"
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Erreur : chaque réseau social doit contenir un nom et une URL",
          });
        }

        if (
          social.name.trim() === "" ||
          social.url.trim() === ""
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Erreur : le nom et l'URL d'un réseau social ne peuvent pas être vides",
          });
        }
      }
    }

    // =========================
    // Vérifier que l'agence existe
    // =========================

    const existingAgency = await prisma.agency.findUnique({
      where: {
        id: 1,
      },
    });

    if (!existingAgency) {
      return res.status(404).json({
        success: false,
        message: "Erreur : agence introuvable",
      });
    }

    // =========================
    // Mise à jour
    // =========================

    const updatedAgency = await prisma.agency.update({
      where: {
        id: 1,
      },
      data: {
        name: name.trim(),
        phone: phone.map((number) => number.trim()),
        email: email.trim(),
        address: address.trim(),
        mapsUrl: mapsUrl?.trim() || null,
        socialLinks: socialLinks || [],
      },
    });

    return res.status(200).json({
      success: true,
      message: "Informations de l'agence mises à jour avec succès",
      data: updatedAgency,
    });
  } catch (err) {
    next(err);
  }
};


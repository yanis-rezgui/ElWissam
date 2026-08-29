import prisma from "../config/prisma.js";

const seedDatabase = async () => {
  try {
    // Supprimer les données dépendantes avant les biens
    await prisma.demandeVisite.deleteMany();

    // Supprimer tous les biens
    await prisma.bien.deleteMany();

    console.log("Anciennes données supprimées.");

    // ============================================================
    // 1. TERRAIN - OUled Fayet 
    // ============================================================

    const terrain = await prisma.bien.create({
      data: {
        nom: "Terrain viabilisé à Ouled Fayet",

        description: `
Agence immobilière El Ahlem met en vente un terrain de 155 m² plat et viabilisé,
situé à Ouled Fayet.

Le terrain dispose de l'électricité, de l'eau et du gaz.
Les documents disponibles sont le livret foncier et l'acte notarié.
        `.trim(),

        prix: 20_000_000,

        negociable: false,

        statut: "DISPONIBLE",

        localisation: "Ouled Fayet, Alger",

        superficie: 155,

        type: "TERRAIN",

        service: "VENTE",

        features: [
          "Électricité",
          "Eau",
          "Gaz",
          "Livret foncier",
          "Acte notarié",
          "Terrain plat",
          "Terrain viabilisé",
        ],

        localisationMap:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.343052421832!2d2.9175495773703224!3d36.73833596378352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fa548e0bf2ed9%3A0xa1a8174b7e3ccadd!2sOuled%20Fayet!5e0!3m2!1sfr!2sdz!4v1787759356344!5m2!1sfr!2sdz",

        images: [
          "https://res.cloudinary.com/dub4fhabm/image/upload/v1787758875/642422399_1878302983113703_7276018434441353784_n_owoonm.jpg",

          "https://res.cloudinary.com/dub4fhabm/image/upload/v1787758887/643878590_1878303036447031_286691485999065310_n_dq3fjw.jpg",

          "https://res.cloudinary.com/dub4fhabm/image/upload/v1787758897/644552585_1878303086447026_1078829010074080177_n_ixgzz6.jpg",
        ],
      },
    });

    console.log(`Terrain créé : ${terrain.nom}`);

    // ============================================================
    // 2. APPARTEMENT F4 - BIRKHADEM
    // ============================================================

    const appartement = await prisma.bien.create({
      data: {
        nom: "Appartement F4 à Birkhadem",

        description: `
Agence immobilière El Ahlem met en vente un F4 à Birkhadem.

L'appartement est bien ensoleillé et bénéficie d'une vue dégagée.
Il est situé dans une résidence gardée avec un accès facile à l'autoroute.

La résidence dispose de plusieurs équipements, notamment une piscine,
une salle de sport, une aire de jeux et un ascenseur.
        `.trim(),

        prix: 36_000_000,

        negociable: false,

        statut: "DISPONIBLE",

        localisation:
          "Résidence La Belle Coline, Bir Khadem, Alger",

        superficie: 144,

        type: "APPARTEMENT",

        service: "VENTE",

        features: [
          "F4",
          "5ème étage",
          "Résidence gardée",
          "Cuisine équipée",
          "Chauffage central",
          "Citerne",
          "Suite parentale",
          "Ascenseur",
          "Piscine",
          "Salle de sport",
          "Aire de jeux",
          "Box de stationnement",
          "Bien ensoleillé",
          "Vue dégagée",
          "Accès facile à l'autoroute",
          "Finition : Fini",
          "Livret foncier",
          "Acte notarié",
        ],

        localisationMap:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.9516275605947!2d3.043025776319185!3d36.699700273357514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad005287e327%3A0xe44f6d695f123bb2!2sR%C3%A9sidence%20la%20belle%20coline.%20Bir%20khadem.%20Alger!5e0!3m2!1sfr!2sdz!4v1787760253302!5m2!1sfr!2sdz",

        images: [],
      },
    });

    console.log(`Appartement créé : ${appartement.nom}`);

    console.log("\n✅ Base de données initialisée avec succès.");
  } catch (error) {
    console.error("\n❌ Erreur lors du seed :", error);
    throw error;
  }
};

export default seedDatabase;
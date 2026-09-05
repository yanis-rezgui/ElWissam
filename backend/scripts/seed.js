import prisma from "../config/prisma.js";

const seedDatabase = async () => {
  try {

    const agency = await prisma.agency.upsert({
  where: {
    id: 1,
  },
  update: {
    name: "El Ahlem",
    phone: ["0550 22 74 73"],
    email: "bouraba.morad@gmail.com",
    address: "Saint Charles, Les vergers, Kouba, Alger",
    mapsUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.57932120943832!2d3.0575804784894007!3d36.72384596490868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad00531ca6f9%3A0x8a985ede982d69fb!2sBureau%20d'affaire%20el%20wissem!5e1!3m2!1sfr!2sdz!4v1788280822640!5m2!1sfr!2sdz",
    socialLinks: [
      {
        name: "Facebook",
        url: "https://www.facebook.com/p/Agence-Alahlem-100028020596416/",
      },
      {
        name: "TikTok",
        url: "https://www.tiktok.com/@agencealahlem?_t=ZM-8wKdmNUWTfa&_r=1",
      },
    ],
  },
  create: {
    id: 1,
    name: "El Ahlem",
    phone: ["0550 22 74 73"],
    email: "bouraba.morad@gmail.com",
    address: "Saint Charles, Les vergers, Kouba, Alger",
    mapsUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.57932120943832!2d3.0575804784894007!3d36.72384596490868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad00531ca6f9%3A0x8a985ede982d69fb!2sBureau%20d'affaire%20el%20wissem!5e1!3m2!1sfr!2sdz!4v1788280822640!5m2!1sfr!2sdz",
    socialLinks: [
      {
        name: "Facebook",
        url: "https://www.facebook.com/p/Agence-Alahlem-100028020596416/",
      },
      {
        name: "TikTok",
        url: "https://www.tiktok.com/@agencealahlem?_t=ZM-8wKdmNUWTfa&_r=1",
      },
    ],
  },
});

console.log("Agency seeded:", agency.name);


    console.log("\n✅ Base de données initialisée avec succès.");
  } catch (error) {
    console.error("\n❌ Erreur lors du seed :", error);
    throw error;
  }
};

export default seedDatabase;
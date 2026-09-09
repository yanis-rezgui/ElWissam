import { memo } from "react";

import { useAgencyAdminContext } from "../AdminContexts/AgencyAdminContext";
import type { Agency } from "../Types/Types";


const legalNoticeSections = (agency: Agency) => [
  {
    id: 1,
    title: "Éditeur du site",
    content: [
      agency.name,
      "Agence immobilière",
      agency.address,
      ...agency.phone.map((phone) => `Téléphone : ${phone}`),
      ...(agency.email ? [`E-mail : ${agency.email}`] : []),
    ],
  },

  {
    id: 2,
    title: "Directeur de la publication",
    content: [
      `Le directeur de la publication du site est le responsable de ${agency.name}.`,
    ],
  },

  {
    id: 3,
    title: "Objet du site",
    content: [
      `Le site ${agency.name} a pour objectif de présenter les services proposés par l'agence, de permettre aux utilisateurs de consulter les biens immobiliers disponibles et de faciliter la prise de contact avec l'agence.`,
      "Les informations présentées sur le site sont fournies à titre informatif et peuvent évoluer en fonction de la disponibilité des biens et de l'activité de l'agence.",
    ],
  },

  {
    id: 4,
    title: "Conception et développement du site",
    content: [
      `Le site internet ${agency.name} a été conçu et développé avec des technologies web modernes, notamment :`,
      "• React",
      "• TypeScript",
      "• Tailwind CSS",
      "• Node.js",
      "• Express.js",
      "• PostgreSQL",
      "• Prisma",
    ],
  },

  {
    id: 5,
    title: "Hébergement",
    content: [
      "Les services d'hébergement et d'infrastructure utilisés pour le fonctionnement du site sont fournis par des prestataires techniques tiers.",
      "Les informations relatives à l'hébergement peuvent être précisées ou mises à jour en fonction de l'infrastructure technique utilisée par le site.",
    ],
  },

  {
    id: 6,
    title: "Propriété intellectuelle",
    content: [
      `L'ensemble des éléments présents sur le site ${agency.name}, notamment les textes, photographies, logos, illustrations, icônes, éléments graphiques, contenus et structure du site, est susceptible d'être protégé par les règles applicables en matière de propriété intellectuelle.`,
      "Toute reproduction, représentation, modification, adaptation ou diffusion, totale ou partielle, des contenus du site sans autorisation préalable est susceptible d'être interdite.",
      "Les marques, logos et contenus appartenant à des tiers restent la propriété de leurs détenteurs respectifs.",
    ],
  },

  {
    id: 7,
    title: "Informations relatives aux biens immobiliers",
    content: [
      "Les informations relatives aux biens présentés sur le site sont communiquées à titre informatif.",
      "Les prix, disponibilités, caractéristiques, photographies et descriptions des biens peuvent être modifiés ou mis à jour sans préavis.",
      "La présence d'un bien sur le site ne garantit pas sa disponibilité au moment de la consultation ou de la prise de contact.",
      "Les utilisateurs sont invités à contacter l'agence afin de vérifier les informations relatives à un bien avant toute démarche ou décision.",
    ],
  },

  {
    id: 8,
    title: "Protection des données personnelles",
    content: [
      `${agency.name} accorde une importance particulière à la protection des données personnelles communiquées par les utilisateurs.`,
      "Les données collectées via les formulaires du site, notamment les demandes de contact et de visite, sont utilisées afin de répondre aux demandes des utilisateurs et d'assurer le suivi de leur projet immobilier.",
      "Les données personnelles sont traitées conformément à la réglementation algérienne applicable en matière de protection des données à caractère personnel.",
      agency.email
        ? `Pour toute question relative au traitement de vos données personnelles, vous pouvez contacter l'agence à l'adresse suivante : ${agency.email}.`
        : "Pour toute question relative au traitement de vos données personnelles, vous pouvez contacter directement l'agence.",
    ],
  },

  {
    id: 9,
    title: "Cookies",
    content: [
      "Le site peut utiliser des cookies ou des technologies similaires nécessaires à son fonctionnement, à l'amélioration de l'expérience utilisateur ou à la mesure de son audience.",
      "Lorsque cela est nécessaire, l'utilisateur peut être informé de l'utilisation de ces technologies et exercer les choix prévus par la réglementation applicable.",
      "L'utilisateur peut également configurer son navigateur afin de limiter ou de supprimer les cookies.",
    ],
  },

  {
    id: 10,
    title: "Responsabilité",
    content: [
      `${agency.name} s'efforce de fournir des informations fiables, exactes et régulièrement mises à jour sur son site.`,
      "Toutefois, l'agence ne peut garantir l'exactitude, l'exhaustivité ou l'actualité de l'ensemble des informations publiées à tout moment.",
      "L'agence ne saurait être tenue responsable des dommages résultant notamment d'une indisponibilité temporaire du site, d'une erreur technique ou de l'utilisation d'informations devenues obsolètes.",
      "Le site peut également contenir des liens vers des services ou sites internet tiers. L'agence n'exerce aucun contrôle sur ces services externes.",
    ],
  },

  {
    id: 11,
    title: "Liens externes",
    content: [
      "Certains liens présents sur le site peuvent rediriger vers des plateformes ou sites internet externes, notamment les réseaux sociaux ou les services de cartographie.",
      "Ces services sont soumis à leurs propres conditions d'utilisation et politiques de confidentialité.",
      `${agency.name} ne peut être tenue responsable du contenu, du fonctionnement ou des pratiques de ces services tiers.`,
    ],
  },

  {
    id: 12,
    title: "Droit applicable",
    content: [
      "Les présentes mentions légales sont soumises au droit algérien.",
      "Tout litige relatif à l'utilisation du site sera soumis aux règles de compétence applicables en Algérie.",
    ],
  },

  {
    id: 13,
    title: "Dernière mise à jour",
    content: [
      "Septembre 2026",
    ],
  },
];



const MentionsLegales = () => {

    const { agency } = useAgencyAdminContext();

    const sections = legalNoticeSections(agency);

    return (
        <>
            <section className="min-h-screen flex flex-col w-full items-center bg-gray-100 px-5">

                <div className="w-full max-w-[1000px] py-16">

                    <h1 className="text-[2.2em] font-bold text-[#222344]">
                        Mentions légales
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Informations légales relatives au site internet de {agency.name}.
                    </p>

                    <div className="flex flex-col mt-12">

                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className="mb-10"
                            >

                                <h2 className="text-2xl font-bold text-[#222344] mb-4">
                                    {section.title}
                                </h2>

                                <div className="flex flex-col gap-2">

                                    {section.content.map((paragraph, index) => (
                                        <p
                                            key={index}
                                            className="text-gray-700 leading-7 whitespace-pre-line"
                                        >
                                            {paragraph}
                                        </p>
                                    ))}

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </section>

           
        </>
    );
};

export default memo(MentionsLegales);


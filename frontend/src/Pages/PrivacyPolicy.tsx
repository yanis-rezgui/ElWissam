
import { memo } from "react";
import { useAgencyAdminContext } from "../AdminContexts/AgencyAdminContext";
import type { Agency } from "../Types/Types";


const privacyPolicySections = (agency: Agency) => [
  {
    id: 1,
    title: "Politique de confidentialité",
    content: [
      `La présente politique de confidentialité explique comment ${agency.name} collecte, utilise, conserve et protège les données à caractère personnel communiquées par les utilisateurs de son site internet.`,
      `${agency.name} accorde une importance particulière à la protection de la vie privée et s'engage à traiter les données personnelles conformément à la réglementation algérienne applicable en matière de protection des données à caractère personnel.`,
      "Dernière mise à jour : Septembre 2026.",
    ],
  },

  {
    id: 2,
    title: "1. Responsable du traitement",
    content: [
      `Le responsable du traitement des données collectées via le site est ${agency.name}.`,
      agency.address,
      ...agency.phone.map((phone) => `Téléphone : ${phone}`),
      ...(agency.email ? [`E-mail : ${agency.email}`] : []),
    ],
  },

  {
    id: 3,
    title: "2. Données collectées",
    content: [
      "Selon les fonctionnalités que vous utilisez sur le site, différentes catégories de données peuvent être collectées :",
      "• Nom et prénom.",
      "• Adresse e-mail.",
      "• Numéro de téléphone.",
      "• Informations communiquées dans les messages et demandes de contact.",
      "• Informations relatives aux demandes de visite d'un bien.",
      "• Données relatives à votre compte utilisateur.",
      "• Informations concernant vos biens favoris.",
      "• Données techniques nécessaires au fonctionnement et à la sécurité du site.",
      "Nous ne collectons que les informations nécessaires au fonctionnement des services proposés et au traitement de vos demandes.",
    ],
  },

  {
    id: 4,
    title: "3. Comment vos données sont-elles collectées ?",
    content: [
      "Les données personnelles peuvent notamment être collectées lorsque vous :",
      "• Créez un compte utilisateur.",
      "• Envoyez une demande via le formulaire de contact.",
      "• Demandez une visite pour un bien immobilier.",
      "• Utilisez les fonctionnalités liées à votre compte.",
      "• Ajoutez ou consultez des biens dans vos favoris.",
      "• Échangez directement avec l'agence par l'intermédiaire des informations de contact présentes sur le site.",
    ],
  },

  {
    id: 5,
    title: "4. Finalités du traitement",
    content: [
      "Les données personnelles collectées sont utilisées notamment pour :",
      "• Créer et gérer votre compte utilisateur.",
      "• Répondre à vos demandes de contact.",
      "• Traiter et suivre vos demandes de visite.",
      "• Vous permettre de gérer vos biens favoris.",
      "• Vous contacter concernant une demande que vous avez effectuée.",
      "• Assurer le fonctionnement et la sécurité du site.",
      "• Gérer les notifications liées à votre compte et à vos demandes.",
      "• Améliorer les services et l'expérience utilisateur.",
      "• Respecter les obligations légales applicables.",
    ],
  },

  {
    id: 6,
    title: "5. Base du traitement",
    content: [
      "Le traitement des données personnelles repose notamment sur la nécessité de répondre aux demandes formulées par les utilisateurs, d'exécuter les services demandés, de gérer les comptes utilisateurs et d'assurer le fonctionnement et la sécurité du site.",
      "Lorsque votre consentement est requis par la réglementation applicable, celui-ci est recueilli dans les conditions prévues à cet effet.",
    ],
  },

  {
    id: 7,
    title: "6. Utilisation des données",
    content: [
      `${agency.name} utilise les données personnelles uniquement dans le cadre des finalités pour lesquelles elles ont été collectées.`,
      "Les données ne sont pas utilisées à des fins incompatibles avec ces finalités sans information préalable de l'utilisateur ou sans autre fondement légal applicable.",
    ],
  },

  {
    id: 8,
    title: "7. Conservation des données",
    content: [
      "Les données personnelles sont conservées pendant une durée adaptée à la finalité pour laquelle elles ont été collectées.",
      "Les données liées à un compte utilisateur peuvent être conservées pendant la durée nécessaire à la gestion du compte et des services associés.",
      "Les données liées aux demandes de contact ou de visite peuvent être conservées pendant la durée nécessaire au traitement de la demande et à son suivi, ainsi que pendant les durées éventuellement imposées par la réglementation applicable.",
      "Lorsque les données ne sont plus nécessaires, elles peuvent être supprimées ou archivées conformément aux obligations légales applicables.",
    ],
  },

  {
    id: 9,
    title: "8. Destinataires des données",
    content: [
      "Les données personnelles sont principalement accessibles aux personnes autorisées au sein de l'agence lorsqu'elles sont nécessaires au traitement de votre demande.",
      "Certains prestataires techniques peuvent également traiter certaines données pour assurer le fonctionnement du site, notamment les services d'hébergement, de base de données, d'envoi d'e-mails ou de stockage de fichiers.",
      "Ces prestataires n'utilisent pas les données personnelles pour leur propre compte dans le cadre des services fournis à l'agence.",
      "Les données personnelles ne sont pas vendues à des tiers à des fins commerciales.",
    ],
  },

  {
    id: 10,
    title: "9. Sécurité des données",
    content: [
      `${agency.name} met en œuvre des mesures techniques et organisationnelles adaptées afin de protéger les données personnelles contre les accès non autorisés, la perte, la modification, la divulgation ou toute autre utilisation illicite.`,
      "Les accès aux fonctionnalités sensibles du site sont notamment protégés par des mécanismes d'authentification et de contrôle des autorisations.",
      "Toutefois, aucun système informatique ne peut garantir une sécurité absolue contre l'ensemble des risques existants.",
    ],
  },

  {
    id: 11,
    title: "10. Cookies et technologies similaires",
    content: [
      "Le site peut utiliser des cookies ou des technologies similaires nécessaires à son fonctionnement, à la sécurité du site et à l'amélioration de l'expérience utilisateur.",
      "Certains cookies peuvent également être utilisés à des fins de mesure d'audience ou pour assurer le bon fonctionnement de certaines fonctionnalités.",
      "Vous pouvez gérer ou supprimer les cookies depuis les paramètres de votre navigateur.",
    ],
  },

  {
    id: 12,
    title: "11. Données liées aux biens immobiliers",
    content: [
      "Les informations publiées concernant les biens immobiliers peuvent contenir des informations relatives à des propriétés, leurs caractéristiques, leur localisation, leurs photographies et leurs conditions de vente ou de location.",
      "Ces informations sont utilisées afin de présenter les biens proposés par l'agence et de faciliter les recherches des utilisateurs.",
      "Les données personnelles de propriétaires ou de tiers ne sont pas publiées sur le site sans fondement approprié ou autorisation lorsque celle-ci est nécessaire.",
    ],
  },

  {
    id: 13,
    title: "12. Vos droits",
    content: [
      "Conformément à la réglementation algérienne applicable en matière de protection des données à caractère personnel, vous disposez de droits concernant vos données personnelles.",
      "Vous pouvez notamment, dans les conditions prévues par la réglementation applicable, demander l'accès à vos données, leur rectification, leur mise à jour ou leur suppression lorsque celle-ci est possible.",
      "Vous pouvez également vous opposer à certains traitements ou demander leur limitation lorsque les conditions légales sont réunies.",
      agency.email
        ? `Pour exercer vos droits ou obtenir des informations concernant le traitement de vos données, vous pouvez contacter ${agency.name} à l'adresse suivante : ${agency.email}.`
        : `Pour exercer vos droits ou obtenir des informations concernant le traitement de vos données, vous pouvez contacter directement ${agency.name}.`,
    ],
  },

  {
    id: 14,
    title: "13. Liens vers des sites tiers",
    content: [
      "Le site peut contenir des liens vers des services ou sites internet appartenant à des tiers, notamment les réseaux sociaux ou les services de cartographie.",
      `${agency.name} ne contrôle pas les pratiques de confidentialité de ces services externes.`,
      "Nous vous invitons à consulter les politiques de confidentialité des services tiers concernés lorsque vous les utilisez.",
    ],
  },

  {
    id: 15,
    title: "14. Modifications de la politique",
    content: [
      `${agency.name} peut modifier la présente politique de confidentialité afin de tenir compte des évolutions légales, réglementaires, techniques ou fonctionnelles du site.`,
      "La version la plus récente de la politique est celle publiée sur cette page.",
      "Nous vous recommandons de consulter régulièrement cette page afin de prendre connaissance des éventuelles modifications.",
    ],
  },

  {
    id: 16,
    title: "15. Nous contacter",
    content: [
      `Pour toute question concernant la présente politique de confidentialité ou le traitement de vos données personnelles, vous pouvez contacter ${agency.name}.`,
      agency.address,
      ...agency.phone.map((phone) => `Téléphone : ${phone}`),
      ...(agency.email ? [`E-mail : ${agency.email}`] : []),
    ],
  },

  {
    id: 17,
    title: "Dernière mise à jour",
    content: [
      "Septembre 2026",
    ],
  },
];



const PrivacyPolicy = () => {

    const { agency } = useAgencyAdminContext();

    const sections = privacyPolicySections(agency);

    return (
        <>
            <section className="min-h-screen flex flex-col w-full items-center px-5">

                <div className="w-full max-w-[1000px] py-16">

                    <h1 className="text-[2.2em] font-bold text-[#222344]">
                        Politique de confidentialité
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Découvrez comment {agency.name} collecte et protège vos
                        données personnelles.
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

export default memo(PrivacyPolicy);


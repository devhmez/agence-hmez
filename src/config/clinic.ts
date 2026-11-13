export type Treatment = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  discussion: string[];
  image: { src: string; alt: string };
};
export type ClinicConfig = {
  name: string;
  shortName: string;
  notice: string;
  tagline: string;
  hero: { title: string; emphasis: string; description: string };
  theme: { background: string; ink: string; accent: string; surface: string };
  location: { label: string; description: string };
  contact: { email?: string; phone?: string; address?: string };
  hours: { days: string; hours: string }[];
  booking: {
    mode: "demo";
    timeWindows: readonly string[];
    chooseLabel: string;
  };
  treatments: Treatment[];
};
export const clinic: ClinicConfig = {
  name: "Avela Clinique",
  shortName: "avela",
  notice:
    "Avela est une clinique fictive. Les demandes de rendez-vous sont simulées.",
  tagline: "Des soins esthétiques à votre rythme.",
  hero: {
    title: "Prendre soin de vous,",
    emphasis: "à votre rythme.",
    description:
      "Une approche attentive de la peau et des soins esthétiques, qui commence par un échange sur vos attentes.",
  },
  theme: {
    background: "#080f16",
    ink: "#edf7f6",
    accent: "#7af2ce",
    surface: "#10212a",
  },
  location: {
    label: "Un espace pour se sentir à l’aise",
    description:
      "Présentation d’exemple d’une clinique de quartier imaginée pour un accueil calme et personnel. Avela ne possède aucun établissement physique.",
  },
  contact: {},
  hours: [
    { days: "Lundi–vendredi", hours: "09:00–18:00" },
    { days: "Samedi", hours: "09:00–13:00" },
    { days: "Dimanche", hours: "Fermé" },
  ],
  booking: {
    mode: "demo",
    timeWindows: ["Matin", "Après-midi"],
    chooseLabel: "Aidez-moi à choisir",
  },
  treatments: [
    {
      slug: "skin-consultation",
      name: "Consultation peau",
      category: "Commencer par un échange",
      summary:
        "Un temps pour parler de votre peau, de votre routine et de vos attentes.",
      description:
        "Une consultation permet de poser vos questions et d’exprimer vos priorités. Un praticien qualifié évaluerait votre peau et vos antécédents pertinents avant d’expliquer les options adaptées, y compris la possibilité de ne pas réaliser de soin.",
      discussion: [
        "Vos attentes et votre routine actuelle",
        "L’évaluation et les options adaptées",
        "Vos questions et le temps de décider",
      ],
      image: {
        src: "/images/clinic-6899542.webp",
        alt: "Photographie illustrative d’une salle de consultation et de soins",
      },
    },
    {
      slug: "hydration-facial",
      name: "Soin hydratant visage",
      category: "Peau et soins du quotidien",
      summary:
        "Découvrir un soin du visage adapté à votre peau et à vos préférences.",
      description:
        "Un premier échange permettrait de prendre en compte votre peau, vos sensibilités et les produits utilisés. Le praticien expliquerait le soin proposé, ses produits et les précautions nécessaires avant votre décision.",
      discussion: [
        "Votre peau et vos sensibilités aux produits",
        "Le soin proposé et ses limites",
        "Les conseils personnalisés après le soin",
      ],
      image: {
        src: "/images/clinic-7691112.webp",
        alt: "Photographie illustrative de flacons de soins et de serviettes blanches",
      },
    },
    {
      slug: "chemical-peel-consultation",
      name: "Consultation peeling",
      category: "Découvrir vos options",
      summary:
        "Comprendre l’évaluation, les précautions et les suites d’un peeling.",
      description:
        "Un peeling nécessite une évaluation individuelle. La consultation aborderait la méthode proposée, les alternatives, les risques possibles, la préparation et les conseils après le soin. Aucune décision de traitement n’est prise sur ce site.",
      discussion: [
        "L’évaluation individuelle de l’adéquation du soin",
        "Les risques possibles et les alternatives",
        "La préparation et les suites du soin",
      ],
      image: {
        src: "/images/clinic-7691105.webp",
        alt: "Photographie illustrative de produits de soins disposés sur des serviettes",
      },
    },
    {
      slug: "microneedling-consultation",
      name: "Consultation microneedling",
      category: "Découvrir vos options",
      summary:
        "Un échange sur l’adéquation du soin et le déroulement de la procédure.",
      description:
        "La consultation explorerait vos attentes et l’adéquation du microneedling. Un praticien qualifié expliquerait la procédure, les risques possibles, les alternatives et les précautions nécessaires avant toute décision.",
      discussion: [
        "Vos attentes et l’adéquation du soin",
        "La procédure, les risques et les alternatives",
        "La préparation et les conseils personnalisés après le soin",
      ],
      image: {
        src: "/images/clinic-3736279.webp",
        alt: "Photographie illustrative d’un lit de soin et d’équipements de salon",
      },
    },
  ],
};
export const clinicalNotice =
  "L’adéquation d’un soin, ses risques et ses suites nécessitent une évaluation par un praticien qualifié.";

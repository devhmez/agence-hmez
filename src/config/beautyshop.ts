export type BeautyProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  format: string;
  image: string;
  alt: string;
  description: string;
};
export const beautyProducts: BeautyProduct[] = [
  {
    id: "lotion",
    name: "Lotion douceur",
    category: "Soins visage",
    price: 38,
    format: "150 ml",
    image: "/images/beauty-13608711.webp",
    alt: "Flacon cosmétique rose dans la lumière naturelle",
    description:
      "Une lotion visage pour illustrer une routine tout en douceur. Présentation fictive, sans composition ni propriétés garanties.",
  },
  {
    id: "serum",
    name: "Sérum essentiel",
    category: "Soins visage",
    price: 59,
    format: "30 ml",
    image: "/images/beauty-6690885.webp",
    alt: "Flacon à pipette rose sur une surface en marbre",
    description:
      "Un sérum à intégrer dans votre rituel du visage. Présentation fictive ; demandez conseil pour choisir un soin adapté.",
  },
  {
    id: "routine",
    name: "Duo éclat",
    category: "Coffrets",
    price: 89,
    format: "2 × 30 ml",
    image: "/images/beauty-13573722.webp",
    alt: "Deux flacons de soins ambrés sur un fond rose",
    description:
      "Deux soins réunis dans un joli coffret, pour découvrir une nouvelle routine. Contenu et formats donnés à titre d’exemple.",
  },
  {
    id: "rituel",
    name: "Rituel visage",
    category: "Coffrets",
    price: 95,
    format: "2 produits",
    image: "/images/beauty-14311551.webp",
    alt: "Produits cosmétiques roses et verrerie sur une table blanche",
    description:
      "Une sélection de soins du visage pour prendre un moment pour soi. Coffret fictif présenté à titre d’exemple.",
  },
  {
    id: "corps",
    name: "Duo soins du corps",
    category: "Corps",
    price: 65,
    format: "2 produits",
    image: "/images/beauty-5582621.webp",
    alt: "Flacons de soins corporels et brosse sur un fond rose",
    description:
      "Deux essentiels pour un rituel de soins du corps. Produits fictifs ; formats et caractéristiques à titre d’exemple.",
  },
  {
    id: "maquillage",
    name: "Les essentiels teint",
    category: "Maquillage",
    price: 79,
    format: "Sélection de 3 produits",
    image: "/images/beauty-9846610.webp",
    alt: "Produits de maquillage et éponges sur un fond rose",
    description:
      "Une sélection pour explorer le maquillage du teint. Les produits et les teintes de cette démonstration sont illustratifs.",
  },
];
export const beautyCategories = [
  "Tout",
  "Soins visage",
  "Corps",
  "Maquillage",
  "Coffrets",
];
export const beautyPrice = (price: number) =>
  `${new Intl.NumberFormat("fr-TN", { maximumFractionDigits: 0 }).format(price)} TND`;

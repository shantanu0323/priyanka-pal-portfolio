export type Photo = { src: string; alt: string };
export type GalleryPhoto = Photo & { caption: string; wide?: boolean };
export type NavLink = { label: string; href: string };
export type Reel = {
  code: string;
  kind: "reel" | "p";
  title: string;
  brand?: string;
  caption: string;
};
export type Stat = { value: number; decimals?: number; suffix?: string; label: string };
export type Brand = {
  name: string;
  type: string;
  results: string[];
  url: string;
  photo: Photo;
  slug?: string;
};
export type Package = {
  name: string;
  price: string;
  priceNote: string;
  features: string[];
  highlight?: boolean;
  cta: string;
};

const email = "collab@priyankainberlin.com";
const instagram = "https://www.instagram.com/priyankainberlin";

export const mailto = (subject: string) => `mailto:${email}?subject=${encodeURIComponent(subject)}`;

export const igUrl = (kind: Reel["kind"], code: string) =>
  `https://www.instagram.com/${kind}/${code}/`;

export const photos = {
  pyramids: {
    src: "/images/photo-01.jpg",
    alt: "Priyanka on a camel in front of the Great Pyramid of Giza",
  },
  boat: { src: "/images/photo-02.jpg", alt: "Priyanka cheering on a boat above turquoise water" },
  petra: { src: "/images/photo-04.jpg", alt: "Priyanka in an orange dress in the Siq at Petra" },
  amman: {
    src: "/images/photo-05.jpg",
    alt: "Priyanka sitting among wildflowers at the Temple of Hercules, Amman",
  },
  wadiRum: {
    src: "/images/photo-06.jpg",
    alt: "Priyanka watching the sunset over the Wadi Rum desert",
  },
  tossakan: { src: "/images/photo-07.jpg", alt: "A spread of Thai dishes at Tossakan Berlin" },
  districtMot: {
    src: "/images/photo-08.jpg",
    alt: "Priyanka at the entrance of District Mot in Berlin",
  },
  upperGrill: {
    src: "/images/photo-09.jpg",
    alt: "Thin-crust pizzas and spritzes at Upper Grill Bar",
  },
} satisfies Record<string, Photo>;

export const site = {
  meta: {
    title: "Priyanka Pal — Travel & Lifestyle Content Creator in Berlin",
    description:
      "Berlin-based travel, food & lifestyle UGC creator. Reels, stories and UGC for restaurants, hotels and travel brands. 195K+ monthly reach.",
    ogImage: photos.petra.src,
  },
  name: { first: "Priyanka", last: "Pal" },
  email,
  instagram,
  instagramHandle: "@priyankainberlin",

  nav: {
    links: [
      { label: "About", href: "#about" },
      { label: "Reels", href: "#reels" },
      { label: "Gallery", href: "#gallery" },
      { label: "Stats", href: "#stats" },
      { label: "Packages", href: "#packages" },
      { label: "Contact", href: "#contact" },
    ] satisfies NavLink[],
    cta: { label: "Work with me", href: "#contact" },
  },

  hero: {
    eyebrow: "Berlin · Travel & Lifestyle UGC",
    headline: "Content creator & storyteller — travelling the non-influencer way.",
    supporting:
      "Real places, honest stories and scroll-stopping reels for restaurants, hotels and travel brands across Europe.",
    primaryCta: { label: "Work with me", href: "#contact" },
    secondaryCta: { label: "Watch reels", href: "#reels" },
    badge: { value: "195K+", label: "monthly reach" },
    badgeSecondary: { value: "77%", label: "Berlin audience" },
    photos: [photos.petra, photos.wadiRum, photos.pyramids],
  },

  marquee: [
    "Berlin",
    "Lake Como",
    "Santorini",
    "Paros",
    "Montenegro",
    "Dubrovnik",
    "Petra",
    "Reels",
    "UGC",
    "Hotels",
    "Food",
  ],

  about: {
    eyebrow: "About me",
    title: "Hi, I'm Priyanka 👋",
    paragraphs: [
      "I'm a Berlin-based content creator who travels the non-influencer way — skipping the three blue domes for the spots nobody's posting yet.",
      "A couple of years ago I started over: a new city, a new career, and a camera roll that kept filling up. Since then I've explored 8 countries in a single year, fallen hard for Montenegro's mountains and Lake Como's mornings, and eaten my way through Berlin's best tables.",
      "I make honest, relatable content — reels, stories and UGC — that feels like a recommendation from a friend, not an ad. Let's create something memorable together.",
    ],
    quote: "Stop loaning someone else's vacation.",
    facts: [
      "📍 Berlin",
      "✈️ 8 countries in a year",
      "🎥 Reels · UGC · Stories",
      "🍜 Food · Travel · Lifestyle",
    ],
    photo: photos.amman,
    photoSecondary: photos.boat,
  },

  reels: {
    eyebrow: "Work",
    title: "Reels & recent work",
    description: "A few recent collaborations and favourites. Tap any reel to play it right here.",
    items: [
      {
        code: "DNqd3moI7ve",
        kind: "reel",
        title: "Tossakan Berlin",
        brand: "Thai restaurant",
        caption: "A Thai feast that got saved 574 times.",
      },
      {
        code: "DNdsZqSsUb6",
        kind: "reel",
        title: "District Mot",
        brand: "Street food event",
        caption: "Vietnamese street food night, with @berlineatinerary.",
      },
      {
        code: "DN3Z9A12FiE",
        kind: "p",
        title: "Upper Grill Bar",
        brand: "Pizza & drinks",
        caption: "Thin-crust pizza and summer spritzes.",
      },
      {
        code: "Dfe8ZiSsPFS",
        kind: "reel",
        title: "Diwali fit check",
        brand: "Lifestyle",
        caption: "A festive transition reel — lifestyle content, my way.",
      },
    ] satisfies Reel[],
    more: { label: "See more on Instagram", href: instagram },
  },

  gallery: {
    eyebrow: "Gallery",
    title: "Through my lens",
    description: "A few favourite frames from the road and the table.",
    items: [
      { ...photos.petra, caption: "Petra, Jordan", wide: false },
      { ...photos.wadiRum, caption: "Wadi Rum, Jordan", wide: true },
      { ...photos.pyramids, caption: "Giza, Egypt", wide: false },
      { ...photos.amman, caption: "Amman, Jordan", wide: false },
      { ...photos.boat, caption: "Out on the water", wide: true },
      { ...photos.tossakan, caption: "Tossakan, Berlin", wide: false },
      { ...photos.districtMot, caption: "District Mot, Berlin", wide: false },
      { ...photos.upperGrill, caption: "Upper Grill Bar, Berlin", wide: true },
    ] satisfies GalleryPhoto[],
    prevLabel: "Previous photos",
    nextLabel: "Next photos",
    closeLabel: "Close photo",
  },

  stats: {
    eyebrow: "Monthly stats",
    title: "Small account, big reach.",
    description:
      "My content travels far beyond my follower count — most of it reaches people who are actively planning where to eat, stay and go next.",
    items: [
      { value: 195, suffix: "K+", label: "Monthly reach" },
      { value: 6.2, decimals: 1, suffix: "K", label: "Monthly interactions" },
      { value: 77, suffix: "%", label: "German audience (Berlin)" },
      { value: 490, label: "Followers" },
    ] satisfies Stat[],
    note: "Monthly averages · updated 2025",
  },

  brands: {
    eyebrow: "Collaborations",
    title: "Brands I've worked with",
    description: "Summer 2025 in Berlin — more to follow soon…",
    items: [
      {
        name: "Tossakan Berlin",
        type: "Thai restaurant · Reel",
        results: ["9K reach", "574 saves"],
        url: igUrl("reel", "DNqd3moI7ve"),
        photo: photos.tossakan,
        slug: "tossakan-berlin",
      },
      {
        name: "District Mot",
        type: "Vietnamese street food · Event reel",
        results: ["11.3K reach"],
        url: igUrl("reel", "DNdsZqSsUb6"),
        photo: photos.districtMot,
        slug: "district-mot",
      },
      {
        name: "Upper Grill Bar",
        type: "Thin-crust pizza · Post",
        results: ["7.7K reach"],
        url: igUrl("p", "DN3Z9A12FiE"),
        photo: photos.upperGrill,
        slug: "upper-grill-bar",
      },
    ] satisfies Brand[],
  },

  packages: {
    eyebrow: "Pricing",
    title: "Packages",
    description: "Flexible — every package can be tailored to your brand.",
    items: [
      {
        name: "Instagram Story",
        price: "€30 – €50",
        priceNote: "starting from",
        features: ["Video / photo shooting & editing", "Copywriting"],
        cta: "Book now",
      },
      {
        name: "Instagram Reel",
        price: "€60 – €80",
        priceNote: "starting from",
        features: ["Creative concept", "Video shooting & editing", "Copywriting"],
        cta: "Book now",
      },
      {
        name: "All-Inclusive",
        price: "€100 – €150",
        priceNote: "starting from",
        features: ["Creative concept", "2 video edits + 2 stories", "Copywriting"],
        highlight: true,
        cta: "Book now",
      },
      {
        name: "Custom / Hotels & UGC",
        price: "Let's talk",
        priceNote: "tailored",
        features: [
          "Hotel & stay features",
          "UGC-only content (no posting)",
          "Travel & destination campaigns",
          "Bundles",
        ],
        cta: "Get in touch",
      },
    ] satisfies Package[],
    highlightLabel: "Most popular",
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's create something memorable.",
    description:
      "Restaurants, hotels, travel and lifestyle brands — tell me what you have in mind.",
    emailSubject: "Collaboration enquiry",
    copyLabel: "Copy email",
    copiedLabel: "Copied!",
    instagramLabel: "DM on Instagram",
    // TODO: add a contact form (Formspree / Web3Forms) once a backend is chosen.
    formEndpoint: null as string | null,
  },

  footer: {
    copyright: "© 2026 Priyanka Pal · Berlin",
    backToTop: "Back to top",
  },
};

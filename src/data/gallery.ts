export type GalleryCategory = "Highlights" | "Team Culture";

export type GalleryItem = {
  id: string;
  type: "image" | "video";
  title: string;
  category: GalleryCategory;
  src: string;
  thumb?: string;
  year?: number;
};

export const galleryCategories: GalleryCategory[] = [
  "Highlights",
  "Team Culture"
];

export const galleryItems: GalleryItem[] = [
  {
    id: "media-01",
    type: "image",
    title: "Team moment",
    category: "Team Culture",
    src: "/media/brand/79737a01b7ed4750cd3c63da7a83c15e.jpg"
  },
  {
    id: "media-02",
    type: "image",
    title: "P1012211",
    category: "Team Culture",
    src: "/media/brand/P1012211.jpg"
  },
  {
    id: "media-03",
    type: "image",
    title: "P1012217",
    category: "Team Culture",
    src: "/media/brand/P1012217.jpg"
  },
  {
    id: "media-04",
    type: "image",
    title: "P1012219",
    category: "Team Culture",
    src: "/media/brand/P1012219.jpg"
  },
  {
    id: "media-05",
    type: "image",
    title: "P1012223",
    category: "Team Culture",
    src: "/media/brand/P1012223.jpg"
  },
  {
    id: "media-06",
    type: "image",
    title: "P1012226",
    category: "Team Culture",
    src: "/media/brand/P1012226.jpg"
  },
  {
    id: "media-07",
    type: "video",
    title: "P1012242",
    category: "Highlights",
    src: "/media/brand/P1012242.MOV"
  },
  {
    id: "media-08",
    type: "image",
    title: "P1012249",
    category: "Team Culture",
    src: "/media/brand/P1012249.jpg"
  },
  {
    id: "media-09",
    type: "image",
    title: "P1012257",
    category: "Team Culture",
    src: "/media/brand/P1012257.jpg"
  },
  {
    id: "media-10",
    type: "video",
    title: "P1012263",
    category: "Highlights",
    src: "/media/brand/P1012263.MOV"
  },
  {
    id: "media-11",
    type: "image",
    title: "P1012284",
    category: "Team Culture",
    src: "/media/brand/P1012284.jpg"
  },
  {
    id: "media-12",
    type: "image",
    title: "P1012294",
    category: "Team Culture",
    src: "/media/brand/P1012294.JPG"
  },
  {
    id: "media-13",
    type: "image",
    title: "P1012295",
    category: "Team Culture",
    src: "/media/brand/P1012295.JPG"
  },
  {
    id: "media-14",
    type: "video",
    title: "P1012304",
    category: "Highlights",
    src: "/media/brand/P1012304.MOV"
  },
  {
    id: "media-15",
    type: "video",
    title: "P1012307",
    category: "Highlights",
    src: "/media/brand/P1012307.MOV"
  },
  {
    id: "media-16",
    type: "video",
    title: "P1012308",
    category: "Highlights",
    src: "/media/brand/P1012308.MOV"
  },
  {
    id: "media-17",
    type: "video",
    title: "P1012314",
    category: "Highlights",
    src: "/media/brand/P1012314.MOV"
  },
  {
    id: "media-18",
    type: "video",
    title: "P1012321",
    category: "Highlights",
    src: "/media/brand/P1012321.MOV"
  },
  {
    id: "media-19",
    type: "image",
    title: "P1012336",
    category: "Team Culture",
    src: "/media/brand/P1012336.jpg"
  },
  {
    id: "media-20",
    type: "image",
    title: "P1012343",
    category: "Team Culture",
    src: "/media/brand/P1012343.jpg"
  }
];

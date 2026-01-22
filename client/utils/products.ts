import { Product } from "@/types/product";

export const getRandom10 = (array: any[]) => {
  return array.slice().sort(() => Math.random() - 0.5).slice(0, 10);
}

export const getRandom99 = (arr: any[], count = 99) => {
  const shuffled = arr.slice();

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export const combineAndShuffle = (...arrays: any[][]): any[] => {
  const combined = arrays.flat();

  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  return combined;
}

export const getFootwears = (array: Product[]): Product[] => {
  return array.filter(prd => prd.category === "footwears")
}

export const getWatches = (array: Product[]): Product[] => {
  return array.filter(prd => prd.category === "watches")
}

export const getPhones = (array: Product[]): Product[] => {
  return array.filter(prd => prd.category === "phones")
}

export const getLaptops = (array: Product[]): Product[] => {
  return array.filter(prd => prd.category === "laptops")
}


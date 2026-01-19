export const getRandom10 = (array: any[]) => {
  return array.slice().sort(() => Math.random() - 0.5).slice(0, 10);
}
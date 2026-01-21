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

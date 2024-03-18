export default function getRandomOrder(size: number) {
  const result = Array<number>();
  const alreadyAdded: Record<number, boolean> = {};
  while (result.length < size) {
    const rand = Math.floor(Math.random() * size);
    if (!(rand in alreadyAdded)) {
      result.push(rand);
      alreadyAdded[rand] = true;
    }
  }
  return result;
}

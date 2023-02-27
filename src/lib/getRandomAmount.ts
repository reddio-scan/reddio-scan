/**
 *
 * @param size - Number of digits in the random number
 * @returns `number` random amount
 */
const getRandomAmount = (size: number = 8): number => {
  // Generate a random number with the specified number of digits
  const randomNumber = Math.floor(Math.random() * 10 ** size);
  return randomNumber;
};
export default getRandomAmount;

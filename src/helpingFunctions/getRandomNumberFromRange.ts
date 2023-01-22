/**Get random number from range
 * @param min the lowest value
 * @param max the biggest value
 */
export default function getRandomNumberFromRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

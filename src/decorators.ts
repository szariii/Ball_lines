/**
 * Decorators functions 
 * @module
 */

export function provocation(target: any, name: string, descriptor: any) {
  var originalMethod = descriptor.value;
  console.log(target);
  console.log(name);
  descriptor.value = function (...args: any[]) {
    const tab: Array<string> = [
      "cienko idzie",
      "hehe pudełko",
      "tak dalej",
      "LAMA!!!",
      "NOOB",
      "YEH!",
    ];
    const number = getRandomInt(0, 5);
    var result = originalMethod.apply(this, args);
    const inputElement: HTMLInputElement = document.getElementById(
      "provocator"
    ) as HTMLInputElement;
    inputElement.value = tab[number];
    console.log(inputElement);
    return result;
  };
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

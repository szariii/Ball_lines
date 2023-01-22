/** Clean path elements */
export default function cleanPath(
  arrayOfWayElements: Array<HTMLDivElement>,
  playgroundArray: Array<Array<number>>
) {
  if (arrayOfWayElements.length !== 0) {
    for (let z = 0; z < arrayOfWayElements.length; z++) {
      arrayOfWayElements[z].classList.remove("shortestWay");
      arrayOfWayElements[z].style.backgroundColor = "";
    }
    arrayOfWayElements = [];
  }

  for (let i: number = 0; i < 9; i++) {
    for (let j: number = 0; j < 9; j++) {
      if (playgroundArray[i][j] > -3) {
        playgroundArray[i][j] = 1000;
      }
    }
  }

  return playgroundArray;
}

import { Position, PlaceConfiguration, MoveCounter } from "./interfaces";
import cleanPath from "./helpingFunctions/cleanPath";

export default class FindWay {
  /**Width of board */
  readonly width: number = 9;
  /**Height of board */
  readonly height: number = 9;
  /**Max number (empty places on playground array have max number) */
  private maxNumber: number = 1000;

  playgroundArray: Array<Array<number>>;
  selectedBall: Position;
  arrayOfWayElements: Array<HTMLDivElement>;

  constructor(
    playgroundArray: Array<Array<number>>,
    selectedBall: Position,
    arrayOfWayElements: Array<HTMLDivElement>
  ) {
    this.playgroundArray = playgroundArray;
    this.selectedBall = selectedBall;
    this.arrayOfWayElements = arrayOfWayElements;
  }

  get newPlaygroundArray() {
    return this.playgroundArray;
  }

  get newArrayOfWayElements() {
    return this.arrayOfWayElements;
  }

  findWay(event: Event, i: number, j: number) {
    this.playgroundArray = cleanPath(
      this.arrayOfWayElements,
      this.playgroundArray
    );
    this.arrayOfWayElements = [];
    this.clickedAction(event as Event, i, j);
    console.log(this.playgroundArray);
    this.playgroundArray[this.selectedBall.i][this.selectedBall.j] =
      this.selectedBall.index;
  }

  /**Action on Click filed
   * @param i position horizontally
   * @param j position vertically
   * @param event event value
   */
  clickedAction(event: Event, i: number, j: number) {
    let targetDiv: HTMLDivElement = event.target as HTMLDivElement;
    if (targetDiv.classList.contains("field")) {
      this.endPoint(i, j);
    }
  }

  /**Add endpoint in playground array
   * @param i position horizontally
   * @param j position vertically
   */
  endPoint(i: number, j: number) {
    if (this.playgroundArray[i][j] !== -2) {
      this.playgroundArray[i][j] = -1;
      this.countMoves();
    }
  }

  /**Count starts places*/
  countMoves() {
    let i: number = this.selectedBall.i;
    let j: number = this.selectedBall.j;
    this.playgroundArray[i][j] = -2;
    let startsArray: Array<PlaceConfiguration> = [];

    if (i + 1 < this.width) {
      if (this.playgroundArray[i + 1][j] > -1) {
        this.playgroundArray[i + 1][j] = 1;
        let obj = { i: i + 1, j: j };
        startsArray.push(obj);
      }
    }

    if (i - 1 >= 0) {
      if (this.playgroundArray[i - 1][j] > -1) {
        this.playgroundArray[i - 1][j] = 1;
        let obj = { i: i - 1, j: j };
        startsArray.push(obj);
      }
    }

    if (j + 1 < this.height) {
      if (this.playgroundArray[i][j + 1] > -1) {
        this.playgroundArray[i][j + 1] = 1;
        let obj = { i: i, j: j + 1 };
        startsArray.push(obj);
      }
    }

    if (j - 1 >= 0) {
      if (this.playgroundArray[i][j - 1] > -1) {
        this.playgroundArray[i][j - 1] = 1;
        let obj = { i: i, j: j - 1 };
        startsArray.push(obj);
      }
    }

    console.log("startsArray: ", startsArray);
    this.showCountMoves(startsArray);
  }

  /**Count steps
   * @param startsArray array with starting positions
   */
  showCountMoves(startsArray: Array<PlaceConfiguration>) {
    console.log(startsArray);
    /**Count steps from every start point*/
    for (let index = 0; index < startsArray.length; index++) {
      console.log(startsArray[index].i);
      this.countMovesForChoosenStartField(
        startsArray[index].i,
        startsArray[index].j,
        2
      );
    }

    /**Find finish point*/
    let iM: number = 0;
    let jM: number = 0;
    for (
      let iIndex: number = 0;
      iIndex < this.playgroundArray.length;
      iIndex++
    ) {
      for (
        let jIndex: number = 0;
        jIndex < this.playgroundArray[iIndex].length;
        jIndex++
      ) {
        if (this.playgroundArray[iIndex][jIndex] === -1) {
          iM = iIndex;
          jM = jIndex;
        }
      }
    }

    /**Finding the shortest way*/
    this.FindShortesWay(iM, jM);
  }

  /**Finding the shortest way from finish point to start
   * @param i position horizontally
   * @param j position vertically
   */
  FindShortesWay(i: number, j: number) {
    let shortestWayIndex: { index: number; posI: number; posJ: number } = {
      index: this.maxNumber,
      posI: -1,
      posJ: -1,
    };

    if (i + 1 < this.width) {
      console.log(i + 1);
      if (
        this.playgroundArray[i + 1][j] > -3 &&
        this.playgroundArray[i + 1][j] !== -1 &&
        this.playgroundArray[i + 1][j] !== 0 &&
        this.playgroundArray[i + 1][j] < shortestWayIndex.index
      ) {
        shortestWayIndex = {
          index: this.playgroundArray[i + 1][j],
          posI: i + 1,
          posJ: j,
        };
      }
    }

    if (i - 1 >= 0) {
      if (
        this.playgroundArray[i - 1][j] !== -1 &&
        this.playgroundArray[i - 1][j] > -3 &&
        this.playgroundArray[i - 1][j] !== 0 &&
        this.playgroundArray[i - 1][j] < shortestWayIndex.index
      ) {
        shortestWayIndex = {
          index: this.playgroundArray[i - 1][j],
          posI: i - 1,
          posJ: j,
        };
      }
    }

    if (j + 1 < this.height) {
      console.log(j);
      console.log(j + 1);
      if (
        this.playgroundArray[i][j + 1] !== -1 &&
        this.playgroundArray[i][j + 1] > -3 &&
        this.playgroundArray[i][j + 1] !== 0 &&
        this.playgroundArray[i][j + 1] < shortestWayIndex.index
      ) {
        shortestWayIndex = {
          index: this.playgroundArray[i][j + 1],
          posI: i,
          posJ: j + 1,
        };
      }
    }

    if (j - 1 >= 0) {
      if (
        this.playgroundArray[i][j - 1] !== -1 &&
        this.playgroundArray[i][j - 1] > -3 &&
        this.playgroundArray[i][j - 1] !== 0 &&
        this.playgroundArray[i][j - 1] < shortestWayIndex.index
      ) {
        shortestWayIndex = {
          index: this.playgroundArray[i][j - 1],
          posI: i,
          posJ: j - 1,
        };
      }
    }

    if (shortestWayIndex.index !== this.maxNumber) {
      console.log("shortestWay");
      let div: HTMLDivElement = document.getElementById(
        `${i}_${j}`
      ) as HTMLDivElement;
      div.classList.add("shortestWay");

      console.log("array: ", this.playgroundArray);

      this.arrayOfWayElements.push(div);

      if (shortestWayIndex.index == -2) {
        let div: HTMLDivElement = document.getElementById(
          `${shortestWayIndex.posI}_${shortestWayIndex.posJ}`
        ) as HTMLDivElement;
        div.classList.add("shortestWay");
        this.arrayOfWayElements.push(div);
        console.log(this.selectedBall);
      } else {
        this.FindShortesWay(shortestWayIndex.posI, shortestWayIndex.posJ);
      }
    } else {
      for (let i: number = 0; i < this.width; i++) {
        for (let j: number = 0; j < this.height; j++) {
          if (this.playgroundArray[i][j] > -3) {
            this.playgroundArray[i][j] = this.maxNumber;
          }
        }
      }
    }
  }

  countMovesForChoosenStartField(i: number, j: number, indexNumber: number) {
    let arrayPlacesToCheck: Array<MoveCounter> = this.checkNeiberhoodFields(
      i,
      j,
      indexNumber
    );

    while (arrayPlacesToCheck.length > 0) {
      let temporaryArray: Array<MoveCounter> = this.checkNeiberhoodFields(
        arrayPlacesToCheck[0].i,
        arrayPlacesToCheck[0].j,
        arrayPlacesToCheck[0].indexNumber + 1
      );
      arrayPlacesToCheck.shift();
      temporaryArray.map((obj) => arrayPlacesToCheck.push(obj));
    }
  }

  /**Check neighborhood fields
   * @param i position horizontally
   * @param j position vertically
   * @param indexNumber index of ball
   * @returns array with next postion to check
   */
  checkNeiberhoodFields(i: number, j: number, indexNumber: number) {
    let nextArray: Array<MoveCounter> = [];
    if (i + 1 < this.width) {
      if (
        this.playgroundArray[i + 1][j] > -1 &&
        this.playgroundArray[i + 1][j] > indexNumber
      ) {
        this.playgroundArray[i + 1][j] = indexNumber;
        let obj = { i: i + 1, j: j, indexNumber: indexNumber };
        nextArray.push(obj);
      }
    }

    if (i - 1 >= 0) {
      if (
        this.playgroundArray[i - 1][j] > -1 &&
        this.playgroundArray[i - 1][j] > indexNumber
      ) {
        this.playgroundArray[i - 1][j] = indexNumber;
        let obj = { i: i - 1, j: j, indexNumber: indexNumber };
        nextArray.push(obj);
      }
    }

    if (j + 1 < this.height) {
      if (
        this.playgroundArray[i][j + 1] > -1 &&
        this.playgroundArray[i][j + 1] > indexNumber
      ) {
        this.playgroundArray[i][j + 1] = indexNumber;
        let obj = { i: i, j: j + 1, indexNumber: indexNumber };
        nextArray.push(obj);
      }
    }

    if (j - 1 >= 0) {
      if (
        this.playgroundArray[i][j - 1] > -1 &&
        this.playgroundArray[i][j - 1] > indexNumber
      ) {
        this.playgroundArray[i][j - 1] = indexNumber;
        let obj = { i: i, j: j - 1, indexNumber: indexNumber };
        nextArray.push(obj);
      }
    }
    console.log(nextArray);
    return nextArray;
  }
}

import { BeatingBall } from "./interfaces";

export default class BeatingBalls {
  /**Width of board */
  readonly width: number = 9;
  /**Height of board */
  readonly height: number = 9;

  /**Array of playground */
  playgroundArray: Array<Array<number>> = [[], [], [], [], [], [], [], [], []];

  /**Max number (empty places on playground array have max number) */
  private maxNumber: number = 1000;

  /**Points */
  points: number;

  constructor(playgroundArray: Array<Array<number>>, points: number) {
    this.playgroundArray = playgroundArray;
    this.points = points;
  }

  beatingBalls() {
    console.log(this.playgroundArray);
    let flag: boolean = false;
    const allBeatingBalls: Array<BeatingBall> = [];
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.playgroundArray[i][j] !== this.maxNumber) {
          const beatingDown: Array<BeatingBall> = this.beatingBallsDown(
            i,
            j,
            this.playgroundArray[i][j]
          );
          beatingDown.map((ball) => allBeatingBalls.push(ball));
          const beatingRight: Array<BeatingBall> = this.beatingBallsRight(
            i,
            j,
            this.playgroundArray[i][j]
          );
          beatingRight.map((ball) => allBeatingBalls.push(ball));

          const beatingRightDown: Array<BeatingBall> =
            this.beatingBallsRightDown(i, j, this.playgroundArray[i][j]);
          beatingRightDown.map((ball) => allBeatingBalls.push(ball));

          const beatingLeftDown: Array<BeatingBall> = this.beatingBallsLeftDown(
            i,
            j,
            this.playgroundArray[i][j]
          );
          beatingLeftDown.map((ball) => allBeatingBalls.push(ball));
          if (
            beatingDown.length > 0 ||
            beatingRight.length > 0 ||
            beatingRightDown.length > 0 ||
            beatingLeftDown.length > 0
          ) {
            allBeatingBalls.push({ i: i, j: j });
          }
        }
      }
    }

    if (allBeatingBalls.length > 0) {
      console.log(allBeatingBalls);
      const uniquAllBeatingBalls: Array<BeatingBall> = [];
      for (let z = 0; z < allBeatingBalls.length; z++) {
        let flagRepeat: boolean = false;
        for (let y = 0; y < uniquAllBeatingBalls.length; y++) {
          if (
            JSON.stringify(allBeatingBalls[z]) ===
            JSON.stringify(uniquAllBeatingBalls[y])
          ) {
            flagRepeat = true;
          }
        }
        if (flagRepeat === false) {
          uniquAllBeatingBalls.push(allBeatingBalls[z]);
        }
      }
      console.log(allBeatingBalls);
      console.log(uniquAllBeatingBalls);

      for (let z = 0; z < uniquAllBeatingBalls.length; z++) {
        console.log(uniquAllBeatingBalls[z]);
        this.points++;
        const divToRemove: HTMLDivElement = document.getElementById(
          `${uniquAllBeatingBalls[z].i}_${uniquAllBeatingBalls[z].j}_c`
        ) as HTMLDivElement;

        divToRemove.remove();

        this.playgroundArray[uniquAllBeatingBalls[z].i][
          uniquAllBeatingBalls[z].j
        ] = this.maxNumber;
      }

      const showPointsH2: HTMLHeadingElement = document.getElementById(
        "points"
      ) as HTMLHeadingElement;
      showPointsH2.innerText = this.points.toString();
      console.log(uniquAllBeatingBalls);
      flag = true;
    }

    return flag;
  }

  /**Beating balls vertical
   * @param i position horizontally
   * @param j position vertically
   * @param index index of ball
   */
  beatingBallsDown(i: number, j: number, index: number) {
    let count: number = 1;
    const arrayWithBeatingBallsDivs: Array<BeatingBall> = [];

    while (i + count < this.height) {
      if (this.playgroundArray[i + count][j] === index) {
        console.log(this.playgroundArray[i + count][j]);
        arrayWithBeatingBallsDivs.push({ i: i + count, j: j });
        count++;
      } else {
        break;
      }
    }

    if (count > 4) {
      return arrayWithBeatingBallsDivs;
    } else {
      return [];
    }
  }

  /** Beating balls horizontally */
  beatingBallsRight(i: number, j: number, index: number) {
    let count: number = 1;
    const arrayWithBeatingBallsDivs: Array<BeatingBall> = [];

    while (j + count < this.width) {
      if (this.playgroundArray[i][j + count] === index) {
        console.log(this.playgroundArray[i][j + count]);
        arrayWithBeatingBallsDivs.push({ i: i, j: j + count });
        count++;
      } else {
        break;
      }
    }

    if (count > 4) {
      return arrayWithBeatingBallsDivs;
    } else {
      return [];
    }
  }

  /** Beating balls cros to right down
   * @param i position horizontally
   * @param j position vertically
   * @param index index of ball
   */
  beatingBallsRightDown(i: number, j: number, index: number) {
    let count: number = 1;
    const arrayWithBeatingBallsDivs: Array<BeatingBall> = [];

    while (j + count < this.width && i + count < this.height) {
      if (this.playgroundArray[i + count][j + count] === index) {
        console.log(this.playgroundArray[i + count][j + count]);
        arrayWithBeatingBallsDivs.push({ i: i + count, j: j + count });
        count++;
      } else {
        break;
      }
    }

    if (count > 4) {
      return arrayWithBeatingBallsDivs;
    } else {
      return [];
    }
  }

  /**Beating balls cros left down
   * @param i position horizontally
   * @param j position vertically
   * @param index index of ball
   */
  beatingBallsLeftDown(i: number, j: number, index: number) {
    let count: number = 1;
    const arrayWithBeatingBallsDivs: Array<BeatingBall> = [];

    while (j - count >= 0 && i + count < this.height) {
      if (this.playgroundArray[i + count][j - count] === index) {
        console.log(this.playgroundArray[i + count][j - count]);
        arrayWithBeatingBallsDivs.push({ i: i + count, j: j - count });
        count++;
      } else {
        break;
      }
    }

    if (count > 4) {
      return arrayWithBeatingBallsDivs;
    } else {
      return [];
    }
  }

  get newPlaygroundArray(){
    return this.playgroundArray
  }

  get newPoints(){
    return this.points
  }
}



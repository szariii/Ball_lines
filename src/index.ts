//Instruction:
// X - -3
// S - -2
// M - -1

//Vite

/**
 * Main class Game
 * @module
 */
import BeatingBalls from "./beatingBalls";
import FindWay from "./findWay";
import { provocation } from "./decorators";
import { Position, Color } from "./interfaces";
import cleanPath from "./helpingFunctions/cleanPath";
import getRandomNumberFromRange from "./helpingFunctions/getRandomNumberFromRange";

export class Game implements Game {
  /**Width of board */
  readonly width: number = 9;
  /**Height of board */
  readonly height: number = 9;

  //stops: number = 3;
  /**Get root div */
  public rootDiv: HTMLDivElement = document.getElementById(
    "root"
  ) as HTMLDivElement;

  /**Array of playground */
  playgroundArray: Array<Array<number>> = [[], [], [], [], [], [], [], [], []];

  /**Max number (empty places on playground array have max number) */
  private maxNumber: number = 1000;

  /**Selected ball informations */
  selectedBall: Position = { i: -1, j: -1, color: "", index: -1 };

  /**Array with parts of way fields  */
  arrayOfWayElements: Array<HTMLDivElement> = [];

  /**Inforamtions about colors */
  protected colorsArray: Array<Color> = [
    { color: "red", index: -3 },
    { color: "blue", index: -4 },
    { color: "black", index: -5 },
    { color: "green", index: -6 },
    { color: "pink", index: -7 },
    { color: "yellow", index: -8 },
    { color: "indigo", index: -9 },
  ];

  /**Next balls colors */
  nextBallColors: Array<Color> = [];

  /**Points */
  points: number = 0;

  /**Start game */
  constructor() {
    this.startGame();
  }

  /** Render playground*/
  startGame() {
    const boardDiv: HTMLDivElement = document.createElement("div");
    boardDiv.id = "board";
    for (let i: number = 0; i < this.width; i++) {
      for (let j: number = 0; j < this.height; j++) {
        const childDiv: HTMLDivElement = document.createElement(
          "div"
        ) as HTMLDivElement;
        childDiv.id = i + "_" + j;
        childDiv.classList.add("field");
        this.playgroundArray[i][j] = this.maxNumber;
        boardDiv.appendChild(childDiv);
      }
    }
    this.randomBallsColors();
    this.rootDiv.appendChild(boardDiv);

    /**Put birst balls on random positions*/
    this.putBallsOnRadnomPlaceOnStart();
    console.log(this.playgroundArray);
  }

  /**  Draw colors of next balls  */
  randomBallsColors() {
    if (this.nextBallColors.length !== 0) {
      this.nextBallColors = [];
    }

    for (let i: number = 0; i < 3; i++) {
      const randomColorIndex = getRandomNumberFromRange(-9, -2);
      console.log(randomColorIndex);
      const color: Color = this.colorsArray.filter(
        (info) => info.index === randomColorIndex
      )[0];
      this.nextBallColors.push(color);
    }

    console.log(this.nextBallColors);
    this.printNextBalls();
  }

  /**Show next balls */
  printNextBalls() {
    const oldNextBallsDiv: HTMLDivElement = document.getElementById(
      "nextBallsDiv"
    ) as HTMLDivElement;
    console.log(oldNextBallsDiv);
    oldNextBallsDiv.remove();
    const nextBallsDiv: HTMLDivElement = document.createElement("div");
    nextBallsDiv.classList.add("nextBallsDiv");
    nextBallsDiv.id = "nextBallsDiv";
    const textNextBalls: HTMLHeadingElement = document.createElement("h2");
    textNextBalls.innerText = "Next: ";
    nextBallsDiv.appendChild(textNextBalls);
    const ballsDiv: HTMLDivElement = document.createElement("div");
    ballsDiv.classList.add("ballsDiv");
    for (let i: number = 0; i < 3; i++) {
      const ballDiv: HTMLDivElement = document.createElement("div");
      ballDiv.classList.add("circle");
      ballDiv.style.backgroundColor = this.nextBallColors[i].color;
      ballsDiv.appendChild(ballDiv);
    }
    nextBallsDiv.appendChild(ballsDiv);
    const nextBallsRootDiv: HTMLDivElement = document.getElementById(
      "nextBallsRootDiv"
    ) as HTMLDivElement;
    nextBallsRootDiv.appendChild(nextBallsDiv);
  }

  /**puting first balls on random places*/
  putBallsOnRadnomPlaceOnStart() {
    let index: number = 0;
    while (index < 3) {
      const xCord: number = getRandomNumberFromRange(0, this.width);
      const yCord: number = getRandomNumberFromRange(0, this.height);

      if (this.playgroundArray[xCord][yCord] === this.maxNumber) {
        const randomIndex = getRandomNumberFromRange(0, 7);
        console.log(randomIndex);
        const randomColor: Color = this.colorsArray[randomIndex];
        this.createBall(xCord, yCord, randomColor.color, randomColor.index);
        index++;
      }
    }
  }

  /**Create ball icon and save location to playgrund array
   * @param i height value where to create ball
   * @param j width value to create ball
   * @param color color of ball
   * @param index number of ball
   */
  createBall(i: number, j: number, color: string, index: number) {
    this.playgroundArray[i][j] = index;
    let div: HTMLDivElement = document.getElementById(
      `${i}_${j}`
    ) as HTMLDivElement;

    let circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.backgroundColor = color;
    circle.id = `${i}_${j}_c`;
    circle.onclick = () => this.clickBall(i, j, color, index);
    div.appendChild(circle);
  }

  /**Action on click ball
   * @param i height value clicked ball
   * @param j width value clicked ball
   * @param color color of ball
   * @param index number of ball
   */
  async clickBall(i: number, j: number, color: string, index: number) {
    this.playgroundArray = cleanPath(
      this.arrayOfWayElements,
      this.playgroundArray
    );
    this.arrayOfWayElements = [];
    if (i === this.selectedBall.i && j === this.selectedBall.j) {
      let oldDiv: HTMLDivElement = document.getElementById(
        `${this.selectedBall.i}_${this.selectedBall.j}_c`
      ) as HTMLDivElement;
      oldDiv.classList.remove("selectedBall");

      this.selectedBall.i = -1;
      this.selectedBall.j = -1;
      this.selectedBall.color = "";
      this.selectedBall.index = -1;

      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          let parentDiv: HTMLDivElement = document.getElementById(
            `${i}_${j}`
          ) as HTMLDivElement;
          parentDiv.onmouseover = () => {};
          parentDiv.onclick = () => {};
        }
      }
    } else {
      console.log(i, j, color, index);
      /**Clean path (if exist)*/
      if (this.arrayOfWayElements.length !== 0) {
        for (let i = 0; i < this.arrayOfWayElements.length; i++) {
          this.arrayOfWayElements[i].classList.remove("shortestWay");
        }
        this.arrayOfWayElements = [];
      }

      /**Check if ball can be selected*/
      let flag: Boolean = false;

      if (i + 1 < this.width) {
        if (this.playgroundArray[i + 1][j] > -3) {
          flag = true;
        }
      }

      if (i - 1 >= 0) {
        if (this.playgroundArray[i - 1][j] > -3) {
          flag = true;
        }
      }

      if (j + 1 < this.height) {
        if (this.playgroundArray[i][j + 1] > -3) {
          flag = true;
        }
      }

      if (j - 1 >= 0) {
        if (this.playgroundArray[i][j - 1] > -3) {
          flag = true;
        }
      }

      /**Select ball*/
      if (flag === true) {
        if (this.selectedBall.i !== -1) {
          console.log(this.selectedBall);
          let oldDiv: HTMLDivElement = document.getElementById(
            `${this.selectedBall.i}_${this.selectedBall.j}_c`
          ) as HTMLDivElement;

          oldDiv.classList.remove("selectedBall");
          console.log(oldDiv);
        }

        let newDiv: HTMLDivElement = document.getElementById(
          `${i}_${j}_c`
        ) as HTMLDivElement;
        newDiv.classList.add("selectedBall");

        this.selectedBall.i = i;
        this.selectedBall.j = j;
        this.selectedBall.color = color;
        this.selectedBall.index = index;

        /**Add onClick event on fields*/
        for (let i: number = 0; i < this.width; i++) {
          for (let j: number = 0; j < this.height; j++) {
            if (this.playgroundArray[i][j] === this.maxNumber) {
              let parentDiv: HTMLDivElement = document.getElementById(
                `${i}_${j}`
              ) as HTMLDivElement;
              //parentDiv.onmouseover = () => this.findWay(event as Event, i, j);
              parentDiv.onmouseover = () => this.test(event as Event, i, j);

              parentDiv.onclick = () => this.selectPlace(event as Event);
            }
          }
        }
      }
    }
  }

  test(event: Event, i: number, j: number) {
    const findWay = new FindWay(
      this.playgroundArray,
      this.selectedBall,
      this.arrayOfWayElements
    );
    findWay.findWay(event, i, j);
    this.arrayOfWayElements = findWay.newArrayOfWayElements;
    this.playgroundArray = findWay.newPlaygroundArray;
  }

  /**Select place to put ball
   * @param event event
   */
  selectPlace(event: Event) {
    const selectedDiv = event.target as HTMLDivElement;
    console.log(selectedDiv);
    if (selectedDiv.classList.contains("shortestWay")) {
      console.log("yes");
      this.playgroundArray[this.selectedBall.i][this.selectedBall.j] =
        this.maxNumber;

      let divOldPlace: HTMLDivElement = document.getElementById(
        `${this.selectedBall.i}_${this.selectedBall.j}_c`
      ) as HTMLDivElement;
      divOldPlace.remove();

      const IdNewPlace: string[] = selectedDiv.id.split("_");

      this.createBall(
        parseInt(IdNewPlace[0]),
        parseInt(IdNewPlace[1]),
        this.selectedBall.color,
        this.selectedBall.index
      );

      this.playgroundArray[parseInt(IdNewPlace[0])][parseInt(IdNewPlace[1])] ===
        this.selectedBall.index;

      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          let parentDiv: HTMLDivElement = document.getElementById(
            `${i}_${j}`
          ) as HTMLDivElement;
          parentDiv.onmouseover = () => {};
          parentDiv.onclick = () => {};
        }
      }

      this.selectedBall = { i: -1, j: -1, color: "", index: -1 };

      for (let z = 0; z < this.arrayOfWayElements.length; z++) {
        this.arrayOfWayElements[z].style.backgroundColor = "gray";
      }

      const actionBlockDiv: HTMLDivElement = document.createElement("div");
      actionBlockDiv.id = "block";
      actionBlockDiv.classList.add("block");
      this.rootDiv.appendChild(actionBlockDiv);

      setTimeout(() => this.nextRound(), 1000);
    }
  }

  /** Next round */
  @provocation
  nextRound() {
    const block: HTMLDivElement = document.getElementById(
      "block"
    ) as HTMLDivElement;
    block.remove();
    this.playgroundArray = cleanPath(
      this.arrayOfWayElements,
      this.playgroundArray
    );
    this.arrayOfWayElements = [];
    let beatingBalls = new BeatingBalls(this.playgroundArray, this.points);
    const flag: boolean = beatingBalls.beatingBalls();
    if (flag === false) {
      this.putBallsOnBoard();
      //this.beatingBalls();
      let nextBeatingBalls = new BeatingBalls(
        this.playgroundArray,
        this.points
      );
      let nextFlag = nextBeatingBalls.beatingBalls();
      if (nextFlag === true) {
        this.points = beatingBalls.newPoints;
        this.playgroundArray = beatingBalls.newPlaygroundArray;
      }

      let counter: number = 0;
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          if (this.playgroundArray[i][j] === this.maxNumber) {
            counter++;
          }
        }
      }

      if (counter === 0) {
        alert(`You lose \npoints:${this.points}`);
      }
    } else {
      this.points = beatingBalls.newPoints;
      this.playgroundArray = beatingBalls.newPlaygroundArray;
    }
  }

  /** Put balls On the free places on the board */
  putBallsOnBoard() {
    let index: number = 0;
    console.log(this.nextBallColors);

    let counter = 0;
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.playgroundArray[i][j] === this.maxNumber) {
          counter++;
        }
      }
    }

    if (counter >= 3) {
      while (index < 3) {
        const xCord: number = getRandomNumberFromRange(0, this.width);
        const yCord: number = getRandomNumberFromRange(0, this.height);

        if (this.playgroundArray[xCord][yCord] === this.maxNumber) {
          this.createBall(
            xCord,
            yCord,
            this.nextBallColors[index].color,
            this.nextBallColors[index].index
          );
          index++;
        }
      }
      console.log(this.nextBallColors);
      this.randomBallsColors();
    } else {
      alert(`przegrałeś \nzdobyłeś:${this.points}`);
    }
  }
}

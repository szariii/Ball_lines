/**Position of beating balls interface */
export interface BeatingBall {
    i: number;
    j: number;
  }

/**Position of selected ball */
export interface Position {
  i: number;
  j: number;
  color: string;
  index: number;
}

/**informations of color */
export interface Color {
  color: string;
  index: number;
}

/**interface of main class */
export interface Game {
  i: number;
  j: number;
}

/**interface of first free places to start counting length of way */
export interface PlaceConfiguration {
  i: number;
  j: number;
}

/**interface of filed with that field index */
export interface MoveCounter {
  i: number;
  j: number;
  indexNumber: number;
}

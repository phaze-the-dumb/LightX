export class LightColour{
  red: number; // Pos 7
  green: number; // Pos 8
  blue: number; // Pos 9

  time: number;
  selected: boolean = false;

  id: string;

  constructor(red: number, green: number, blue: number, time: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;

    this.time = time;

    this.id = Math.random().toString(16).replace('0.', '');
  }
}
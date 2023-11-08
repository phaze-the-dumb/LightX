export class LightStrobe{
  strobe: number; // Pos 6

  time: number;
  selected: boolean = false;

  id: string;

  constructor(strobe: number, time: number) {
    this.strobe = strobe;
    this.time = time;

    this.id = Math.random().toString(16).replace('0.', '');
  }
}
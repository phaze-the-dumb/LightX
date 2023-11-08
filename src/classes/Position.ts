export class LightPosition{
  pan: number; // Pos 0
  finePan: number; // Pos 1

  tilt: number; // Pos 2
  fineTilt: number; // Pos 3

  time: number;
  selected: boolean = false;

  id: string;

  constructor(pan: number, finePan: number, tilt: number, fineTilt: number, time: number) {
    this.pan = pan;
    this.finePan = finePan;

    this.tilt = tilt;
    this.fineTilt = fineTilt;

    this.time = time;

    this.id = Math.random().toString(16).replace('0.', '');
  }
}
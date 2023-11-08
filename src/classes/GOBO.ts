export class LightGOBO{
  selection: number; // Pos 11
  speed: number; // Pos 12

  time: number;
  selected: boolean = false;

  id: string;

  constructor(selection: number, speed: number, time: number){
    this.selection = selection;
    this.speed = speed;

    this.time = time;

    this.id = Math.random().toString(16).replace('0.', '');
  }
}
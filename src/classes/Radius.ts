export class LightRadius{
  radius: number; // Pos 4

  time: number;
  selected: boolean = false;

  id: string;

  constructor(radius: number, time: number) {
    this.radius = radius;
    this.time = time;

    this.id = Math.random().toString(16).replace('0.', '');
  }
}
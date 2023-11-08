export class LightIntensity{
  intensity: number; // Pos 5

  time: number;
  selected: boolean = false;

  id: string;

  constructor(intensity: number, time: number){
    this.intensity = intensity;
    this.time = time;

    this.id = Math.random().toString(16).replace('0.', '');
  }
}
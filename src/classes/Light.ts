import { LightColour } from "./Colour";
import { LightGOBO } from "./GOBO";
import { LightIntensity } from "./Intensity";
import { LightPosition } from "./Position";
import { LightRadius } from "./Radius";
import { LightStrobe } from "./Strobe";

export class Light{
  name: string;
  channel: number;

  positionTrack: Array<LightPosition>;
  colourTrack: Array<LightColour>;
  strobeTrack: Array<LightStrobe>;
  intensityTrack: Array<LightIntensity>;
  radiusTrack: Array<LightRadius>;
  goboTrack: Array<LightGOBO>;

  constructor( name: string, channel: number ){
    this.name = name;
    this.channel = channel;

    this.positionTrack = [ new LightPosition(0, 0, 0, 0, 0) ];
    this.colourTrack = [ new LightColour(1, 1, 1, 0) ];
    this.strobeTrack = [ new LightStrobe(0, 0) ];
    this.intensityTrack = [ new LightIntensity(0, 0) ];
    this.radiusTrack = [ new LightRadius(0, 0) ];
    this.goboTrack = [ new LightGOBO(0, 0, 0) ];
  }

  getDataAtTime( time: number ){
    let lastPos = this.positionTrack[0];
    let lastRad = this.radiusTrack[0];
    let lastInt = this.intensityTrack[0];
    let lastStr = this.strobeTrack[0];
    let lastCol = this.colourTrack[0];
    let lastGob = this.goboTrack[0];

    this.positionTrack.forEach(val => {
      if(
        val.time < time &&
        val.time > lastPos.time
      ){
        lastPos = val;
      }
    })

    this.radiusTrack.forEach(val => {
      if(
        val.time < time &&
        val.time > lastRad.time
      ){
        lastRad = val;
      }
    })

    this.intensityTrack.forEach(val => {
      if(
        val.time < time &&
        val.time > lastInt.time
      ){
        lastInt = val;
      }
    })

    this.strobeTrack.forEach(val => {
      if(
        val.time < time &&
        val.time > lastStr.time
      ){
        lastStr = val;
      }
    })

    this.colourTrack.forEach(val => {
      if(
        val.time < time &&
        val.time > lastCol.time
      ){
        lastCol = val;
      }
    })

    this.goboTrack.forEach(val => {
      if(
        val.time < time &&
        val.time > lastGob.time
      ){
        lastGob = val;
      }
    })

    return { lastPos, lastCol, lastGob, lastStr, lastInt, lastRad };
  }

  toWSString( time: number ): string {
    let lastPos = this.positionTrack[0];
    let lastRad = this.radiusTrack[0];
    let lastInt = this.intensityTrack[0];
    let lastStr = this.strobeTrack[0];
    let lastCol = this.colourTrack[0];
    let lastGob = this.goboTrack[0];

    this.positionTrack.forEach(val => {
      if(
        val.time < time &&
        val.time > lastPos.time
      ){
        lastPos = val;
      }
    })

    this.radiusTrack.forEach(val => {
      if(
        val.time < time &&
        val.time > lastRad.time
      ){
        lastRad = val;
      }
    })

    this.intensityTrack.forEach(val => {
      if(
        val.time < time &&
        val.time > lastInt.time
      ){
        lastInt = val;
      }
    })

    this.strobeTrack.forEach(val => {
      if(
        val.time < time &&
        val.time > lastStr.time
      ){
        lastStr = val;
      }
    })

    this.colourTrack.forEach(val => {
      if(
        val.time < time &&
        val.time > lastCol.time
      ){
        lastCol = val;
      }
    })

    this.goboTrack.forEach(val => {
      if(
        val.time < time &&
        val.time > lastGob.time
      ){
        lastGob = val;
      }
    })

    return this.channel + ',' +
      lastPos.pan + ',' +
      lastPos.finePan + ',' +
      lastPos.tilt + ',' +
      lastPos.fineTilt + ',' +
      lastRad.radius + ',' +
      lastInt.intensity + ',' +
      lastStr.strobe + ',' +
      lastCol.red + ',' +
      lastCol.green + ',' +
      lastCol.blue + ',' +
      lastGob.speed + ',' +
      lastGob.selection;
  }

  toJSON(){
    return {
      name: this.name,
      channel: this.channel,

      tracks: {
        position: this.positionTrack,
        colour: this.colourTrack,
        strobe: this.strobeTrack,
        intensity: this.intensityTrack,
        radius: this.radiusTrack,
        gobo: this.goboTrack
      }
    }
  }
}
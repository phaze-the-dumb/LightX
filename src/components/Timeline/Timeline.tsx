import { createEffect, onMount, For } from 'solid-js';
import { Light } from '../../classes/Light';
import './Timeline.css'
import LightAnims from './Timeline/LightAnim';

import { LightPosition } from '../../classes/Position';
import { LightColour } from '../../classes/Colour';
import { LightGOBO } from '../../classes/GOBO';
import { LightIntensity } from '../../classes/Intensity';
import { LightRadius } from '../../classes/Radius';
import { LightStrobe } from '../../classes/Strobe';

class TimelineArgs{
  audioTime!: () => number;
  audioLength!: () => number;
  changeTime!: ( time: number ) => void;
  audio!: HTMLAudioElement;
  lightScroll!: () => number;
  setLightScroll!: ( scroll: number ) => number;
  lights!: () => Array<Light>;
  enableInspector!: ( enabled: boolean ) => boolean;
  scale!: () => number;
  offset!: () => number;

  selectedMarker!: () => LightPosition | LightColour | LightGOBO | LightIntensity | LightRadius | LightStrobe | null;
  setSelectedMarker!: ( marker: LightPosition | LightColour | LightGOBO | LightIntensity | LightRadius | LightStrobe | null ) => LightPosition | LightColour | LightGOBO | LightIntensity | LightRadius | LightStrobe | null;
}

let Timeline = ( { audioTime, audioLength, changeTime, audio, lightScroll, setLightScroll, lights, enableInspector, setSelectedMarker, selectedMarker, scale, offset }: TimelineArgs ) => {
  let timeLineLine: HTMLElement;
  let timeLine: HTMLElement;

  onMount(() => {
    let isMouseDown = false;
    let isPlaying = false;
    let wasPlaying = false;

    timeLine.onscroll = () => {
      setLightScroll(timeLine.scrollTop);
    }

    createEffect(() => {
      timeLine.scrollTo(0, lightScroll());
    })

    audio.onplay = () => isPlaying = true;
    audio.onpause = () => isPlaying = false;

    timeLineLine.onmousedown = ( e: MouseEvent ) => {
      wasPlaying = isPlaying;

      audio.pause();
      isMouseDown = true;

      changeTime(((e.clientX - 50) / (window.innerWidth - 50)) * audioLength());
    }

    window.addEventListener('mouseup', () => {
      if(isMouseDown){
        isMouseDown = false;

        if(wasPlaying)
          audio.play();
      }
    })

    window.addEventListener('mousemove', ( e: MouseEvent ) => {
      if(isMouseDown)
        changeTime(((e.clientX - 50) / (window.innerWidth - 50)) * audioLength());
    })
  })

  return (
    <div class="timeline" ref={( el ) => timeLine = el}>
      <div class="timeline-line" ref={( el ) => timeLineLine = el}>
        <div class="pointer" style={{ left: Math.floor(((window.innerWidth - 50) / audioLength()) * audioTime()) - 10 + 'px' }}></div>
        <div class="pointer-line" style={{ left: Math.floor(((window.innerWidth - 50) / audioLength()) * audioTime()) + 'px' }}></div>
      </div>

      <div class="timeline-pointer" style={{ left: Math.floor(((window.innerWidth - 50) / audioLength()) * audioTime()) * scale() + 50 + offset() + 'px' }}></div>

      <div style={ `margin-bottom: 35px` }></div>

      <For each={lights()}>
        {( light ) => (
          <LightAnims light={light} audio={audio} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} enableInspector={enableInspector} scale={scale} offset={offset} />
        )}
      </For>

      <div class="light-anims"></div>
    </div>
  )
}

export default Timeline
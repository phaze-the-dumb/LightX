import { onMount } from "solid-js";
import { Light } from "../../../classes/Light";

import { LightPosition } from "../../../classes/Position";
import { LightColour } from "../../../classes/Colour";
import { LightGOBO } from "../../../classes/GOBO";
import { LightIntensity } from "../../../classes/Intensity";
import { LightRadius } from "../../../classes/Radius";
import { LightStrobe } from "../../../classes/Strobe";

class LightAnimsArgs{
  light!: Light;
  audio!: HTMLAudioElement;
  enableInspector!: ( enabled: boolean ) => boolean;
  scale!: () => number;
  offset!: () => number;

  selectedMarker!: () => LightPosition | LightColour | LightGOBO | LightIntensity | LightRadius | LightStrobe | null;
  setSelectedMarker!: ( marker: LightPosition | LightColour | LightGOBO | LightIntensity | LightRadius | LightStrobe | null ) => LightPosition | LightColour | LightGOBO | LightIntensity | LightRadius | LightStrobe | null;
}

let LightAnims = ( { light, audio, enableInspector, setSelectedMarker, selectedMarker, scale, offset }: LightAnimsArgs ) => {
  let container: HTMLElement;
  let canvas: HTMLCanvasElement;

  let positionTrack: HTMLElement;
  let intensityTrack: HTMLElement;
  let colourTrack: HTMLElement;
  let strobeTrack: HTMLElement;
  let radiusTrack: HTMLElement;
  let goboTrack: HTMLElement;

  onMount(() => {
    canvas.height = 140;
    canvas.width = container.clientWidth;

    let ctx = canvas.getContext("2d")!;

    ctx.fillStyle = '#fff';

    // Position Tracks
    positionTrack.oncontextmenu = ( e: MouseEvent ) => {
      for (let i = 0; i < light.positionTrack.length; i++) {
        let m = light.positionTrack[i];

        if(
          e.clientX - 50 > (m.time / audio.duration) * canvas.width * scale() + offset() - 5 &&
          e.clientX - 50 < (m.time / audio.duration) * canvas.width * scale() + offset()  + 5
        ) {
          light.positionTrack = light.positionTrack.filter(x => x.id !== m.id);

          let marker = selectedMarker();
          if(marker && marker.id == m.id)
            enableInspector(false);

          break;
        }
      }
    }

    positionTrack.onclick = ( e: MouseEvent ) => {
      e.preventDefault();

      if(e.button === 0){
        let isClicked = false;

        for (let i = 0; i < light.positionTrack.length; i++) {
          let m = light.positionTrack[i];

          if(
            e.clientX - 50 > (m.time / audio.duration) * canvas.width * scale() + offset() - 5 &&
            e.clientX - 50 < (m.time / audio.duration) * canvas.width * scale() + offset()   + 5
          ) {
            isClicked = true;
            enableInspector(true);

            setSelectedMarker(m);
            break;
          }
        }

        if(!isClicked)
          light.positionTrack.push(new LightPosition(0, 0, 0, 0, (((e.clientX - 50) / canvas.width / scale()) - (offset() / canvas.width / scale())) * audio.duration));
      }
    }

    // Intensity Tracks
    intensityTrack.oncontextmenu = ( e: MouseEvent ) => {
      for (let i = 0; i < light.intensityTrack.length; i++) {
        let m = light.intensityTrack[i];

        if(
          e.clientX - 50 > (m.time / audio.duration) * canvas.width * scale() + offset()  - 5 &&
          e.clientX - 50 < (m.time / audio.duration) * canvas.width * scale() + offset() + 5
        ) {
          light.intensityTrack = light.intensityTrack.filter(x => x.id !== m.id);

          let marker = selectedMarker();
          if(marker && marker.id == m.id)
            enableInspector(false);

          break;
        }
      }
    }

    intensityTrack.onclick = ( e: MouseEvent ) => {
      e.preventDefault();

      if(e.button === 0){
        let isClicked = false;

        for (let i = 0; i < light.intensityTrack.length; i++) {
          let m = light.intensityTrack[i];

          if(
            e.clientX - 50 > (m.time / audio.duration) * canvas.width * scale() + offset() - 5 &&
            e.clientX - 50 < (m.time / audio.duration) * canvas.width * scale() + offset() + 5
          ) {
            isClicked = true;
            enableInspector(true);

            setSelectedMarker(m);
            break;
          }
        }

        if(!isClicked)
          light.intensityTrack.push(new LightIntensity(0, (((e.clientX - 50) / canvas.width / scale()) - (offset() / canvas.width / scale())) * audio.duration));
      }
    }

    // Colour Track
    colourTrack.oncontextmenu = ( e: MouseEvent ) => {
      for (let i = 0; i < light.colourTrack.length; i++) {
        let m = light.colourTrack[i];

        if(
          e.clientX - 50 > (m.time / audio.duration) * canvas.width * scale() + offset() - 5 &&
          e.clientX - 50 < (m.time / audio.duration) * canvas.width * scale() + offset() + 5
        ) {
          light.colourTrack = light.colourTrack.filter(x => x.id !== m.id);

          let marker = selectedMarker();
          if(marker && marker.id == m.id)
            enableInspector(false);

          break;
        }
      }
    }

    colourTrack.onclick = ( e: MouseEvent ) => {
      e.preventDefault();

      if(e.button === 0){
        let isClicked = false;

        for (let i = 0; i < light.colourTrack.length; i++) {
          let m = light.colourTrack[i];

          if(
            e.clientX - 50 > (m.time / audio.duration) * canvas.width * scale() + offset() - 5 &&
            e.clientX - 50 < (m.time / audio.duration) * canvas.width * scale() + offset() + 5
          ) {
            isClicked = true;
            enableInspector(true);

            setSelectedMarker(m);
            break;
          }
        }

        if(!isClicked)
          light.colourTrack.push(new LightColour(1, 1, 1, (((e.clientX - 50) / canvas.width / scale()) - (offset() / canvas.width / scale())) * audio.duration));
      }
    }

    // Strobe Track
    strobeTrack.oncontextmenu = ( e: MouseEvent ) => {
      for (let i = 0; i < light.strobeTrack.length; i++) {
        let m = light.strobeTrack[i];

        if(
          e.clientX - 50 > (m.time / audio.duration) * canvas.width * scale() + offset() - 5 &&
          e.clientX - 50 < (m.time / audio.duration) * canvas.width * scale() + offset() + 5
        ) {
          light.strobeTrack = light.strobeTrack.filter(x => x.id !== m.id);

          let marker = selectedMarker();
          if(marker && marker.id == m.id)
            enableInspector(false);

          break;
        }
      }
    }

    strobeTrack.onclick = ( e: MouseEvent ) => {
      e.preventDefault();

      if(e.button === 0){
        let isClicked = false;

        for (let i = 0; i < light.strobeTrack.length; i++) {
          let m = light.strobeTrack[i];

          if(
            e.clientX - 50 > (m.time / audio.duration) * canvas.width * scale() + offset() - 5 &&
            e.clientX - 50 < (m.time / audio.duration) * canvas.width * scale() + offset() + 5
          ) {
            isClicked = true;
            enableInspector(true);

            setSelectedMarker(m);
            break;
          }
        }

        if(!isClicked)
          light.strobeTrack.push(new LightStrobe(0, (((e.clientX - 50) / canvas.width / scale()) - (offset() / canvas.width / scale())) * audio.duration));
      }
    }

    // Radius Track
    radiusTrack.oncontextmenu = ( e: MouseEvent ) => {
      for (let i = 0; i < light.radiusTrack.length; i++) {
        let m = light.radiusTrack[i];

        if(
          e.clientX - 50 > (m.time / audio.duration) * canvas.width * scale() + offset() - 5 &&
          e.clientX - 50 < (m.time / audio.duration) * canvas.width * scale() + offset() + 5
        ) {
          light.radiusTrack = light.radiusTrack.filter(x => x.id !== m.id);

          let marker = selectedMarker();
          if(marker && marker.id == m.id)
            enableInspector(false);

          break;
        }
      }
    }

    radiusTrack.onclick = ( e: MouseEvent ) => {
      e.preventDefault();

      if(e.button === 0){
        let isClicked = false;

        for (let i = 0; i < light.radiusTrack.length; i++) {
          let m = light.radiusTrack[i];

          if(
            e.clientX - 50 > (m.time / audio.duration) * canvas.width * scale() + offset() - 5 &&
            e.clientX - 50 < (m.time / audio.duration) * canvas.width * scale() + offset() + 5
          ) {
            isClicked = true;
            enableInspector(true);

            setSelectedMarker(m);
            break;
          }
        }

        if(!isClicked)
          light.radiusTrack.push(new LightRadius(0, (((e.clientX - 50) / canvas.width / scale()) - (offset() / canvas.width / scale())) * audio.duration));
      }
    }

    // GOBO Track
    goboTrack.oncontextmenu = ( e: MouseEvent ) => {
      for (let i = 0; i < light.goboTrack.length; i++) {
        let m = light.goboTrack[i];

        if(
          e.clientX - 50 > (m.time / audio.duration) * canvas.width * scale() + offset() - 5 &&
          e.clientX - 50 < (m.time / audio.duration) * canvas.width * scale() + offset() + 5
        ) {
          light.goboTrack = light.goboTrack.filter(x => x.id !== m.id);

          let marker = selectedMarker();
          if(marker && marker.id == m.id)
            enableInspector(false);

          break;
        }
      }
    }

    goboTrack.onclick = ( e: MouseEvent ) => {
      e.preventDefault();

      if(e.button === 0){
        let isClicked = false;

        for (let i = 0; i < light.goboTrack.length; i++) {
          let m = light.goboTrack[i];

          if(
            e.clientX - 50 > (m.time / audio.duration) * canvas.width * scale() + offset() - 5 &&
            e.clientX - 50 < (m.time / audio.duration) * canvas.width * scale() + offset() + 5
          ) {
            isClicked = true;
            enableInspector(true);

            setSelectedMarker(m);
            break;
          }
        }

        if(!isClicked)
          light.goboTrack.push(new LightGOBO(0, 0, (((e.clientX - 50) / canvas.width / scale()) - (offset() / canvas.width / scale())) * audio.duration));
      }
    }

    let render = () => {
      requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let sca = scale();

      light.positionTrack.forEach(m => {
        ctx.fillStyle = '#fff';
        ctx.fillRect((m.time / audio.duration) * canvas.width * sca + offset() - 5, 10, 10, 10);
      })

      light.intensityTrack.forEach(m => {
        ctx.fillStyle = 'rgb(' + m.intensity * 255 + ', ' + m.intensity * 255 + ', ' + m.intensity * 255 + ')';
        ctx.fillRect((m.time / audio.duration) * canvas.width * sca + offset() - 5, 36, 10, 10);
      })

      light.colourTrack.forEach(m => {
        ctx.fillStyle = 'rgb(' + m.red * 255 + ', ' + m.green * 255 + ', ' + m.blue * 255 + ')';
        ctx.fillRect((m.time / audio.duration) * canvas.width * sca + offset() - 5, 57, 10, 10);
      })

      light.strobeTrack.forEach(m => {
        ctx.fillStyle = 'rgb(' + m.strobe * 255 + ', ' + m.strobe * 255 + ', ' + m.strobe * 255 + ')';
        ctx.fillRect((m.time / audio.duration) * canvas.width * sca + offset() - 5, 77, 10, 10);
      })

      light.radiusTrack.forEach(m => {
        ctx.fillStyle = 'rgb(' + m.radius * 255 + ', ' + m.radius * 255 + ', ' + m.radius * 255 + ')';
        ctx.fillRect((m.time / audio.duration) * canvas.width * sca + offset() - 5, 98, 10, 10);
      })

      light.goboTrack.forEach(m => {
        ctx.fillStyle = '#fff';
        ctx.fillRect((m.time / audio.duration) * canvas.width * sca + offset() - 5, 121, 10, 10);
      })
    }

    render();
  })

  return (
    <div class="light-anims" ref={( el ) => container = el}>
      <div class="position-section" ref={( el ) => positionTrack = el}>Position</div>
      <div class="intensity-section" ref={( el ) => intensityTrack = el}>Intensity</div>
      <div class="colour-section" ref={( el ) => colourTrack = el}>Colour</div>
      <div class="strobe-section" ref={( el ) => strobeTrack = el}>Strobe</div>
      <div class="radius-section" ref={( el ) => radiusTrack = el}>Radius</div>
      <div class="gobo-section" ref={( el ) => goboTrack = el}>GOBO</div>
      <canvas class="background-canvas" ref={( el ) => canvas = el}></canvas>
    </div>
  )
}

export default LightAnims
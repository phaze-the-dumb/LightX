import './Inspector.css'
import { createSignal, onMount, createEffect } from 'solid-js';

import { LightPosition } from '../../classes/Position';
import { LightColour } from '../../classes/Colour';
import { LightGOBO } from '../../classes/GOBO';
import { LightIntensity } from '../../classes/Intensity';
import { LightRadius } from '../../classes/Radius';
import { LightStrobe } from '../../classes/Strobe';

class InspectorArgs{
  active!: () => boolean;
  enableInspector!: ( enabled: boolean ) => boolean;

  selectedMarker!: () => LightPosition | LightColour | LightGOBO | LightIntensity | LightRadius | LightStrobe | null;
}

let Inspector = ( { active, enableInspector, selectedMarker }: InspectorArgs ) => {
  let [ top, setTop ] = createSignal((window.innerHeight / 2) - 200);
  let [ left, setLeft ] = createSignal((window.innerWidth / 2) - 150);

  let header: HTMLElement;
  let headerClose: HTMLElement;

  onMount(() => {
    let isMouseDown = false;
    let offsetX = 0;
    let offsetY = 0;

    header.onmousedown = ( e: MouseEvent ) => {
      offsetX = e.clientX - left();
      offsetY = e.clientY - top();

      isMouseDown = true;
    }

    window.addEventListener('mousemove', ( e: MouseEvent ) => {
      if(isMouseDown){
        setTop(e.clientY - offsetY);
        setLeft(e.clientX - offsetX);
      }
    });

    window.addEventListener('mouseup', ( e: MouseEvent ) => {
      if(isMouseDown){
        setTop(e.clientY - offsetY);
        setLeft(e.clientX - offsetX);

        isMouseDown = false;
      }
    });

    headerClose.onclick = () => {
      enableInspector(false);
    }
  })

  let [ content, setContent ] = createSignal((<></>));

  createEffect(() => {
    let m = selectedMarker();

    if(m instanceof LightPosition){
      setContent((
        <>
          <div class="header">Position</div>

          Pan<br />
          <input type="range" min="0" max="1" step="0.1" value={ m.pan } onChange={el => m instanceof LightPosition ? m.pan = parseFloat(el.target.value) : 0 }></input><br />

          Fine Pan<br />
          <input type="range" min="0" max="1" step="0.1" value={ m.finePan } onChange={el => m instanceof LightPosition ? m.finePan = parseFloat(el.target.value) : 0 }></input><br /><br />

          Tilt<br />
          <input type="range" min="0" max="1" step="0.1" value={ m.tilt } onChange={el => m instanceof LightPosition ? m.tilt = parseFloat(el.target.value) : 0 }></input><br />

          Fine Tilt<br />
          <input type="range" min="0" max="1" step="0.1" value={ m.fineTilt } onChange={el => m instanceof LightPosition ? m.fineTilt = parseFloat(el.target.value) : 0 }></input><br /><br />
        </>
      ))
    } else if(m instanceof LightIntensity){
      setContent((
        <>
          <div class="header">Intensity</div>

          Intensity<br />
          <input type="range" min="0" max="1" step="0.1" value={ m.intensity } onChange={el => m instanceof LightIntensity ? m.intensity = parseFloat(el.target.value) : 0 }></input><br />
        </>
      ))
    } else if(m instanceof LightGOBO){
      setContent((
        <>
          <div class="header">GOBO</div>

          Selection<br />
          <input type="range" min="1" max="6" step="1" value={ m.selection * 6 } onChange={el => m instanceof LightGOBO ? m.selection = parseFloat(el.target.value) / 6 : 0 }></input><br />

          Speed<br />
          <input type="range" min="0" max="1" step="0.1" value={ m.speed } onChange={el => m instanceof LightGOBO ? m.speed = parseFloat(el.target.value) : 0 }></input><br />
        </>
      ))
    } else if(m instanceof LightRadius){
      setContent((
        <>
          <div class="header">Radius</div>

          Radius<br />
          <input type="range" min="0" max="1" step="0.1" value={ m.radius } onChange={el => m instanceof LightRadius ? m.radius = parseFloat(el.target.value) : 0 }></input><br />
        </>
      ))
    } else if(m instanceof LightStrobe){
      setContent((
        <>
          <div class="header">Strobe</div>

          Strobe<br />
          <input type="range" min="0" max="1" step="0.1" value={ m.strobe } onChange={el => m instanceof LightStrobe ? m.strobe = parseFloat(el.target.value) : 0 }></input><br />
        </>
      ))
    } else if(m instanceof LightColour){
      setContent((
        <>
          <div class="header">Colour</div>

          Red<br />
          <input type="range" min="0" max="1" step="0.1" value={ m.red } onChange={el => m instanceof LightColour ? m.red = parseFloat(el.target.value) : 0 }></input><br />

          Green<br />
          <input type="range" min="0" max="1" step="0.1" value={ m.green } onChange={el => m instanceof LightColour ? m.green = parseFloat(el.target.value) : 0 }></input><br />

          Blue<br />
          <input type="range" min="0" max="1" step="0.1" value={ m.blue } onChange={el => m instanceof LightColour ? m.blue = parseFloat(el.target.value) : 0 }></input><br />
        </>
      ))
    }
  })

  return (
    <div class="inspector" style={{ top: top() + 'px', left: left() + 'px', display: active() ? 'block' : 'none' }}>
      <div class="inspector-header" ref={( el ) => header = el}>Inspector</div>
      <div class="close-header" ref={el => headerClose = el}><i class="fa-solid fa-xmark"></i></div>

      <div class="content">{ content() }</div>
    </div>
  )
}

export default Inspector;
import { createEffect, onMount, For } from 'solid-js';
import { Light } from '../../classes/Light';
import './Sidebar.css'

class SidebarArgs{
  lightScroll!: () => number;
  setLightScroll!: ( scroll: number ) => number;
  lights!: () => Array<Light>;
  setLights!: ( lights: Array<Light> ) => Array<Light>;
  setEditorOpen!: ( editorOpen: boolean ) => boolean;
  setEditorLight!: ( editorLight: Light ) => Light;
  ws!: WebSocket
}

let Sidebar = ( { lightScroll, setLightScroll, lights, setLights, setEditorOpen, setEditorLight, ws }: SidebarArgs ) => {
  let scrollBar: HTMLElement;

  onMount(() => {
    scrollBar.onscroll = () => {
      setLightScroll(scrollBar.scrollTop)
    }

    createEffect(() => {
      scrollBar.scrollTo(0, lightScroll());
    })
  })

  let createLight = () => {
    let l = lights()
    let light = new Light('Light ' + (lights().length + 1), lights().length);

    l.push(light);
    setLights(l);
  }

  let removeTrack = ( light: Light ) => {
    let l = lights();
    l = l.filter(li => li !== light);

    setLights(l);
    ws.send(light.channel + ',0,0,0,0,0,0,0,0,0,0,0,0,0');
  }

  return (
    <div class="sidebar">
      <div class="lights-label">Lights</div>
      <div class="sidebar-lights"  ref={( el ) => scrollBar = el}>
        <div style={ 'margin-bottom: 1px;' }></div>

        <For each={lights()}>
          {( light ) => (
            <div class="light-label" onContextMenu={() => removeTrack(light)} onClick={() => { setEditorLight(light); setEditorOpen(true) }}>{ light.name }</div>
          )}
        </For>

        <div class="light-label" onClick={createLight}>+</div>
      </div>
    </div>
  )
}

export default Sidebar
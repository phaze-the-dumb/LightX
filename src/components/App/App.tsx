import AudioBar from '../AudioBar/AudioBar'
import Setup from '../Setup/Setup'
import Sidebar from '../Sidebar/Sidebar';
import Timeline from '../Timeline/Timeline'
import './App.css'

import { Light } from '../../classes/Light';

import { LightPosition } from '../../classes/Position';
import { LightColour } from '../../classes/Colour';
import { LightGOBO } from '../../classes/GOBO';
import { LightIntensity } from '../../classes/Intensity';
import { LightRadius } from '../../classes/Radius';
import { LightStrobe } from '../../classes/Strobe';

import { Match, Switch, createSignal, createEffect } from 'solid-js';
import LightTrackEditor from '../LightTrackEditor/LightTrackEditor';
import Inspector from '../Inspector/Inspector';

let App = () => {
  let audio = new Audio();
  let ws = new WebSocket('ws://127.0.0.1:8080');

  let isWSOpen = false;

  ws.onopen = () => { isWSOpen = true };

  let [ audioLength, setAudioLength ] = createSignal(audio.duration);
  let [ audioTime, setAudioTime ] = createSignal(audio.currentTime);
  let [ lightScroll, setLightScroll ] = createSignal(0);
  let [ lights, setLights ] = createSignal<Array<Light>>([], { equals: false });
  let [ editorOpen, setEditorOpen ] = createSignal(false);
  let [ editorLight, setEditorLight ] = createSignal<Light | null>(null);
  let [ projectName, setProjectName ] = createSignal("untitled");
  let [ editingText, setEditingText ] = createSignal(false);
  let [ activeInspector, setActiveInspector ] = createSignal(false);
  let [ selectedMarker, setSelectedMarker ] = createSignal<LightPosition | LightColour | LightGOBO | LightIntensity | LightRadius | LightStrobe | null>(null);
  let [ scale, setScale ] = createSignal(1);
  let [ offset, setOffset ] = createSignal(0);

  createEffect(() => {
    if(!activeInspector())
      setSelectedMarker(null);
  })

  audio.onloadeddata = () => {
    setAudioLength(audio.duration);
  }

  let changeTime = ( time: number ) => {
    audio.currentTime = time;
  }

  window.oncontextmenu = ( e: MouseEvent ) => { e.preventDefault(); }

  window.addEventListener('wheel', ( e: WheelEvent ) => {
    if(e.shiftKey){
      e.preventDefault();

      let newScale = scale() - e.deltaY / 100;

      if(newScale < 1)
        newScale = 1;

      if(newScale > 7)
        newScale = 7;

      setScale(newScale);
    }
  })

  let render = () => {
    requestAnimationFrame(render);

    if(isWSOpen) {
      let str = lights().map(x => x.toWSString(audio.currentTime)).join('|');
      ws.send(str);
    }
  }

  render();

  return (
    <>
      <AudioBar
        audio={audio}
        audioTime={audioTime}
        audioLength={audioLength}
        setAudioTime={setAudioTime}
        projectName={projectName}
        changeTime={changeTime}
        setProjectName={setProjectName}
        editingText={editingText}
        setEditingText={setEditingText}
        lights={lights}
        scale={scale}
        offset={offset}
        setOffset={setOffset}
      />

      <Timeline
        audio={audio}
        audioTime={audioTime}
        audioLength={audioLength}
        changeTime={changeTime}
        lightScroll={lightScroll}
        setLightScroll={setLightScroll}
        lights={lights}
        enableInspector={setActiveInspector}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        scale={scale}
        offset={offset}
      />

      <Setup
        audio={audio}
        setProjectName={setProjectName}
      />

      <Sidebar
        lightScroll={lightScroll}
        setLightScroll={setLightScroll}
        lights={lights}
        setLights={setLights}
        setEditorOpen={setEditorOpen}
        setEditorLight={setEditorLight}
        ws={ws}
      />

      <Switch>
        <Match when={editorOpen()}>
          <LightTrackEditor editorLight={editorLight} setEditorOpen={setEditorOpen} lights={lights} setLights={setLights} setEditingText={setEditingText} ws={ws} />
        </Match>
      </Switch>

      <Inspector active={activeInspector} enableInspector={setActiveInspector} selectedMarker={selectedMarker} />
    </>
  )
}

export default App

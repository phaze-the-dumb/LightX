import { onMount, createSignal, Switch, Match, createEffect } from 'solid-js';
import { Light } from '../../classes/Light'
import './LightTrackEditor.css'

class LightTrackEditorArgs{
  editorLight!: () => Light | null;
  setEditorOpen!: ( open: boolean ) => boolean;
  lights!: () => Array<Light>;
  setLights!: ( lights: Array<Light> ) => Array<Light>;
  setEditingText!: ( editing: boolean ) => boolean;
  ws!: WebSocket
}

let LightTrackEditor = ( { editorLight, setEditorOpen, lights, setLights, setEditingText, ws }: LightTrackEditorArgs ) => {
  let light = editorLight();
  let channelInput: HTMLInputElement;

  let [ editingName, setEditingName ] = createSignal(false);

  createEffect(() => {
    setEditingText(editingName());
  })

  if(!light){
    return (
      <>
        <div class="editor-blackout"></div>
        <div class="editor-panel">
            No Light Selected

          <div class="close-button" onClick={() => setEditorOpen(false)}>Close</div>
        </div>
      </>
    )
  }

  onMount(() => {
    channelInput.onchange = () => {
      if(!light)return;
      ws.send(light.channel + ',0,0,0,0,0,0,0,0,0,0,0,0,0');

      light.channel = parseInt(channelInput.value);
    }
  })

  let removeLight = () => {
    let l = lights();
    l = l.filter(li => li !== light);

    setLights(l);

    if(light)
      ws.send(light.channel + ',0,0,0,0,0,0,0,0,0,0,0,0,0');
  }

  let trackNameInput: HTMLInputElement;
  let trackNameKeyDown = ( e: KeyboardEvent ) => {
    if(!light)return;

    if(e.key === 'Enter'){
      light.name = trackNameInput.value;
      let lits = lights();

      setLights([]);
      setLights(lits);
    }
  }

  return (
    <>
      <div class="editor-blackout"></div>
      <div class="editor-panel">
        <div class="editor-header">
          <Switch>
            <Match when={editingName()}>
            <input
              value={light.name}
              onChange={
                ( el ) => {
                  if(!light)return;

                  light.name = el.currentTarget.value;
                  setEditingName(false);

                  let lits = lights();
                  setLights([]);

                  setLights(lits);
                }
              }
              onKeyDown={trackNameKeyDown}
              ref={( el ) => trackNameInput = el}
            />
            </Match>
            <Match when={!editingName()}>
              <div onClick={() => setEditingName(true)}>{light.name}</div>
            </Match>
          </Switch>
        </div>

        <div class="editor-info">
          Channel: <input type="number" value={light.channel} ref={( el ) => channelInput = el} />
        </div>

        <div class="remove-button" onClick={() => { setEditorOpen(false); removeLight() }}>Remove Track</div>
        <div class="close-button" onClick={() => setEditorOpen(false)}>Close</div>
      </div>
    </>
  )
}

export default LightTrackEditor
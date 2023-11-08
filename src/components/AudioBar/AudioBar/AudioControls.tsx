import { createSignal, Match, Switch, createEffect } from "solid-js"
import { Light } from "../../../classes/Light";

class AudioControlsArgs{
  audio!: HTMLAudioElement;
  audioTime!: () => number;
  generateWaveform!: () => void;
  getWaveform!: () => Array<number>;
  projectName!: () => string;
  setProjectName!: ( name: string ) => string;
  changeTime!: ( time: number ) => void;
  editingText!: () => boolean;
  setEditingText!: ( editing: boolean ) => boolean;
  lights!: () => Array<Light>;
}

let AudioControls = ( { audio, audioTime, generateWaveform, getWaveform, projectName, setProjectName, changeTime, editingText, setEditingText, lights }: AudioControlsArgs ) => {
  let [ dropdown, setDropdown ] = createSignal(0);
  let [ playing, setPlaying ] = createSignal(false);
  let [ editingName, setEditingName ] = createSignal(false);

  createEffect(() => {
    setEditingText(editingName());
  })

  let projectNameInput: HTMLInputElement;

  let saveFile = () => {
    setDropdown(0);

    let data = {
      waveFormData: getWaveform(),
      audio: audio.src,
      lights: lights().map(l => l.toJSON())
    };

    let link = document.createElement('a');
    link.download = projectName() + '.lit';
    link.href = 'data:text/html,'+JSON.stringify(data);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    link.remove();
  }

  let waveform = () => {
    setDropdown(0);
    generateWaveform();
  }

  audio.addEventListener('play', () => {
    setPlaying(true)
  })

  audio.addEventListener('pause', () => {
    setPlaying(false)
  })

  window.addEventListener('keyup', ( e: KeyboardEvent ) => {
    if(editingText())return;

    if(e.key === 'ArrowLeft'){
      e.preventDefault();
      audio.pause();

      changeTime(audio.currentTime - 5);
      audio.play();
    } else if(e.key === 'ArrowRight'){
      e.preventDefault();
      audio.pause();

      changeTime(audio.currentTime + 5);
      audio.play();
    } else if(e.key === ' '){
      e.preventDefault();

      if(playing()){
        audio.pause();
      } else{
        audio.play();
      }
    }
  })

  let projNameKeyDown = ( e: KeyboardEvent ) => {
    if(e.key === 'Enter'){
      setEditingName(false);
      setProjectName(projectNameInput.value);
    }
  }

  return (
    <>
      <div class="audio-controls">
        <div class="button-container">
          <Switch>
            <Match when={!playing()}>
              <div onClick={() => audio.play()}>
                <i class="fa-solid fa-play"></i>
              </div>
            </Match>
            <Match when={playing()}>
              <div onClick={() => audio.pause()}>
                <i class="fa-solid fa-pause"></i>
              </div>
            </Match>
          </Switch>
          <div>{audioTime().toFixed(2)}</div>
          <div style={{ width: '200%' }}>
            <Switch>
              <Match when={editingName()}>
                <input
                  value={projectName()}
                  onChange={
                    ( el ) => {
                      setProjectName(el.currentTarget.value);
                      setEditingName(false)
                    }
                  }
                  onKeyDown={projNameKeyDown}
                  ref={( el ) => projectNameInput = el}
                />
              </Match>
              <Match when={!editingName()}>
                <div onClick={() => setEditingName(true)}>{projectName()}.lit</div>
              </Match>
            </Switch>
          </div>
        </div>

        <div class="extra">
          <div class="dropdown" onClick={() => setDropdown(1)}>File</div>
          <div class="dropdown" onClick={() => setDropdown(2)}>Edit</div>
        </div>

        <Switch>
          <Match when={dropdown() !== 0}>
            <div class="extras-menu" onClick={() => setDropdown(0)}></div>

            <div class="extras-content">
              <Switch>
                <Match when={dropdown() === 1}>
                  <div class="dropdown-item" onClick={saveFile}>Save</div>
                </Match>
                <Match when={dropdown() === 2}>
                  <div class="dropdown-item" onClick={waveform}>Generate Waveform</div>
                </Match>
              </Switch>
            </div>
          </Match>
        </Switch>
      </div>
      <Switch>
        <Match when={dropdown() !== 0}>
          <div class="extras-menu" onClick={() => setDropdown(0)}></div>
        </Match>
      </Switch>
    </>
  )
}

export default AudioControls
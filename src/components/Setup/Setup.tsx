import './Setup.css'

class SetupArgs{
  audio!: HTMLAudioElement;
  setProjectName!: ( name: string ) => string;
}

let Setup = ( { audio, setProjectName }: SetupArgs ) => {
  let audioFile: HTMLInputElement;
  let setupContainer: HTMLElement;

  let audioLoad = () => {
    let file = audioFile.files![0];

    let reader = new FileReader();

    reader.onload = () => {
      audio.src = reader.result!.toString();

      let name = file.name.split('.');
      name.pop();

      setProjectName(name.join('.'));

      setupContainer.style.opacity = '0';
      setupContainer.style.display = 'none';
    }

    reader.readAsDataURL(file);
  }

  return (
    <div class="setup-blackout" ref={( el ) => setupContainer = el}>
      <div class="setup-popup">
        <div class="setup-header">Create a New Project</div>

        <div class="setup-text">Load an audio file to begin editing.</div>
        <input type="file" id="setup-audio-file" ref={( el ) => audioFile = el} onChange={audioLoad}></input>

        <label for="setup-audio-file">
          <div class="file-upload-button">
            <i class="fa-solid fa-upload"></i>
            Upload
          </div>
        </label>

        <br /><br />

        <div class="setup-header">Load a Project</div>

        <div class="setup-text">Load a project file to begin editing.</div>
        <input type="file" id="setup-project-file"></input>

        <label for="setup-project-file">
          <div class="file-upload-button">
            <i class="fa-solid fa-upload"></i>
            Upload
          </div>
        </label>
      </div>
    </div>
  )
}

export default Setup
import './AudioBar.css'
import AudioControls from './AudioBar/AudioControls'
import { onMount, onCleanup, createEffect } from 'solid-js'
import { Light } from '../../classes/Light';

class AudioBarArgs{
  audio!: HTMLAudioElement;
  audioTime!: () => number;
  audioLength!: () => number;
  setAudioTime!: ( time: number ) => number;
  projectName!: () => string;
  setProjectName!: ( name: string ) => string;
  changeTime!: ( time: number ) => void;
  editingText!: () => boolean;
  setEditingText!: ( editing: boolean ) => boolean;
  lights!: () => Array<Light>;
  scale!: () => number;
  offset!: () => number;
  setOffset!: ( offset: number ) => number;
}

let average = ( arr: Uint8Array ): number => {
  let max = 0;

  for(let i = 0; i < arr.length; i++)
    max += arr[i];

  return max / arr.length;
}

let AudioBar = ( { audio, audioTime, audioLength, setAudioTime, projectName, setProjectName, changeTime, editingText, setEditingText, lights, scale, offset, setOffset }: AudioBarArgs ) => {
  let canvas: HTMLCanvasElement;
  let audioData: Array<number> = [];

  createEffect(() => {
    audioData = [];

    for(let i = 0; i < audioLength() * 10; i++)
      audioData.push(0);
  })

  let ctx = new AudioContext();
  let analyser = ctx.createAnalyser();
  let audioSrc = ctx.createMediaElementSource(audio);

  audioSrc.connect(analyser);
  analyser.connect(ctx.destination);

  analyser.smoothingTimeConstant = 0;

  analyser.fftSize = 512;
  let audioFreqData = new Uint8Array(analyser.frequencyBinCount);

  audio.addEventListener('play', () => ctx.resume());

  let generateWaveform = () => {
    analyser.disconnect();
    audio.pause();

    audio.currentTime = 0;
    audio.playbackRate = 7;
    audio.play();

    audio.onended = () => {
      audio.onended = () => {};

      audio.pause();
      audio.playbackRate = 1;

      audio.currentTime = 0;
      analyser.connect(ctx.destination);
    }
  }

  onMount(() => {
    let ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth - 50;
    canvas.height = (window.innerHeight / 4) - 50;

    window.onresize = () => {
      canvas.width = window.innerWidth - 50;
      canvas.height = (window.innerHeight / 4) - 50;
    }

    let trackLength = audioLength();

    createEffect(() => {
      trackLength = audioLength();
    })

    let render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(audioFreqData);

      let address = Math.floor(audio.currentTime * 10);

      if(audioData[address] == 0){
        let value = average(audioFreqData);

        if(value != 0)
          audioData[address] = value;
      }

      let barWidth = (canvas.width / audioData.length) * scale();

      ctx.lineWidth = Math.ceil(barWidth);
      ctx.strokeStyle = '#fff';

      for(let i = 0; i < audioData.length; i++){
        if(audioData[i] == 0)
          continue;

        ctx.beginPath();
        ctx.moveTo((i * barWidth) + offset(), (canvas.height / 2) + (audioData[i] / 2));
        ctx.lineTo((i * barWidth) + offset(), (canvas.height / 2) - (audioData[i] / 2));
        ctx.stroke();
        ctx.closePath();
      }

      let timeBarPos = (((canvas.width / trackLength) * audio.currentTime) + 0.5) * scale() + offset();

      if(timeBarPos > canvas.width){
        setOffset(offset() - canvas.width / 2)
      }

      if(timeBarPos < 0){
        setOffset(offset() + canvas.width / 2)
      }

      ctx.lineWidth = 1;

      ctx.strokeStyle = '#f00';
      ctx.beginPath();
      ctx.moveTo(timeBarPos, 0);
      ctx.lineTo(timeBarPos, canvas.height);
      ctx.stroke();
      ctx.closePath();

      frame = requestAnimationFrame(render);

      setAudioTime(audio.currentTime);
    }

    let frame = requestAnimationFrame(render);

    onCleanup(() => {
      window.onresize = () => {};
      cancelAnimationFrame(frame);
    })
  })

  return (
    <div class="audio-bar">
      <AudioControls
        audio={audio}
        audioTime={audioTime}
        generateWaveform={generateWaveform}
        getWaveform={() => audioData}
        projectName={projectName}
        setProjectName={setProjectName}
        changeTime={changeTime}
        editingText={editingText}
        setEditingText={setEditingText}
        lights={lights}
      />

      <canvas ref={( el ) => canvas = el} />
    </div>
  )
}

export default AudioBar
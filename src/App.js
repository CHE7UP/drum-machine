import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import './App.css';

const audioClips = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];


function App() {
  const [volume, setVolume] = useState(1);
  const [recording, setRecording] = useState("");
  const[speed,setSpeed]=useState(0.5);

  const playRecording = () => {
      let index=0;
      let recordArray = recording.split(" ");
      const interval = setInterval(() => {
          const audioTag = document.getElementById(recordArray[index]);
          audioTag.volume = volume;
          audioTag.currentTime = 0;
          audioTag.play();
          index++;
          }, speed * 600);
      setTimeout(
          () => clearInterval(interval), 
          600* speed*recordArray.length-1
          );
  };
return (
  <div className="machine">
    
    <div className="diplay-div">
      
      <div className="display" id="display">
      <div className="display-pad" >
          {audioClips.map((clip) => (
              <DrumPad 
              key={clip.id} 
              clip={clip} 
              volume={volume} 
              setRecording={setRecording}
              text={clip.keyTrigger}
              />
          ))}
          </div>
          <p>{recording}</p>
          <br />
          </div>
          </div>
          <div className="recording">
          <h4>Volume</h4>
          <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01"
          volume={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-50"
          />
         
         
          {recording &&(
              <div id = "buttons">
              <button onClick ={playRecording} class="play">play</button>
              <button onClick ={()=> setRecording("")} class="clear">clear</button>
              <br/>
              <h4>Speed</h4>
              <input 
          type="range" 
          min="0.1" 
          max="1.2" 
          step="0.01"
          volume={volume}
          onChange={(e) => setSpeed(e.target.value)}
          className="w-50"
          />
              </div> 
          )}
    </div>
  </div>
);    
}
function DrumPad({clip, volume, setRecording}) {

  const [active, setActive] = useState(false);

  useEffect(() => {
      document.addEventListener('keydown', handleKeyPress);
      return () => {
          document.removeEventListener('keydown', handleKeyPress);
      };
  }, []);
  const handleKeyPress = (e) => {
      if (e.keyCode === clip.keyCode) {
          playSound();
      }
  }


  const playSound = () => {
      const audioTag = document.getElementById(clip.keyTrigger);
      setActive(true);
      setTimeout(() => setActive(false), 100);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      setRecording((prev) => prev+clip.keyTrigger+" ");
  };

return (
  <div class= "drum-pad"
  onClick={playSound} 
  id={clip.id}
  >
    <audio className="clip" id = {clip.keyTrigger} src={clip.url}/>
    {clip.keyTrigger}
  </div>
);
}
ReactDOM.render(<App />, document.getElementById('drum-machine'));

export default App;

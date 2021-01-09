import React,{useState} from 'react'
import {IconButton} from '@material-ui/core';
import RecordRTC from 'recordrtc';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import { Delete, Pause, Send, Stop } from '@material-ui/icons';

function MediaRecord() {
  const [recordState,setRecordState] = useState(false)
  var audio = document.querySelector('audio');

  function captureMicrophone(callback) {
      navigator.mediaDevices.getUserMedia({audio: true}).then(callback).catch(function(error) {
          alert('Unable to access your microphone.');
          console.error(error);
      });
  }
  
  function stopRecordingCallback() {
      audio.srcObject = null;
      var blob = recorder.getBlob();
      audio.src = URL.createObjectURL(blob);
      console.log(audio.src)
      recorder.microphone.stop();
  }
  function deleteRecordingCallback() {
    audio.srcObject = null;
    audio.src = null;
    // audio.src = URL.createObjectURL(blob);
    recorder.microphone.stop();
}
  
  var recorder; // globally accessible
  
  function startRecording() {
      
      captureMicrophone(function(microphone) {
          audio.srcObject = microphone;
  
          recorder = RecordRTC(microphone, {
              type: 'audio',
              desiredSampRate: 16000
          });
  
          recorder.startRecording();
          recorder.microphone = microphone;
  
      });
  };
  
  function stopRecording() {
    
    recorder.stopRecording(stopRecordingCallback);
  };
  function deleteRecording() {
    // setRecordState(false)
    recorder.stopRecording(deleteRecordingCallback);
};

    
  return (
        <div>
          {/* <div className = {recordState ? "mediaHide" : ""}> */}
            <IconButton onClick={startRecording} >
              <MicIcon />
            </IconButton>
          {/* </div> */}
          {/* <div className = {recordState ? "mediaHide" : ""}> */}
            <IconButton  onClick={deleteRecording}>
              <Delete />
            </IconButton>
            <IconButton onClick={stopRecording}>
              <Send  />
            </IconButton>
          {/* </div> */}
          
          <div className="mediaHide" >
            <audio controls autoplay playsinline></audio>
          </div>
            
        </div>
    )
}

export default MediaRecord

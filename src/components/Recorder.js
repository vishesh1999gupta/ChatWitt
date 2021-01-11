import React, { useState } from 'react'
import { ReactMic } from 'react-mic';
import { IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import './chat.css';
import axios from './axios.js'
import { firebaseApp } from "../firebase.js"

function Recorder(props) {

  const [record, setRecord] = useState(false)

  const startRecording = () => {
    setRecord(true)
  }

  function onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  function onStop(recordedBlob) {

    let storage = firebaseApp.storage().ref('Audio_New/' + props.user.user._id + String(new Date().getTime()) + '.wav');
    let task = storage.put(recordedBlob.blob);
    task.then(function (snapshot) {
      console.log('Uploaded the file')
      storage.getDownloadURL().then(async function (url) {
        await axios.post("/" + props.user.user._id + "/" + props.roomId + "/sendAudio", {
          message: "Audio",
          timeStamp: new Date().getTime(),
          type: "audio",
          sender: props.user.user.displayName,
          media: url
        })
      })
    })

    console.log(window.URL.createObjectURL(recordedBlob.blob));
  }

  return (
    <div>
      <div className="recorder">
        <ReactMic
          record={record}
          className="sound-wave"
          onStop={onStop}
          onData={onData} />
      </div>

      <IconButton className={!record ? "" : "hidden"}>
        <MicIcon id="mic"
          onClick={() => {
            setRecord(true)
            startRecording()
          }
          } />
      </IconButton>

      <IconButton className={record ? "" : "hidden"}>
        <Send id="sendAudio"
          onClick={() => {
            setRecord(false)
          }} />
      </IconButton>
    </div>

  );

}

export default Recorder
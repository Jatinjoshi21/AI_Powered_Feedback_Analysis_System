import { useRef, useState } from "react";

import "../styles/VoiceRecorder.scss";

export default function VoiceRecorder({ onRecorded }) {
  const [recording, setRecording] = useState(false);

  const [

seconds,

setSeconds

]

=
useState(0);

const intervalRef =
useRef(null);

  const mediaRecorder = useRef(null);

  const chunks = useRef([]);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    setSeconds(0);

intervalRef.current =

setInterval(()=>{

setSeconds(

(prev)=>prev+1

);

},1000);

    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (event) => {
      chunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = () => {
      const blob = new Blob(
        chunks.current,

        {
          type: "audio/webm",
        },
      );

      onRecorded(blob);

      chunks.current = [];
    };

    mediaRecorder.current.start();

    setRecording(true);
  }

  function stopRecording() {
    mediaRecorder.current.stop();

    clearInterval(
intervalRef.current
);

    setRecording(false);
  }

  return (
    <div className="recorder">
      {recording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {

recording

&&

<div className="recorder__status">

<div className="recorder__dot"/>

<span>

Recording...

</span>

<p>

{seconds}s

</p>

</div>

}
    </div>
  );
}

import { useState } from "react";

import { useParams } from "react-router-dom";

import { submitFeedback } from "../services/feedback.api";

import VoiceRecorder from "../components/VoiceRecorder";

import "../styles/Feedback.scss";

export default function Feedback() {
  const { slug } = useParams();

  const [audio, setAudio] = useState(null);

  const [loading, setLoading] = useState(false);

  const [

submitted,

setSubmitted

]

=
useState(false);

  async function submit() {
    if (!audio) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "audio",

        audio,

        "voice.webm",
      );

      await submitFeedback(
        slug,

        formData,
      );

      setSubmitted(true);


    } finally {
      setLoading(false);
    }
  }

  if(submitted){

return(

<div className="feedback">

<div className="feedback__card">

<h1>

Thank You 🎉

</h1>

<p>

Your feedback has been submitted successfully.

</p>

</div>

</div>

);

}

  return (
    
    <div className="feedback">
      <div className="feedback__card">
        <h1>Share Your Feedback</h1>

        <p>Your voice helps improve experience</p>

        <VoiceRecorder onRecorded={setAudio} />

        <button onClick={submit}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
        {

audio

&&

<div className="feedback__ready">

✓ Recording Ready

</div>

}
        
      </div>
    </div>
  );
}

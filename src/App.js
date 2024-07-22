import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Replace with your API Gateway endpoint
      const response = await fetch('https://nj7ssp11vl.execute-api.us-east-1.amazonaws.com/dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        setAudioUrl(data.audioUrl);
      } else {
        console.error('Failed to fetch audio');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Text to Speech Converter</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={handleTextChange}
          rows="4"
          cols="50"
          placeholder="Enter text to convert to speech"
        />
        <br />
        <button type="submit">Convert to Speech</button>
      </form>
      {audioUrl && (
        <div>
          <h2>Listen to the Output</h2>
          <audio controls>
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default App;


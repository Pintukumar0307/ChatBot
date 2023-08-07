import React, { useState } from 'react';


function Chatbot() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    fetch('http://localhost:8000/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: message })
    })
      .then(response => response.json())
      .then(data => setResponse(data.response))
      .catch(error => {
        console.log(error);
        setResponse('Error');
      });
    setMessage('');

    
  };

  const handleChange = event => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
      <p>{message}</p>
      <p>{response}</p>
    </div>
  );
}

export default Chatbot;

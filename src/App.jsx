import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [response, setResponse] = useState('');

  const handleSetCookie = async () => {
    try {
      const res = await axios.get('https://backend-task-33.onrender.com/set-cookie', { withCredentials: true });
      setResponse(JSON.stringify(res.data));
    } catch (err) {
      setResponse(err.message);
    }
  };

  const handleGetCookie = async () => {
    try {
      const res = await axios.get('https://backend-task-33.onrender.com/get-cookie', { withCredentials: true });
      setResponse(JSON.stringify(res.data));
    } catch (err) {
      setResponse(err.response?.data?.message || err.message);
    }
  };

  const handleStatus = async (code) => {
    try {
      const res = await axios.get(`http://localhost:5000/status/${code}`);
      setResponse(JSON.stringify(res.data));
    } catch (err) {
      setResponse(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Express Cookie & Status Demo</h1>
      <div className="space-x-2 mb-4">
        <button className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded" onClick={handleSetCookie}>Set Cookie</button>
        <button className="px-4 py-2 cursor-pointer bg-green-500 text-white rounded" onClick={handleGetCookie}>Get Cookie</button>
        {[200, 201, 400, 404, 500].map(code => (
          <button
            key={code}
            className="px-3 cursor-pointer py-1 bg-gray-300 rounded"
            onClick={() => handleStatus(code)}
          >
            {code}
          </button>
        ))}
      </div>
      <pre className="bg-white p-4 rounded shadow w-full max-w-xl">{response}</pre>
    </div>
  );
}

export default App;

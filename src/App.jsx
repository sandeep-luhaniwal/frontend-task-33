import './App.css';// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Configure axios to send cookies with requests
  axios.defaults.withCredentials = true;

  const callApi = async (endpoint) => {
    setLoading(true);
    try {
      let res;
      if (endpoint === '/api/create') {
        res = await axios.post('https://backend-task-33.onrender.com/api/create', {
          sampleData: 'This is some data sent to the server'
        });
      } else {
        res = await axios.get(`https://backend-task-33.onrender.com${endpoint}`);
      }
      setResponse({
        status: res.status,
        data: res.data,
        headers: res.headers,
        success: true
      });
    } catch (error) {
      setResponse({
        status: error.response?.status || 500,
        data: error.response?.data || { message: 'Network error' },
        success: false
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Express.js API Demo</h1>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 mb-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Cookie Operations</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => callApi('/api/set-cookie')}
              disabled={loading}
              className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Set Cookie
            </button>
            <button
              onClick={() => callApi('/api/get-cookie')}
              disabled={loading}
              className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get Cookie
            </button>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 mb-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Status Code Examples</h2>
          <div className="flex gap-4">
            <button
              onClick={() => callApi('/api/ok')}
              disabled={loading}
              className="px-4 py-2 cursor-pointer bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              200 OK
            </button>
            <button
              onClick={() => callApi('/api/create')}
              disabled={loading}
              className="px-4 py-2 cursor-pointer bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              201 Created
            </button>
            <button
              onClick={() => callApi('/api/bad-request')}
              disabled={loading}
              className="px-4 py-2 cursor-pointer bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              400 Bad Request
            </button>
            <button
              onClick={() => callApi('/api/not-found')}
              disabled={loading}
              className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              404 Not Found
            </button>
            <button
              onClick={() => callApi('/api/server-error')}
              disabled={loading}
              className="px-4 py-2 cursor-pointer bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed sm:col-span-2"
            >
              500 Server Error
            </button>
          </div>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {response && (
          <div className={`border-2 rounded-lg p-6 ${response.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Response</h3>
            <p className="mb-2">
              <span className="font-semibold">Status Code:</span> 
              <span className={`ml-2 px-2 py-1 rounded text-sm font-mono ${response.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {response.status}
              </span>
            </p>
            <div className="bg-white rounded-md p-4 overflow-x-auto">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
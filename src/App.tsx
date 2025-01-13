import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchMessage = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('http://localhost:8080/message1');
      if (!response.ok) {
        throw new Error('Failed to fetch message');
      }
      const data = await response.text();
      setMessage(data);
    } catch (err) {
      setError('エラーが発生しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">メッセージ表示</h1>
        
        <button
          onClick={fetchMessage}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '読み込み中...' : 'メッセージ１'}
        </button>

        {message && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-gray-800">{message}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
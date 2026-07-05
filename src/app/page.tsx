'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<{ message: string; timestamp: string; status: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-gray-900">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">Demo Website</h1>
          <p className="text-blue-100">Frontend to Backend Communication</p>
        </div>
        
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">API Response</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-24">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : data ? (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <span className="block text-xs font-bold text-green-800 uppercase tracking-wide mb-1">Status</span>
                <span className="text-green-900 font-medium">{data.status}</span>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <span className="block text-xs font-bold text-blue-800 uppercase tracking-wide mb-1">Message</span>
                <span className="text-blue-900 font-medium">{data.message}</span>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <span className="block text-xs font-bold text-purple-800 uppercase tracking-wide mb-1">Timestamp</span>
                <span className="text-purple-900 font-medium">{new Date(data.timestamp).toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <div className="text-red-500 text-center py-4">Failed to load data.</div>
          )}
        </div>
      </div>
    </div>
  );
}

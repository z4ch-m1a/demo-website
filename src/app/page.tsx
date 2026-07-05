'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-8">
      <main className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              DW
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Demo Website</h1>
              <p className="text-gray-500 dark:text-gray-400">Frontend + Backend Integration</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-zinc-800 p-6 rounded-xl">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                API Response
              </h2>
              
              {loading ? (
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded col-span-2"></div>
                        <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <pre className="font-mono text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                  {JSON.stringify(data, null, 2)}
                </pre>
              )}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => {
                  setLoading(true);
                  fetch('/api/hello').then(res => res.json()).then(d => { setData(d); setLoading(false); });
                }}
                className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Refetch Data
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

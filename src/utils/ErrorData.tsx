"use client"
import { useRouter } from 'next/navigation';
import React from 'react';


export function ErrorData({ message } : {message : string}) {
    const {refresh}  = useRouter()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="mt-2 text-xl font-semibold text-gray-900">Error Fetching Data</h2>
          <p className="mt-2 text-sm text-gray-500">
            {message || "An error occurred while fetching data from the server."}
          </p>
        </div>
        <div className="mt-5">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            onClick={() => refresh()}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
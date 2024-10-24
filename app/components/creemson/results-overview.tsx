// app/components/creemson/results-overview.tsx

import React from 'react';

export function ResultsOverview() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className=" p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Results Overview</h2>
        <div className="space-y-2">
          <p>Total Items: 1000</p>
          <p>Processed: 950</p>
          <p>Errors: 50</p>
        </div>
      </div>
      <div className="p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Activity</h2>
        <div className="space-y-2">
          <p className="text-red-500">Error: Invalid data format in row 23</p>
          <p className="text-yellow-500">Warning: Missing attribute in row 45</p>
          <button className="text-blue-500 hover:underline">View Full Log</button>
        </div>
      </div>
    </div>
  );
}
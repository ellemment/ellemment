// app/components/creemson/results-detailed.tsx

import React from 'react';

export function ResultsDetailed() {
  return (
    <div className=" p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Detailed Results</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Genre Classification</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className=" ">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Suggested Genre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Confidence</th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">1</td>
                <td className="px-6 py-4 whitespace-nowrap">Electronics</td>
                <td className="px-6 py-4 whitespace-nowrap">95%</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
        {/* Add similar sections for Attribute Mapping and Unit Detection */}
      </div>
    </div>
  );
}
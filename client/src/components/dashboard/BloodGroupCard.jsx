import React from 'react';

const BloodGroupCard = ({ bloodGroup, units, maxUnits, bgColor, onRestock }) => {
  const percentage = Math.min((units / maxUnits) * 100, 100);
  const statusColor = percentage >= 80 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold text-xs ${bgColor}`}>
            {bloodGroup.replace('+', '+•').replace('-', '–•')}
          </span>
          <div>
            <h3 className="font-medium text-gray-900">{bloodGroup}</h3>
            <p className="text-xs text-gray-600">{units} units available</p>
          </div>
        </div>
        {percentage < 30 && (
          <button
            onClick={onRestock}
            className="text-xs text-red-600 hover:underline"
          >
            Restock
          </button>
        )}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${statusColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {percentage < 30 && (
        <p className="text-xs text-red-600 mt-2">Low stock - Reorder needed</p>
      )}
    </div>
  );
};

export default BloodGroupCard;
import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';

const RequestCard = ({ request }) => {
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getComponentLabel = (component) => {
    switch (component) {
      case 'whole_blood': return 'Whole Blood';
      case 'packed_rbc': return 'Packed RBC';
      case 'plasma': return 'Plasma';
      case 'platelets': return 'Platelets';
      default: return component;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-gray-900">{request.id}</h3>
          <p className="text-sm text-gray-600">
            {request.bloodGroup} • {getComponentLabel(request.component)}
          </p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getUrgencyColor(request.urgency)}`}>
          {request.urgency}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">{request.hospital}</p>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          {request.requestedAt}
        </div>
      </div>

      <div className="mt-3 flex space-x-2">
        <button className="flex-1 text-xs px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
          View Details
        </button>
        <button className="flex-1 text-xs px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700">
          Update Status
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
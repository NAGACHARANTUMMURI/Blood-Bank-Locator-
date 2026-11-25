import React from 'react';
import { AlertCircle, Clock, MapPin, StatusIcon, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const EmergencyRequests = () => {
  const { user } = useAuth();

  const requests = [
    {
      id: 'REQ-20261124-001',
      hospital: 'General Hospital',
      bloodGroup: 'O+',
      component: 'packed_rbc',
      units: 4,
      urgency: 'critical',
      status: 'matched',
      createdAt: '2 hours ago',
      requiredBy: '2026-11-25T10:00:00Z'
    },
    {
      id: 'REQ-20261124-002',
      hospital: 'City Medical Center',
      bloodGroup: 'A+',
      component: 'plasma',
      units: 2,
      urgency: 'high',
      status: 'delivered',
      createdAt: '5 hours ago',
      requiredBy: '2026-11-25T14:00:00Z'
    },
    {
      id: 'REQ-20261124-003',
      hospital: 'Specialty Hospital',
      bloodGroup: 'B-',
      component: 'whole_blood',
      units: 1,
      urgency: 'critical',
      status: 'dispatched',
      createdAt: '1 hour ago',
      requiredBy: '2026-11-25T09:30:00Z'
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      matched: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      dispatched: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const getUrgencyBadge = (urgency) => {
    const styles = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      normal: 'bg-green-100 text-green-800 border-green-200'
    };
    return styles[urgency] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Emergency Blood Requests</h1>
          <p className="text-gray-600">
            {user?.role === 'hospital' ? 'Your submitted requests' : 'All active requests in the system'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required By</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{request.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{request.bloodGroup}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-600">{request.component.replace('_', ' ').toUpperCase()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{request.units} units</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getUrgencyBadge(request.urgency)}`}>
                        {request.urgency}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {request.requiredBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyRequests;
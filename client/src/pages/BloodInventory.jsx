import React from 'react';
import { Heart, Package, Clock, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const BloodInventory = () => {
  const { user } = useAuth();

  const bloodGroups = [
    { group: 'A+', units: 18, total: 20 },
    { group: 'A-', units: 5, total: 8 },
    { group: 'B+', units: 15, total: 20 },
    { group: 'B-', units: 4, total: 6 },
    { group: 'AB+', units: 10, total: 15 },
    { group: 'AB-', units: 3, total: 5 },
    { group: 'O+', units: 45, total: 50 },
    { group: 'O-', units: 8, total: 10 }
  ];

  const components = [
    { name: 'Whole Blood', value: 'whole_blood' },
    { name: 'Packed RBC', value: 'packed_rbc' },
    { name: 'Plasma', value: 'plasma' },
    { name: 'Platelets', value: 'platelets' }
  ];

  const getGroupName = (group) => {
    return group;
  };

  const getGroupColor = (group, percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Blood Inventory</h1>
          <p className="text-gray-600">Real-time blood bank inventory across the region</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>All Groups</option>
                {bloodGroups.map(group => (
                  <option key={group.group} value={group.group}>{group.group}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Component Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>All Components</option>
                {components.map(comp => (
                  <option key={comp.value} value={comp.value}>{comp.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>All Statuses</option>
                <option>Available</option>
                <option>Low Stock</option>
                <option>Expiring Soon</option>
              </select>
            </div>

            <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 flex items-center justify-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Available</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bloodGroups.map((item) => {
                      const percentage = (item.units / item.total) * 100;
                      const groupColor = getGroupColor(item.group, percentage);
                      const statusText = percentage >= 80 ? 'Good' : percentage >= 50 ? 'Medium' : 'Low';
                      const statusColor = percentage >= 80 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600';

                      return (
                        <tr key={item.group}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2 ${groupColor}`}>
                                {item.group.replace('+', '+•').replace('-', '–•').slice(0, 2)}
                              </div>
                              <span className="font-medium text-gray-900">{item.group}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-gray-600">Whole Blood</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                                <div className={`${groupColor} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
                              </div>
                              <span className="font-medium text-gray-900">{item.units} / {item.total}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`font-medium ${statusColor}`}>{statusText}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>15 Nov 2026</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary-600 hover:text-primary-900">View Details</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">220</p>
                  <p className="text-sm text-gray-600">Total Units Available</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">8</p>
                  <p className="text-sm text-gray-600">Low Stock Groups</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">5</p>
                  <p className="text-sm text-gray-600">Expiring Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodInventory;
import React from 'react';
import { Heart, MapPin, AlertCircle, Activity, Users, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import BloodGroupCard from '../../components/dashboard/BloodGroupCard';
import RequestCard from '../../components/dashboard/RequestCard';

const HospitalDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Requests',
      value: '42',
      icon: AlertCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Requests',
      value: '3',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Completed Requests',
      value: '39',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Nearby Blood Banks',
      value: '12',
      icon: MapPin,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const urgentRequests = [
    {
      id: 'REQ-001',
      bloodGroup: 'O+',
      component: 'packed_rbc',
      units: 4,
      urgency: 'critical',
      hospital: 'General Hospital',
      requestedAt: '2 hours ago'
    },
    {
      id: 'REQ-002',
      bloodGroup: 'A+',
      component: 'plasma',
      units: 2,
      urgency: 'high',
      hospital: 'City Medical Center',
      requestedAt: '5 hours ago'
    }
  ];

  const nearbyBanks = [
    {
      name: 'City Blood Bank',
      distance: '2.5 km',
      bloodGroups: ['O+', 'A+', 'B+', 'AB+'],
      available: true
    },
    {
      name: 'Red Cross Blood Center',
      distance: '5.1 km',
      bloodGroups: ['O-', 'A-', 'B-'],
      available: true
    }
  ];

  return (
    <DashboardLayout title="Hospital Dashboard" role="hospital">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, Dr. {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-gray-600">Manage emergency requests and track blood availability</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              Urgent Requests
            </h2>
            <div className="space-y-4">
              {urgentRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-500" />
              Nearby Blood Banks
            </h2>
            <div className="space-y-4">
              {nearbyBanks.map((bank, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{bank.name}</h3>
                      <p className="text-sm text-gray-600">{bank.distance}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {bank.bloodGroups.map((group, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          group.endsWith('+')
                            ? 'bg-red-100 text-red-800'
                            : 'bg-red-900 text-white'
                        }`}
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HospitalDashboard;
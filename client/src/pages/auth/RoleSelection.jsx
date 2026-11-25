import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Hospital, Hospital as BloodBankIcon, Users, AlertCircle, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const RoleSelection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user && user.role) {
    navigate(`/dashboard/${user.role}`);
    return null;
  }

  const roles = [
    {
      id: 'hospital',
      title: 'Hospital',
      description: 'Create emergency requests, track blood availability, and manage patient needs',
      icon: Hospital,
      color: 'bg-blue-500',
      action: 'Request Blood'
    },
    {
      id: 'bloodbank',
      title: 'Blood Bank',
      description: 'Manage inventory, accept requests, and coordinate distributions',
      icon: BloodBankIcon,
      color: 'bg-green-500',
      action: 'Manage Inventory'
    },
    {
      id: 'donor',
      title: 'Donor',
      description: 'Register as a donor, receive emergency notifications, and save lives',
      icon: Users,
      color: 'bg-red-500',
      action: 'Donate Blood'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your Role
          </h1>
          <p className="text-xl text-primary-200">
            Select how you want to contribute to saving lives
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <div key={role.id} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className={`w-16 h-16 ${role.color} text-white rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <role.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{role.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{role.description}</p>
                <Link
                  to={`/register`}
                  className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Register as {role.title}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoleSelection;
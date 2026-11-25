import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Users, Shield, Search, AlertCircle, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find Blood Faster.
              <span className="block text-accent-500">Save Lives Together.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-200 mb-10 max-w-3xl mx-auto">
              A centralized platform connecting hospitals, blood banks, and donors for efficient blood
              coordination during emergencies. Reduce delays, save lives.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
              <Link
                to="/blood-banks"
                className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Locate Blood Banks
              </Link>

              {user?.role === 'hospital' && (
                <Link
                  to="/request/create"
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center border-2 border-red-500"
                >
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Emergency Request
                </Link>
              )}

              {user?.role !== 'hospital' && user?.role !== 'bloodbank' && user?.role !== 'donor' && (
                <Link
                  to="/login"
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
              {[
                { label: '300+', icon: Users, text: 'Registered Blood Banks' },
                { label: '50K+', icon: Heart, text: 'Daily Donors Active' },
                { label: '15K+', icon: Shield, text: 'Hospitals Connected' },
                { label: '98%+', icon: Activity, text: 'Response Time Improvement' }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-center mb-2">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-primary-200">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our intelligent system helps you find and coordinate blood donations quickly and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Locate Blood Banks',
                description: 'Find nearby verified blood banks with real-time inventory using GPS.',
                icon: MapPin
              },
              {
                step: '2',
                title: 'Create Emergency Request',
                description: 'Submit urgent blood requests with location, blood group, and urgency level.',
                icon: AlertCircle
              },
              {
                step: '3',
                title: 'Intelligent Dispatch',
                description: 'Our algorithm matches compatible inventory and dispatches efficiently.',
                icon: Shield
              },
              {
                step: '4',
                title: 'Track & Receive',
                description: 'Monitor dispatch progress and receive blood safely at your hospital.',
                icon: Activity
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Blood Group Compatibility</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding how blood groups work together saves lives
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white font-semibold text-lg mb-2 ${
                  group === 'A+' ? 'bg-red-600' :
                  group === 'A-' ? 'bg-red-900' :
                  group === 'B+' ? 'bg-red-500' :
                  group === 'B-' ? 'bg-red-800' :
                  group === 'AB+' ? 'bg-red-400' :
                  group === 'AB-' ? 'bg-red-700' :
                  group === 'O+' ? 'bg-red-700' :
                  'bg-red-800'
                }`}>
                  {group}
                </div>
                <span className="text-sm font-medium text-gray-700">{group}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Donors can give to:</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'O- (Universal Donor)',
                'A-', 'B-', 'AB-', 'A+', 'B+', 'AB+'
              ].map((group, index) => (
                <span key={index} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                  {group}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Inventory</h3>
                  <p className="text-gray-600">
                    Live blood bank inventory with verified stock levels, expiry dates, and component types.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">GPS-Based Location</h3>
                  <p className="text-gray-600">
                    Find the nearest blood banks based on your actual location for faster delivery.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Dispatch System</h3>
                  <p className="text-gray-600">
                    Intelligent algorithms ensure compatible blood reaches you through efficient routes.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Coordination</h3>
                  <p className="text-gray-600">
                    Direct communication channels for urgent requests with priority dispatch handling.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOUI3MUM4Ii8+CiAgPHRleHQgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI1NSUgiIHk9IjUwJSIgZm9udC1zaXplPSIxOCIgZm9udC1mYW1pbHk9IkltanMiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2libz0iIi7Pkg=="
                alt="Blood Bank Locator Dashboard"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
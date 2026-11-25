import React from 'react';
import { Heart, Shield, MapPin, Users, Clock, AlertCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Project</h1>
          <p className="text-xl text-primary-200">
            Bridging the gap between donors, hospitals, and blood banks for emergency response
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To create a comprehensive, real-time blood bank locator and dispatcher system that
              reduces emergency response times and ensures critical blood products reach patients
              when they need them most. We believe that every drop of blood counts, and every
              second matters in saving a life.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: MapPin,
                  title: 'GPS-Based Locator',
                  description: 'Real-time location-based search for nearby verified blood banks'
                },
                {
                  icon: Activity,
                  title: 'Live Inventory',
                  description: 'Transparent, real-time blood stock levels across all banks'
                },
                {
                  icon: AlertCircle,
                  title: 'Emergency Requests',
                  description: 'Fast-track emergency blood requests with priority dispatch'
                },
                {
                  icon: Users,
                  title: 'Donor Network',
                  description: 'Connected network of registered blood donors for emergency appeals'
                },
                {
                  icon: Shield,
                  title: 'Verified Banks',
                  description: 'Only verified, trusted blood bank partners in the network'
                },
                {
                  icon: Clock,
                  title: 'Real-time Tracking',
                  description: 'Live tracking of blood dispatch from bank to hospital'
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <Icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Blood Compatibility Guide</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Universal Donors</h3>
                  <p className="text-gray-600 mb-4">
                    <strong>AB-</strong> individuals can donate to all blood types and are called
                    universal donors. <strong>O-</strong> is the universal donor type.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Universal Recipients</h3>
                  <p className="text-gray-600">
                    <strong>AB+</strong> individuals can receive from all blood types and are called
                    universal recipients.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Compatible Blood Groups</h3>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-red-100 p-3 rounded">
                      <span className="font-bold text-red-800">O-</span> → O+
                    </div>
                    <div className="bg-red-100 p-3 rounded">
                      <span className="font-bold text-red-800">A-</span> → A+
                    </div>
                    <div className="bg-red-100 p-3 rounded">
                      <span className="font-bold text-red-800">B-</span> → B+
                    </div>
                    <div className="bg-red-100 p-3 rounded">
                      <span className="font-bold text-red-800">AB-</span> → AB+
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 mb-6">
              Have questions or need assistance? We're here to help.
            </p>
            <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
              <div className="text-center">
                <Heart className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <p className="font-semibold text-gray-900 mb-2">Blood Bank Locator</p>
                <p className="text-gray-600 mb-2">info@bloodbanklocator.org</p>
                <p className="text-gray-600">+1 800-BLOOD-BANK</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
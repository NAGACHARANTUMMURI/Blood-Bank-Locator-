import React, { useState, useEffect } from 'react';
import { MapPin, Search, Filter, Heart, Shield, Package } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const bloodGroupColors = {
  'A+': 'bg-red-100 text-red-800',
  'A-': 'bg-red-900 text-white',
  'B+': 'bg-red-500 text-white',
  'B-': 'bg-red-800 text-white',
  'AB+': 'bg-red-400 text-white',
  'AB-': 'bg-red-700 text-white',
  'O+': 'bg-red-700 text-white',
  'O-': 'bg-red-800 text-white'
};

const BloodBankLocator = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getUserLocation();
    fetchBloodBanks();
  }, []);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.log('Geolocation error:', error.message);
        setUserLocation({ lat: 12.9716, lng: 77.5946 });
      }
    );
  };

  const fetchBloodBanks = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/bloodbanks/nearby');
      setBloodBanks(res.data.data || []);
    } catch (error) {
      console.error('Error fetching blood banks:', error);
      setError('Failed to load blood banks');
    } finally {
      setLoading(false);
    }
  };

  const filteredBloodBanks = bloodBanks.filter(bank => {
    const matchesSearch = bank.bloodBankName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bank.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bank.pinCode?.includes(searchTerm);
    const matchesGroup = !selectedGroup || bank.availableBloodGroups?.includes(selectedGroup);
    const matchesComponent = !selectedComponent || bank.availableComponents?.includes(selectedComponent);
    return matchesSearch && matchesGroup && matchesComponent;
  });

  const center = userLocation || { lat: 12.9716, lng: 77.5946 };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const components = ['whole_blood', 'packed_rbc', 'plasma', 'platelets'];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Locating blood banks near you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Blood Banks Nearby</h1>
          <p className="text-gray-600">Locate verified blood banks with real-time inventory</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, city, or PIN code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-primary-500"
              />
            </div>

            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="px-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-primary-500"
            >
              <option value="">Filter by Blood Group</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>

            <select
              value={selectedComponent}
              onChange={(e) => setSelectedComponent(e.target.value)}
              className="px-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-primary-500"
            >
              <option value="">Filter by Component</option>
              {components.map(comp => (
                <option key={comp} value={comp}>
                  {comp.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>

            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <MapPin className="h-5 w-5 inline mr-2" />
              Use My Location
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm h-[500px] overflow-hidden">
              <MapContainer
                center={[center.lat, center.lng]}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {userLocation && (
                  <Circle
                    center={[userLocation.lat, userLocation.lng]}
                    radius={5000}
                    pathOptions={{
                      color: 'blue',
                      fillColor: 'blue',
                      fillOpacity: 0.1
                    }}
                  />
                )}

                {filteredBloodBanks.map((bank, index) => (
                  <Marker key={index} position={[bank.location?.lat || 12.9716, bank.location?.lng || 77.5946]}>
                    <Popup>
                      <div className="min-w-[200px]">
                        <h3 className="font-bold text-gray-900 mb-2">{bank.bloodBankName}</h3>
                        <p className="text-sm text-gray-600 mb-2">{bank.address}</p>
                        <p className="text-sm text-gray-600 mb-2">
                          <Shield className="h-4 w-4 inline mr-1" />
                          {bank.verificationStatus === 'verified' ? 'Verified' : 'Pending'}
                        </p>
                        <p className="text-sm text-gray-600 mb-3">
                          <Package className="h-4 w-4 inline mr-1" />
                          {bank.totalUnits || 0} units available
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {(bank.availableBloodGroups || []).slice(0, 4).map((group, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-1 text-xs rounded-full font-medium ${bloodGroupColors[group] || 'bg-gray-100 text-gray-800'}`}
                            >
                              {group}
                            </span>
                          ))}
                        </div>
                        <button className="mt-3 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700">
                          View Details
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {filteredBloodBanks.length} Blood Bank{filteredBloodBanks.length !== 1 ? 's' : ''} Found
              </h2>

              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredBloodBanks.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No blood banks found matching your criteria</p>
                ) : (
                  filteredBloodBanks.map((bank, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">{bank.bloodBankName}</h3>
                          <p className="text-sm text-gray-600">{bank.city}, {bank.state}</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {bank.distance || 'Nearby'}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">{bank.contactNumber}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {(bank.availableBloodGroups || []).slice(0, 3).map((group, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 text-xs rounded-full font-medium ${bloodGroupColors[group] || 'bg-gray-100 text-gray-800'}`}
                          >
                            {group}
                          </span>
                        ))}
                        {(bank.availableBloodGroups || []).length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{bank.availableBloodGroups.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 text-xs px-3 py-1 border border-primary-600 text-primary-600 rounded hover:bg-primary-50">
                          Directions
                        </button>
                        <button className="flex-1 text-xs px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodBankLocator;
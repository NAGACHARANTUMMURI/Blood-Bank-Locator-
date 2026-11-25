import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Package, Clock, MapPin, Save } from 'lucide-react';
import axios from 'axios';

const CreateBloodRequest = () => {
  const [formData, setFormData] = useState({
    requiredBloodGroup: '',
    componentType: 'whole_blood',
    requiredUnits: 1,
    patientReference: '',
    urgency: 'normal',
    requiredBy: '',
    deliveryLocation: {
      address: '',
      location: {
        type: 'Point',
        coordinates: [0, 0]
      }
    },
    contactInfo: {
      contactPerson: '',
      phone: '',
      extension: ''
    }
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const components = [
    { value: 'whole_blood', label: 'Whole Blood' },
    { value: 'packed_rbc', label: 'Packed RBC' },
    { value: 'plasma', label: 'Plasma' },
    { value: 'platelets', label: 'Platelets' }
  ];
  const urgencies = [
    { value: 'critical', label: 'Critical', color: 'text-red-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'normal', label: 'Normal', color: 'text-green-600' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('/api/requests', formData);
      alert('Blood request created successfully!');
      navigate('/requests');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create Emergency Blood Request</h1>
          <p className="text-gray-600">Submit an urgent blood request for immediate dispatch</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Blood Group *
                </label>
                <select
                  name="requiredBloodGroup"
                  value={formData.requiredBloodGroup}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Component Type *
                </label>
                <select
                  name="componentType"
                  value={formData.componentType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  {components.map(comp => (
                    <option key={comp.value} value={comp.value}>{comp.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Units Required *
                </label>
                <input
                  type="number"
                  name="requiredUnits"
                  value={formData.requiredUnits}
                  onChange={handleChange}
                  min="1"
                  max="20"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level *
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  {urgencies.map(urgency => (
                    <option key={urgency.value} value={urgency.value}>
                      {urgency.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required By (Optional)
                </label>
                <input
                  type="datetime-local"
                  name="requiredBy"
                  value={formData.requiredBy}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Reference *
                </label>
                <input
                  type="text"
                  name="patientReference"
                  value={formData.patientReference}
                  onChange={handleChange}
                  placeholder="e.g., PAT-2026-001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Location *
              </label>
              <input
                type="text"
                name="deliveryLocation"
                value={formData.deliveryLocation?.address || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  deliveryLocation: {
                    ...prev.deliveryLocation,
                    address: e.target.value
                  }
                }))}
                placeholder="Hospital address, room number, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person *
              </label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo.contactPerson}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  contactInfo: {
                    ...prev.contactInfo,
                    contactPerson: e.target.value
                  }
                }))}
                placeholder="Doctor in charge"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Phone *
              </label>
              <input
                type="tel"
                name="contactInfo"
                value={formData.contactInfo.phone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  contactInfo: {
                    ...prev.contactInfo,
                    phone: e.target.value
                  }
                }))}
                placeholder="+1 234 567 8900"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> This request will be matched with nearby blood banks
                automatically. High urgency requests will be prioritized.
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard/hospital')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBloodRequest;
# API Documentation

## Blood Bank Locator API v1.0.0

## Authentication

### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 234 567 8900",
  "password": "password123",
  "role": "hospital"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "data": {
    "id": "60d5ecb8f1c2ab1a8c8e4d7c",
    "role": "hospital",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 234 567 8900",
    "isVerified": false
  }
}
```

### POST /api/auth/login
Authenticate user and return token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "data": {
    "id": "60d5ecb8f1c2ab1a8c8e4d7c",
    "role": "hospital",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 234 567 8900",
    "isVerified": true
  }
}
```

### GET /api/auth/profile
Get current user profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "60d5ecb8f1c2ab1a8c8e4d7c",
    "role": "hospital",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 234 567 8900",
    "isVerified": true,
    "hospitalId": "60d5ecb8f1c2ab1a8c8e4d7d"
  }
}
```

## Blood Banks

### GET /api/bloodbanks
Get all verified blood banks.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |
| city | string | Filter by city |
| bloodGroup | string | Filter by blood group |

### GET /api/bloodbanks/nearby
Get blood banks near a location.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| lat | number | Yes | Latitude |
| lng | number | Yes | Longitude |
| radius | number | No | Radius in km (default: 20) |
| bloodGroup | string | No | Filter by blood group |

**Response:**
```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "_id": "60d5ecb8f1c2ab1a8c8e4d7e",
      "bloodBankName": "City Blood Bank",
      "address": "...",
      "location": {
        "type": "Point",
        "coordinates": [77.5946, 12.9716]
      },
      "distance": 2.5,
      "availableBloodGroups": ["A+", "O+", "B+"],
      "totalUnits": 45,
      "verificationStatus": "verified",
      "verifiedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### GET /api/bloodbanks/:id
Get blood bank by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ecb8f1c2ab1a8c8e4d7e",
    "userId": "60d5ecb8f1c2ab1a8c8e4d7c",
    "bloodBankName": "City Blood Bank",
    "address": {
      "line1": "123 Main Street",
      "city": "Bangalore",
      "state": "Karnataka",
      "pinCode": "560001"
    },
    "contactNumber": "+1 234 567 8900",
    "email": "bloodbank@example.com",
    "workingHours": {
      "open": "08:00",
      "close": "20:00"
    },
    "facilities": {
      "hasRefrigeration": true,
      "hasPlasmaProcessing": true
    },
    "verificationStatus": "verified",
    "isActive": true,
    "totalInventory": 245
  }
}
```

### POST /api/bloodbanks
Create new blood bank (Admin/Hospital required).

## Inventory

### GET /api/inventory
Get all inventory records.

**Headers:**
```
Authorization: Bearer <token>
```

### GET /api/inventory/availability
Check blood availability.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| bloodGroup | string | Yes | Blood group |
| componentType | string | Yes | Component type |
| lat | number | No | Latitude for nearby search |
| lng | number | No | Longitude for nearby search |

### POST /api/inventory
Add/update inventory.

**Request Body:**
```json
{
  "bloodBankId": "60d5ecb8f1c2ab1a8c8e4d7e",
  "bloodGroup": "O+",
  "componentType": "packed_rbc",
  "availableUnits": 10,
  "expiryDate": "2026-12-15",
  "collectionDate": "2026-11-25"
}
```

## Blood Requests

### POST /api/requests
Create emergency blood request.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "requiredBloodGroup": "O+",
  "componentType": "packed_rbc",
  "requiredUnits": 4,
  "patientReference": "PAT-2026-001",
  "urgency": "critical",
  "requiredBy": "2026-11-25T18:00:00Z",
  "deliveryLocation": {
    "address": "City Hospital, 456 Medical Street",
    "location": {
      "type": "Point",
      "coordinates": [77.5946, 12.9716]
    }
  },
  "contactInfo": {
    "contactPerson": "Dr. Sarah Johnson",
    "phone": "+1 234 567 8901"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "requestId": "REQ-HOSP-20261125123456",
    "hospitalId": "60d5ecb8f1c2ab1a8c8e4d7f",
    "requiredBloodGroup": "O+",
    "componentType": "packed_rbc",
    "requiredUnits": 4,
    "urgency": "critical",
    "requiredBy": "2026-11-25T18:00:00Z",
    "status": "pending",
    "createdAt": "2026-11-25T12:34:56Z"
  }
}
```

### GET /api/requests
Get all requests (role-based access).

### GET /api/requests/:id
Get request by ID.

### PUT /api/requests/:id/status
Update request status.

**Valid transitions:**
- pending → matched
- matched → accepted
- accepted → dispatched
- dispatched → delivered

## Dispatch

### POST /api/dispatch
Create dispatch record.

**Request Body:**
```json
{
  "requestId": "REQ-HOSP-20261125123456",
  "bloodBankId": "60d5ecb8f1c2ab1a8c8e4d7e",
  "inventoryId": "60d5ecb8f1c2ab1a8c8e4d7g",
  "bloodGroup": "O+",
  "componentType": "packed_rbc",
  "unitsDispatched": 4,
  "trackingInfo": {
    "driverName": "Rajesh Kumar",
    "vehicleNumber": "TN-01-AB-1234",
    "departureTime": "2026-11-25T14:00:00Z"
  }
}
```

### PUT /api/dispatch/:id/status
Update dispatch status.

**Valid statuses:** assigned, prepared, dispatched, in_transit, delivered, cancelled

## Donors

### GET /api/donors/nearby
Get nearby donors by blood group.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| bloodGroup | string | Yes | Blood group |
| lat | number | Yes | Latitude |
| lng | number | Yes | Longitude |
| radius | number | No | Radius in km (default: 20) |

### PUT /api/donors/availability
Update donor availability.

**Request Body:**
```json
{
  "isAvailable": true,
  "preferredDays": ["Monday", "Wednesday", "Friday"],
  "preferredTime": {
    "from": "09:00",
    "to": "17:00"
  }
}
```

## Admin

### GET /api/admin/dashboard
Get admin dashboard statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 542,
    "totalHospitals": 89,
    "totalBloodBanks": 32,
    "totalDonors": 421,
    "activeRequests": 15,
    "completedDispatches": 1245,
    "totalBloodUnits": 8456,
    "lowStockAlerts": 12,
    "verificationRequests": 5
  }
}
```

### GET /api/admin/users
Get all users (paginated).

### PUT /api/admin/verify/:id
Verify a blood bank.

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role 'donor' is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

## Rate Limiting

API requests are rate limited to:
- 100 requests per minute for authenticated users
- 50 requests per minute for unauthenticated users

## WebSocket Events

### Real-time Updates via Socket.IO

**Event: inventoryUpdate**
```javascript
{
  bloodBankId: "...",
  bloodGroup: "O+",
  componentType: "packed_rbc",
  availableUnits: 5,
  delta: -4
}
```

**Event: requestStatusUpdate**
```javascript
{
  requestId: "REQ-...",
  status: "accepted",
  matchedBloodBank: "60d5ecb..."
}
```

**Event: dispatchStatusUpdate**
```javascript
{
  dispatchId: "DISP-...",
  status: "dispatched",
  trackingInfo: { ... }
}
```
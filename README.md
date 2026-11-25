# Efficient Blood Bank Locator and Dispatcher

**Tagline: Every Drop Counts. Every Second Matters.**

A comprehensive, full-stack web application for connecting blood donors, hospitals, patients, and blood banks through a centralized, location-based blood management system.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [User Roles](#user-roles)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)

## Overview

The Blood Bank Locator and Dispatcher platform aims to reduce the time required to locate, request, verify, and dispatch available blood units during medical emergencies. This system provides real-time blood inventory visibility, GPS-based blood bank discovery, emergency blood requests, donor coordination, and an intelligent dispatch management system.

## Technology Stack

### Frontend
- **React.js** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Lucide React** - Icon library
- **Leaflet.js** - Interactive maps with OpenStreetMap
- **React Hot Toast** - Notification system

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **REST APIs** - RESTful endpoint architecture
- **JWT Authentication** - Token-based authentication
- **bcrypt** - Password hashing
- **Socket.IO** - Real-time communication

### Database
- **MongoDB** - NoSQL database
- **Mongoose ODM** - Object Document Mapper

## User Roles

| Role | Description |
|------|-------------|
| **Hospital** | Create emergency requests, search blood banks, track requests |
| **Blood Bank Manager** | Manage inventory, accept requests, coordinate dispatches |
| **Blood Donor** | Register as donor, receive emergency notifications |
| **Administrator** | Manage users, verify blood banks, system analytics |

## Features

### GPS-Based Blood Bank Locator
- Interactive map showing nearby verified blood banks
- Geolocation detection with permission
- Search by city, area, or PIN code
- Filter by blood group availability

### Live Blood Inventory Management
- Track all 8 major ABO/Rh blood groups
- Component types: Whole blood, Packed RBC, Plasma, Platelets
- Expiry date tracking
- Real-time availability status

### Emergency Blood Request System
- Submit urgent requests with all required details
- Priority levels: Critical, High, Normal
- Unique request ID generation
- Required-by time tracking

### Intelligent Dispatcher Module
- Medically-approved compatibility algorithm
- Distance-based ranking with suitability factors
- Dispatch workflow: Request → Match → Accept → Dispatch → Deliver
- Transaction-safe inventory updates

### Donor Alert System
- Location-based donor notifications
- Emergency request alerts
- Consent management
- Privacy protection

## Project Structure

```
blood-bank-locator/
├── client/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── dashboard/
│       │   │   ├── DashboardLayout.jsx
│       │   │   ├── StatCard.jsx
│       │   │   ├── BloodGroupCard.jsx
│       │   │   └── RequestCard.jsx
│       │   ├── PrivateRoute.jsx
│       │   └── RoleRoute.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── hooks/
│       ├── layouts/
│       │   ├── Layout.jsx
│       │   ├── Header.jsx
│       │   └── Footer.jsx
│       ├── pages/
│       │   ├── auth/
│       │   │   ├── Login.jsx
│       │   │   ├── Register.jsx
│       │   │   └── RoleSelection.jsx
│       │   ├── dashboards/
│       │   │   ├── HospitalDashboard.jsx
│       │   │   ├── BloodBankDashboard.jsx
│       │   │   ├── DonorDashboard.jsx
│       │   │   └── AdminDashboard.jsx
│       │   ├── BloodBankLocator.jsx
│       │   ├── BloodInventory.jsx
│       │   ├── CreateBloodRequest.jsx
│       │   ├── EmergencyRequests.jsx
│       │   ├── DispatcherTracking.jsx
│       │   ├── DonorManagement.jsx
│       │   ├── ContactUs.jsx
│       │   ├── About.jsx
│       │   └── Home.jsx
│       ├── services/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
└── server/
    ├── config/
    │   ├── db.js
    │   ├── jwt.js
    │   └── cors.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── hospital.controller.js
    │   ├── bloodbank.controller.js
    │   ├── donor.controller.js
    │   ├── inventory.controller.js
    │   ├── request.controller.js
    │   ├── dispatch.controller.js
    │   └── admin.controller.js
    ├── middleware/
    │   ├── auth.middleware.js
    │   └── error.middleware.js
    ├── models/
    │   ├── User.model.js
    │   ├── Hospital.model.js
    │   ├── BloodBank.model.js
    │   ├── Donor.model.js
    │   ├── BloodInventory.model.js
    │   ├── BloodRequest.model.js
    │   ├── DispatchRecord.model.js
    │   ├── Notification.model.js
    │   ├── DonationHistory.model.js
    │   └── AuditLog.model.js
    ├── routes/
    │   ├── auth.routes.js
    │   ├── hospital.routes.js
    │   ├── bloodbank.routes.js
    │   ├── donor.routes.js
    │   ├── inventory.routes.js
    │   ├── request.routes.js
    │   ├── dispatch.routes.js
    │   └── admin.routes.js
    ├── services/
    │   ├── auth.service.js
    │   └── dispatcher.service.js
    ├── utils/
    │   └── bloodCompatibility.js
    ├── server.js
    ├── .env.example
    └── package.json

├── docs/
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── DATA_FLOW_DIAGRAM.md
│   ├── UML_USE_CASE.md
│   ├── ER_DIAGRAM.md
│   └── API_DOCUMENTATION.md
├── .gitignore
├── README.md
└── IMPLEMENTATION_GUIDE.md
```

## Installation

### Prerequisites
- Node.js v18.x or higher
- npm v9.x or higher
- MongoDB 6.x or higher

### Backend Setup

```bash
cd blood-bank-locator/server

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the development server
npm run dev
```

### Frontend Setup

```bash
cd blood-bank-locator/client

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Environment Variables

### Backend (.env)
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/blood-bank-locator
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## API Documentation

The complete API documentation is available in `docs/API_DOCUMENTATION.md`.

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Blood Bank Endpoints
- `GET /api/bloodbanks` - Get all blood banks
- `GET /api/bloodbanks/nearby` - Find nearby blood banks
- `GET /api/bloodbanks/:id` - Get blood bank by ID
- `POST /api/bloodbanks` - Create blood bank

### Inventory Endpoints
- `GET /api/inventory` - Get all inventory
- `POST /api/inventory` - Add inventory
- `GET /api/inventory/availability` - Check availability

### Request Endpoints
- `POST /api/requests` - Create blood request
- `GET /api/requests` - Get all requests
- `GET /api/requests/:id` - Get request by ID
- `PUT /api/requests/:id/status` - Update request status

### Dispatch Endpoints
- `POST /api/dispatch` - Create dispatch
- `GET /api/dispatch/:id` - Get dispatch by ID
- `PUT /api/dispatch/:id/status` - Update dispatch status

## Development

### Project Commands

```bash
# Backend
npm run dev        # Development with nodemon
npm start          # Production server
npm test           # Run tests

# Frontend
npm run dev        # Development server (Vite)
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Project Key Features

1. **Real-time Updates**: Socket.IO integration for live inventory and request updates
2. **Geospatial Queries**: 2dsphere indexes for efficient location-based searches
3. **Role-based Access Control**: Secure API endpoints with JWT and role validation
4. **Audit Logging**: Complete audit trail for all inventory and dispatch changes
5. **Responsive Design**: Mobile-first approach with Tailwind CSS

## Testing

The application includes comprehensive tests for:
- Authentication flows
- API endpoints
- Blood compatibility logic
- Dispatcher algorithm

Run tests with:
```bash
# Backend
npm test

# Frontend
npm test
```

## Future Enhancements

1. **SMS Integration**: Twilio for emergency SMS notifications
2. **Payment System**: Integration with blood bank payment systems
3. **Mobile App**: React Native mobile application
4. **AI Predictions**: Machine learning for demand forecasting
5. **OCR Integration**: Blood bank card scanning
6. **Blockchain**: Immutable audit trail for inventory
7. **Multi-language**: Localization support
8. **Offline Mode**: PWA support for offline functionality

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT authentication with secure secrets
- Role-based access control
- Input validation and sanitization
- CORS configuration
- Audit logs for sensitive operations
- Transaction-safe inventory operations

## License

This project is for academic purposes as a capstone project.

## Contact

- Email: info@bloodbanklocator.org
- Phone: 1800-BLOOD-BANK

---

**Built with ❤️ for Healthcare**
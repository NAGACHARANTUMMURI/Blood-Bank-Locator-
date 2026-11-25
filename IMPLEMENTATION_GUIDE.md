# Implementation Guide

## Prerequisites

Before running the Blood Bank Locator application, ensure you have the following installed:

- **Node.js** v18.x or higher
- **npm** v9.x or higher
- **MongoDB** 6.x or higher (or MongoDB Atlas account)

## Installation Instructions

### Step 1: Clone and Navigate to Project

```bash
cd /path/to/blood-bank-locator
```

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### Step 3: Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

### Step 4: Configure Environment Variables

Copy the example environment file and update the values:

```bash
cd server
cp .env.example .env
```

Edit `.env` with your configuration:
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - A strong secret key for JWT signing (minimum 32 characters)
- `CLIENT_URL` - Your frontend URL

### Step 5: Seed the Database (Optional)

To populate the database with sample data:

```bash
cd server
npm run seed
```

## Running the Application

### Start the Backend Server

```bash
cd server
npm run dev
```

The server will start at `http://localhost:5000`

### Start the Frontend Development Server

In a new terminal:

```bash
cd client
npm run dev
```

The frontend will start at `http://localhost:5173`

## Default URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Base Path**: http://localhost:5000/api

## Default User Credentials

After seeding, you can log in with:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@bloodbanklocator.org | admin123 |
| Hospital | info@generalhospital.org | hospital123 |
| Blood Bank | info@redcrossblood.org | bloodbank123 |
| Donor | donorO+@donor.org | donor123 |

## Project Structure

```
blood-bank-locator/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── layouts/         # Layout components
│   │   ├── context/         # React Context
│   │   └── App.jsx          # App entry point
│   ├── public/              # Static assets
│   └── package.json
│
├── server/                  # Node.js Backend
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Express middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   ├── seeds/               # Seed data
│   ├── .env                 # Environment variables
│   └── server.js            # Server entry point
│
├── docs/                    # Documentation
│   ├── API_DOCUMENTATION.md
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── DATA_FLOW_DIAGRAM.md
│   ├── UML_USE_CASE.md
│   └── ER_DIAGRAM.md
│
├── README.md
└── IMPLEMENTATION_GUIDE.md
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | User login |
| GET | /api/auth/profile | Get user profile |
| PUT | /api/auth/profile | Update user profile |
| POST | /api/auth/logout | User logout |

### Blood Banks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/bloodbanks | Get all blood banks |
| GET | /api/bloodbanks/nearby | Get nearby blood banks |
| GET | /api/bloodbanks/:id | Get blood bank by ID |
| POST | /api/bloodbanks | Create new blood bank (Admin) |

### Inventory

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/inventory | Get all inventory |
| GET | /api/inventory/availability | Check blood availability |
| POST | /api/inventory | Add/update inventory |

### Requests

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/requests | Create blood request |
| GET | /api/requests | Get all requests |
| GET | /api/requests/:id | Get request by ID |
| PUT | /api/requests/:id/status | Update request status |

### Dispatch

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/dispatch | Create dispatch |
| GET | /api/dispatch/:id | Get dispatch by ID |
| PUT | /api/dispatch/:id/status | Update dispatch status |

## Troubleshooting

### MongoDB Connection Error

If you see a MongoDB connection error:
1. Ensure MongoDB is running: `mongod --dbpath /data/db`
2. Check your `MONGO_URI` in `.env` file
3. For MongoDB Atlas, ensure your IP is whitelisted

### CORS Error

If you encounter CORS errors:
1. Check that `CLIENT_URL` in `.env` matches your frontend URL
2. Ensure both servers are running on the correct ports

### JWT Token Issues

If you see authentication errors:
1. Ensure `JWT_SECRET` is set in `.env`
2. Check that token expiration hasn't passed

### Leaflet Maps Not Loading

If maps don't load:
1. Ensure you have internet connection
2. Check browser console for tile server errors
3. OpenStreetMap tiles may be blocked in some regions

## Production Deployment

### Backend

1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2
3. Set up a reverse proxy (Nginx)
4. Use environment variables for secrets

### Frontend

1. Build the production bundle: `npm run build`
2. Serve static files using a web server (Nginx, Apache)
3. Configure the proxy to forward `/api` requests to backend

## Development Status

| Feature | Status |
|---------|--------|
| User Authentication | ✅ Complete |
| Blood Bank Locator | ✅ Complete |
| Inventory Management | ✅ Complete |
| Emergency Requests | ✅ Complete |
| Dispatcher Module | ✅ Complete |
| Donor Management | ✅ Complete |
| Admin Dashboard | ✅ Complete |
| Real-time Updates | ✅ Complete |
| Socket.IO Integration | ✅ Complete |

## Notes

- This is an academic capstone project
- The system uses mock data in development mode
- Real-world deployment would require additional security measures
- Production use should include proper email/SMS integrations
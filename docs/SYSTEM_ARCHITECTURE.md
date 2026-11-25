# System Architecture

## Overview

The Blood Bank Locator and Dispatcher is a full-stack web application designed to efficiently coordinate blood donation and distribution during medical emergencies. This document outlines the system architecture, components, and data flow.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CLIENT APPLICATION                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  React.js Frontend  │  Tailwind CSS  │  Leaflet Maps  │  Socket.IO Client  │
│  - Responsive UI    │  - Styling     │  - Map Display │  - Real-time Updates │
│  - React Router     │  - Components  │  - Geocoding   │  - Notifications     │
│  - Axios            │  - Animations  │  - Markers     │                       │
└───────────────────────────────┬─────────────────────────────────────────────┘
                                │
                                │ HTTPS/API Calls (REST + WebSocket)
                                │
┌───────────────────────────────┴─────────────────────────────────────────────┐
│                           SERVER APPLICATION                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Express.js Server  │  JWT Auth  │  Socket.IO  │  Validation & Middleware   │
│  - Routing          │  - Tokens    │  - Real-time│  - Auth Guard               │
│  - Controllers      │  - Guards     │  - Broadcasting│ - Error Handling         │
│  - Services         │               │              │  - Rate Limiting           │
└───────────────────────────────┬─────────────────────────────────────────────┘
                                │
                                │ Mongoose ODM
                                │
┌───────────────────────────────┴─────────────────────────────────────────────┐
│                          DATABASE (MongoDB)                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Collections:                                                               │
│  - users, hospitals, bloodBanks, donors,                                   │
│  - bloodInventory, bloodRequests, dispatchRecords,                        │
│  - notifications, donationHistory, auditLogs                                │
│                                                                             │
│  Indexes:                                                                   │
│  - Geospatial (location: 2dsphere)                                          │
│  - Compound (bloodBank + group + component)                               │
│  - TTL indexes (expiry dates)                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Technology Choices

### Why MongoDB?
- **Flexible Schema**: Blood bank attributes vary between institutions
- **Geospatial Queries**: Native 2dsphere index for location-based searches
- **Scalability**: Horizontal scaling for high traffic during emergencies
- **Real-time**: Change streams for real-time updates

### Why Leaflet.js?
- **Open Source**: Free and community-maintained
- **Lightweight**: Small bundle size
- **Extensible**: Plugins for geocoding, clustering, etc.
- **Offline Capable**: Tile caching support

## System Components

### 1. Authentication Service
```
User Registration → Password Hashing (bcrypt) → Token Generation (JWT) → Database Storage

User Login → Token Verification → Session Creation → Role-based Authorization
```

### 2. Blood Bank Locator Service
```
Geolocation Request → Reverse Geocoding → Geospatial Query (2dsphere) → Results Filtering → Map Rendering
```

### 3. Inventory Management Service
```
Stock Update → Validation → Database Transaction → Audit Logging → Real-time Broadcast
```

### 4. Request Processing Service
```
Request Creation → Validation → Compatibility Check → Matching Algorithm → Dispatch Initiation
```

### 5. Dispatcher Service
```
Request Received → Find Nearby Banks → Check Inventory → Calculate Suitability Score → Rank Options → Send Requests → Track Responses
```

## Data Flow Diagram

```
HOSPITAL                      BLOOD BANK                   DONOR
   │                            │                            │
   │ 1. Login/Register          │                            │
   │───────────────────────────>│                            │
   │                            │                            │
   │ 2. Create Emergency        │                            │
   │    Request                 │                            │
   │───────────────────────────>│                            │
   │                            │                            │
   │            3. Locate Nearby Banks (Geospatial)         │
   │            ───────────────────────────────────────────>│
   │                                                       │
   │            4. Match Inventory (Dispatcher Algorithm)  │
   │            <───────────────────────────────────────────
   │                                                       │
   │ 5. Accept/Reject Request   │                            │
   │<───────────────────────────│                            │
   │                            │                            │
   │            6. Alert Nearby Donors (Optional)          │
   │                            │──────────────────────────→│
   │                            │                            │
   │ 7. Track Dispatch Progress                          │
   │<───────────────────────────────────────────────────────
   │                                                       │
   │ 8. Delivery Confirmation                             │
   │<───────────────────────────────────────────────────────
```

## Security Architecture

### Authentication Flow
```
Client Credentials → HTTPS → Express Middleware → JWT Verification → Role Check → Controller Access
```

### Authorization Rules
| Role | Can Read | Can Write | Can Delete |
|------|----------|-----------|------------|
| Admin | All | All | All |
| Hospital | Their data | Create requests, update status | Cancel requests |
| Blood Bank | Their inventory | Update inventory | Archive expired |
| Donor | Their profile | Update availability | Delete account |

### Data Protection
- **Passwords**: Hashed with bcrypt (12 rounds)
- **Tokens**: JWT signed with strong secret
- **Session**: HTTP-only cookies (production)
- **CORS**: Configured for client domain only
- **Rate Limits**: Per-IP and per-user limits
- **Audit Logs**: All sensitive operations logged

## Scalability Considerations

### Horizontal Scaling
- **Load Balancer**: Distribute traffic across multiple instances
- **Database Sharding**: Shard by geographic region
- **Redis Cache**: Cache frequent queries (blood group availability)
- **Queue System**: Background jobs for notifications

### Performance Optimization
- Database indexes on all query fields
- Pagination for list endpoints
- Connection pooling for database
- Gzip compression for responses

## Deployment Architecture

```
                    ┌──────────────────────────────────┐
                    │       Load Balancer              │
                    │     (NGINX / Cloud Load Balancer) │
                    └─────────────┬──────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                         │
            ┌───────▼───────┐         ┌───────▼───────┐
            │   Server 1    │   ...   │   Server N    │
            │  (Node.js)    │         │  (Node.js)    │
            └───────┬───────┘         └───────┬───────┘
                    │                         │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │     MongoDB Cluster     │
                    │  (Replica Set / Sharded)│
                    └─────────────────────────┘
```

## Microservices Roadmap

### Current: Monolithic Architecture
- Single Express.js application
- Shared database

### Future: Microservices
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Auth Service   │    │  Inventory      │    │  Dispatch       │
│  (users, tokens)│    │  Service        │    │  Service        │
│                 │    │  (blood stock)  │    │  (matching,    │
│                 │    │                 │    │   allocation)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┴───────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │    API Gateway          │
                    │    (Rate Limiting,      │
                    │     Authentication)     │
                    └─────────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │     Service Mesh        │
                    │   (Istio / Linkerd)     │
                    └─────────────────────────┘
```

## Monitoring & Logging

### Metrics Collected
- API response times
- Database query performance
- Authentication success/failure rates
- Blood bank verification status
- Request fulfillment time

### Error Handling
- Centralized error logging
- Sentry integration (future)
- Health check endpoints
- Graceful degradation

## CI/CD Pipeline (Future)

```
Development → Testing → Staging → Production
     │           │         │          │
     ▼           ▼         ▼          ▼
  Unit Tests  E2E Tests  Smoke    Monitor &
  Lint        Security    Tests    Rollback
```
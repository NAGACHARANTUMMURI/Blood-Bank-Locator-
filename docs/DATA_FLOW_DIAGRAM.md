# Data Flow Diagram (DFD)

## Level 0 - Context Diagram

```
+------------------+                    +------------------+
|     User         |                    |  Blood Bank      |
|  (Hospital)      |                    |   Locator &      |
|                  |                    |   Dispatcher     |
+--------+---------+                    +---------+--------+
         |                                       |
         | 1. Create Request                   |
         |-------------------------------------->|
         |                                       |
         | 2. Search Blood Banks                 |
         |<--------------------------------------|
         |                                       |
         | 3. Track Dispatch                     |
         |<-------------------------------------->|
+---------v---------+                    +--------v--------+
|    Donor          |                    |   Admin       |
|  (Blood Donor)    |                    |               |
|                   |                    |               |
+-------------------+                    +-----------------+


External Entities:
- Hospital: Creates emergency requests, tracks deliveries
- Blood Bank: Manages inventory, accepts requests
- Donor: Provides blood donations, receives alerts
- Admin: Monitors system, verifies entities
```

## Level 1 - Major Process Flows

### Process Flow 1: Emergency Request Processing

```
+------------------+
|   Hospital       |
| (Create Request) |
+--------+---------+
         |
         | HTTP POST /api/requests
         | {bloodGroup, units, urgency, ...}
         v
+--------+---------+
|   API Server     |
|   (Validation)   |
+--------+---------+
         |
         | Validate Request
         | Generate Request ID
         v
+--------+---------+
|   Database       |
|   (Store Request)|
+--------+---------+
         |
         | WebSocket Event
         v
+--------+---------+
|   Dispatcher     |
|   Service        |
+--------+---------+
         |
         | Find Compatible Banks
         | Calculate Suitability
         v
+--------+---------+
|   Database       |
|   (Query Inventory)|
+--------+---------+
         |
         | Match & Rank
         v
+--------+---------+
|   Blood Banks    |
| (Receive Request)|
+------------------+
```

### Process Flow 2: Blood Bank Inventory Management

```
+------------------+
|   Blood Bank     |
| (Manager)        |
+--------+---------+
         |
         | HTTP POST/PUT /api/inventory
         | {bloodGroup, units, expiryDate, ...}
         v
+--------+---------+
|   API Server     |
|   (Authorization)|
+--------+---------+
         |
         | Validate Input
         | Check Permissions
         v
+--------+---------+
|   Database       |
|   (Update Inventory)|
+--------+---------+
         |
         | Write Audit Log
         | WebSocket Update
         v
+--------+---------+
|   Hospital       |
| (View Inventory) |
+------------------+
```

### Process Flow 3: Donor Notification System

```
+------------------+
|   Dispatcher     |
|   (Urgent Request)|
+--------+---------+
         |
         | Find Nearby Donors
         v
+--------+---------+
|   Database       |
|   (Query Donors) |
+--------+---------+
         |
         | Filter by Blood Group & Availability
         v
+--------+---------+
|   Notification   |
|   Service        |
+--------+---------+
         |
         | Send Push/SMS/Email
         v
+--------+---------+
|    Donors        |
| (Receive Alert)  |
+------------------+
```

### Process Flow 4: Dispatch Tracking

```
+------------------+
|    Hospital      |
| (Track Request)  |
+--------+---------+
         |
         | HTTP GET /api/dispatch/:id
         v
+--------+---------+
|   API Server     |
|   (Authorization)|
+--------+---------+
         |
         | Fetch Dispatch + Request
         v
+--------+---------+
|   Database       |
|   (Join Queries) |
+--------+---------+
         |
         | Real-time via WebSocket
         v
+--------+---------+
|   Hospital       |
|   (Live Updates) |
+------------------+
```

## Data Store Details

### Data Store 1: Users
```
Record: User
Attributes: _id, name, email, phone, password, role, isVerified, isActive
Indexes: email (unique), role
Connections: Hospital, BloodBank, Donor (1:1)
```

### Data Store 2: Blood Inventory
```
Record: BloodInventory
Attributes: bloodBankId, bloodGroup, componentType, availableUnits, expiryDate, collectionDate
Indexes: bloodBankId+group+component (unique), expiryDate
Connections: BloodBank (many:1)
```

### Data Store 3: Blood Requests
```
Record: BloodRequest
Attributes: requestId, hospitalId, requiredBloodGroup, componentType, requiredUnits, urgency, requiredBy, status
Indexes: hospitalId, status+urgency, requiredBy
Connections: Hospital (many:1), BloodBank (optional:1), DispatchRecord (optional:1)
```

### Data Store 4: Dispatch Records
```
Record: DispatchRecord
Attributes: dispatchId, requestId, bloodBankId, inventoryId, unitsDispatched, status, trackingInfo
Indexes: requestId, bloodBankId, status
Connections: BloodRequest, BloodInventory, BloodBank (1:1 each)
```

### Data Store 5: Location Data
```
Record: Hospital OR BloodBank OR Donor
Attributes: location (2dsphere index)
Indexes: location (2dsphere), bloodGroup (for Donors)
Connections: Various
```

## Data Flow Legend

- **Solid lines**: Data flows between processes and data stores
- **Dashed lines**: Control flows
- **Arrows**: Direction of data flow
- **(R)**: Read operation from data store
- **(W)**: Write operation to data store
- **(C)**: Create operation
- **(U)**: Update operation
- **(D)**: Delete operation

## Event Flow - Dispatcher Algorithm

```
Hospital Creates Request
          |
          v
[Dispatcher Service]
          |
          |---> Query: Find nearby verified blood banks
          |              within 50km radius
          |
          |---> Query: Check inventory availability
          |              for requested blood group
          |              and component type
          |
          |---> Filter: Only verified, available banks
          |
          |---> Score: Calculate suitability for each
          |              bank based on:
          |              - Blood compatibility
          |              - Distance
          |              - Urgency
          |              - Stock level
          |              - Component match
          |
          |---> Rank: Order banks by suitability score
          |
          |---> Select: Top 3 candidate banks
          |
          v
Send Requests to Selected Banks (via WebSocket/HTTP)
          |
          v
Wait for Responses (Accept/Reject)
          |
          v
Update Request Status
          |
          v
Notify Hospital of Match
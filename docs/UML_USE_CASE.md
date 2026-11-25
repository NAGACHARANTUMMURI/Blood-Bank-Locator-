# UML Use Case Diagrams

## Use Case 1: Hospital User

```
+---------------------------------------------------+
|                    Hospital                       |
|                    (Actor)                        |
+---------------------------------------------------+
          ▲           ▲            ▲          ▲
          │           │            │          │
          │           │            │          │
    [Login]       [Create    [Search     [Track  [View
                  Request]    Bank]     Request] History]
          │           │            │          │
          │           │            │          │
          ▼           ▼            ▼          ▼
+---------------------------------------------------+
|              Blood Bank Locator System            |
|                                                   |
|  +--------------------------------------------+   |
|  |         Authentication System              |   |
|  |  - User Login/Register                       |   |
|  |  - Profile Management                        |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        Emergency Request System            |   |
|  |  - Create Blood Request                      |   |
|  |  - View Request Status                       |   |
|  |  - Cancel Request                            |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        Blood Bank Locator                  |   |
|  |  - Search Nearby Blood Banks                 |   |
|  |  - Filter by Blood Group                     |   |
|  |  - View Bank Details                         |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        Dispatch Tracking                   |   |
|  |  - View Dispatch Progress                    |   |
|  |  - Receive Notifications                     |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        Request History                     |   |
|  |  - View Past Requests                        |   |
|  |  - Download Reports                          |   |
|  +--------------------------------------------+   |
+---------------------------------------------------+
```

## Use Case 2: Blood Bank Manager

```
+---------------------------------------------------+
|                  Blood Bank                     |
|                  Manager                          |
+---------------------------------------------------+
          ▲           ▲            ▲          ▲
          │           │            │          │
    [Login]    [Manage    [Update    [Accept   [View
    ]        Inventory]   Inventory] Requests]  Analytics]

+---------------------------------------------------+
|              Blood Bank Locator System            |
|                                                   |
|  +--------------------------------------------+   |
|  |         Authentication                     |   |
|  |  - Login                                     |   |
|  |  - Profile Management                        |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        Inventory Management                |   |
|  |  - Add New Stock                               |   |
|  |  - Update Stock Levels                       |   |
|  |  - Remove Expired Stock                        |   |
|  |  - View Inventory Reports                      |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        Request Management                  |   |
|  |  - Accept/Deny Requests                      |   |
|  |  - Prepare Blood for Dispatch                |   |
|  |  - Update Request Status                     |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        Dispatch Management                 |   |
|  |  - Create Dispatch Records                   |   |
|  |  - Update Dispatch Status                    |   |
|  |  - Track Delivery Progress                   |   |
|  +--------------------------------------------+   |
+---------------------------------------------------+
```

## Use Case 3: Blood Donor

```
+---------------------------------------------------+
|                    Donor                          |
+---------------------------------------------------+
     ▲        ▲         ▲          ▲        ▲
     │        │         │          │        │
[Login] [Create    [Set     [Receive   [Accept/
       ]Profile]   Availability] Alerts]  Decline
                                              Donation]

+---------------------------------------------------+
|              Blood Bank Locator System            |
|                                                   |
|  +--------------------------------------------+   |
|  |         Authentication                     |   |
|  |  - Register as Donor                         |   |
|  |  - Login                                     |   |
|  |  - Update Profile                            |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        Donor Profile                       |   |
|  |  - Blood Group Registration                  |   |
|  |  - Location Registration                       |   |
|  |  - Medical Information                         |   |
|  |  - Consent Management                          |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        Availability Management             |   |
|  |  - Set Available Days/Times                  |   |
|  |  - Toggle Availability Status                |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        Emergency Alerts                    |   |
|  |  - Receive Urgent Notifications              |   |
|  |  - View Request Details                      |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        Donation Management                 |   |
|  |  - Accept Donation Request                     |   |
|  |  - Decline Donation Request                    |   |
|  |  - View Donation History                       |   |
|  +--------------------------------------------+   |
+---------------------------------------------------+
```

## Use Case 4: Administrator

```
+---------------------------------------------------+
|                   Administrator                   |
+---------------------------------------------------+
          ▲           ▲            ▲          ▲
          │           │            │          │
    [Login]     [Manage    [Verify    [Monitor   [Generate

+---------------------------------------------------+
|              Blood Bank Locator System            |
|                                                   |
|  +--------------------------------------------+   |
|  |         Authentication                     |   |
|  |  - Login                                     |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        User Management                     |   |
|  |  - View All Users                              |   |
|  |  - Suspend/Activate Users                      |   |
|  |  - View User Details                           |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        Verification System                 |   |
|  |  - Verify Blood Banks                          |   |
|  |  - Verify Hospitals                              |   |
|  |  - Reject Suspicious Registrations             |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        Inventory Monitoring              |   |
|  |  - View All Inventory Records                  |   |
|  |  - Generate Inventory Reports                  |   |
|  |  - Alert Low Stock Items                       |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        Request Monitoring                |   |
|  |  - View All Requests                           |   |
|  |  - Track Request Fulfillment                   |   |
|  |  - View Dispatch Records                       |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        Analytics & Reports                 |   |
|  |  - Generate System Analytics                   |   |
|  |  - Export Reports                                |   |
|  |  - View Audit Logs                             |   |
|  +--------------------------------------------+   |
|                                                   |
|  +--------------------------------------------+   |
|  |        System Settings                     |   |
|  |  - Configure System Parameters                 |   |
|  |  - Manage Roles & Permissions                  |   |
|  +--------------------------------------------+   |
+---------------------------------------------------+
```

## Use Case Relationships

```
                    +------------------+
                    | <<extend>>       |
                    | View Analytics   |
                    |    (Admin)       |
                    +--------+---------+
                             ▲
                             │
+------------------+    +----+------------------+
| <<include>>      |    | Include             |
| User Login       |    | Update Profile       |
+--------+---------+    +----------+------------+
         ▲                         ▲
         |                         |
+--------+---------+    +----------+------------+
|    Hospital    |    |   Blood Bank    |
| <<actor>>      |    |   <<actor>>     |
|                |    |                 |
+----------------+    +-----------------+
```

## Use Case Descriptions

### Hospital Use Cases

| Use Case | Description | Precondition | Postcondition |
|----------|-------------|----------------|---------------|
| Login | Hospital staff log into the system | Account exists | Session created |
| Create Request | Submit emergency blood request | Logged in, valid data | Request created with ID |
| Search Bank | Find nearby blood banks | Logged in | List of banks displayed |
| Track Request | Monitor request status | Request created | Status updated |
| View History | Access past requests | Logged in | History displayed |

### Blood Bank Use Cases

| Use Case | Description | Precondition | Postcondition |
|----------|-------------|----------------|---------------|
| Login | Manager logs in | Account exists | Session created |
| Manage Inventory | Add/update blood stock | Logged in | Inventory updated |
| Accept Request | Approve blood request | Request received | Dispatch initiated |
| View Analytics | View blood statistics | Logged in | Reports displayed |

### Donor Use Cases

| Use Case | Description | Precondition | Postcondition |
|----------|-------------|----------------|---------------|
| Register | Create donor profile | Valid data | Profile created |
| Set Availability | Update availability | Logged in | Status updated |
| Receive Alert | Get emergency notification | Available, matching group | Notification sent |
| Accept Donation | Confirm donation | Alert received | Donation logged |

### Admin Use Cases

| Use Case | Description | Precondition | Postcondition |
|----------|-------------|----------------|---------------|
| Login | Admin access | Credentials valid | Admin session |
| Manage Users | View/suspend users | Logged in | User status changed |
| Verify Bank | Approve blood bank | Verification request | Bank verified |
| Monitor System | View all activities | Logged in | Dashboard displayed |
| Generate Reports | Create system reports | Any state | Report generated |

## Actor Privileges Matrix

| Use Case | Hospital | Blood Bank | Donor | Admin |
|----------|----------|------------|-------|-------|
| Login | ✓ | ✓ | ✓ | ✓ |
| Register | ✗ | ✗ | ✓ | ✗ |
| Create Request | ✓ | ✗ | ✗ | ✗ |
| Search Banks | ✓ | ✓ | ✓ | ✓ |
| Manage Inventory | ✗ | ✓ | ✗ | ✗ |
| Accept Requests | ✗ | ✓ | ✗ | ✗ |
| Update Availability | ✗ | ✗ | ✓ | ✗ |
| Receive Alerts | ✗ | ✓ | ✓ | ✗ |
| Manage Users | ✗ | ✗ | ✗ | ✓ |
| Verify Banks | ✗ | ✗ | ✗ | ✓ |
| Monitor System | ✗ | ✗ | ✗ | ✓ |
| Generate Reports | ✓ | ✓ | ✗ | ✓ |
# Entity Relationship Diagram (ERD)

## Overview

This document describes the MongoDB document structure relationships for the Blood Bank Locator system.

## Entity Relationships

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USERS COLLECTION                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ Field           | Type          | References          | Notes              │
├────────┬────────┴──────────┬─────┴──────────┬────────┴─────────────────────┤
│ _id    UUID PK           │ Required       │ Primary Key                    │
│ name     String           │ Required       │                              │
│ email    String           │ Required, UQ   │ Unique                         │
│ phone    String           │ Required       │                              │
│ password String           │ Required       │ Hashed with bcrypt             │
│ role     Enum             │ Required       │ hospital, bloodbank, donor, admin │
│ isVerified Boolean       │ Required       │ Default: false                 │
│ isActive   Boolean       │ Required       │ Default: true                  │
│ timestamps               │ Auto           │ createdAt, updatedAt           │
│ roleMetadata             │ Object         │ hospitalId, bloodBankId, donorId │
└──────────────────────────┴─────────────────┴────────────────────────────────┘

│
│ 1
│ │
│ │ role = 'hospital'
│ ▼ 1
┌─────────────────────────────────────────────────────────────────────────────┐
│                           HOSPITALS COLLECTION                              │
├────────┬─────────────────┴──────────┬───────────────────────────────────────┤
│ userId UUID FK (1:1)              │ Required, Unique                      │
│ hospitalName String                │ Required                              │
│ address Object                     │ line1, line2, city, state, pinCode    │
│ location GeoJSON (2dsphere)      │ {type: 'Point', coordinates: [lng,lat]}│
│ contactNumber String               │                                       │
│ department String                  │                                       │
│ type Enum                          │ General, Specialty, Teaching, Mission │
│ totalBeds Number                   │                                       │
│ timestamps                         │                                       │
└────────────────────────────────────┴───────────────────────────────────────┘

│
│ 1
│ │
│ │ role = 'bloodbank'
│ ▼ 1
┌─────────────────────────────────────────────────────────────────────────────┐
│                          BLOODBANKS COLLECTION                              │
├────────┬─────────────────┴──────────┬───────────────────────────────────────┤
│ userId UUID FK (1:1)              │ Required, Unique                      │
│ bloodBankName String               │ Required                              │
│ address Object                     │ line1, line2, city, state, pinCode    │
│ location GeoJSON (2dsphere)      │ {type: 'Point', coordinates: [lng,lat]}│
│ contactNumber String               │                                       │
│ facilities Object                  │ hasRefrigeration, plasma, platelets   │
│ verificationStatus Enum            │ pending, verified, rejected           │
│ verifiedBy UUID FK                 │ Refers to User (admin)                │
│ timestamps                         │                                       │
└────────────────────────────────────┴───────────────────────────────────────┘
                    │
                    │ 1
                    │ │
                    │ │
                    │ ▼ M
┌──────────────────┴──────────────────────────────────────────────────────────┐
│                        BLOOD_INVENTORY COLLECTION                           │
├────────┬─────────────────┴──────────┬───────────────────────────────────────┤
│ bloodBankId UUID FK (M:1)         │ Required, Indexed                     │
│ bloodGroup Enum                    │ A+, A-, B+, B-, AB+, AB-, O+, O-     │
│ componentType Enum                 │ whole_blood, packed_rbc, plasma, platelets │
│ availableUnits Number              │ Required, Min: 0                        │
│ expiryDate Date                    │ Required, Indexed                       │
│ collectionDate Date                │ Required                              │
│ verificationStatus Enum            │ verified, pending_verification, expired │
│ donationId UUID FK (0:1)           │ Optional, refers to DonationHistory    │
│ location GeoJSON (2dsphere)      │ Optional                                  │
│ timestamps                         │                                       │
└────────────────────────────────────┴───────────────────────────────────────┘

│
│ 1
│ │
│ │ role = 'donor'
│ ▼ 1
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DONORS COLLECTION                                 │
├────────┬─────────────────┴──────────┬───────────────────────────────────────┤
│ userId UUID FK (1:1)              │ Required, Unique                      │
│ bloodGroup Enum                    │ Required, Indexed                       │
│ location GeoJSON (2dsphere)      │ Required, Indexed                       │
│ dateOfBirth Date                   │ Required                              │
│ gender Enum                        │ Male, Female, Other                   │
│ lastDonationDate Date              │ Optional                              │
│ totalDonations Number              │ Default: 0                            │
│ availability Object                │ isAvailable, preferredDays, preferredTime │
│ medicalInfo Object                 │ health details                          │
│ consentGiven Boolean               │ Default: false                          │
│ notificationPreferences Object     │ emergencyAlerts, smsEnabled             │
│ timestamps                         │                                       │
└────────────────────────────────────┴─────────────────────────────────────────┘

│
│ 1
│ │
│ │ role = 'hospital'
│ ▼ M
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BLOOD_REQUESTS COLLECTION                           │
├────────┬─────────────────┴──────────┬───────────────────────────────────────┤
│ requestId String (UQ)              │ Generated, Required, Unique            │
│ hospitalId UUID FK (M:1)           │ Required, Indexed                       │
│ requiredBloodGroup Enum            │ Required                              │
│ componentType Enum                 │ Required                              │
│ requiredUnits Number               │ Required, Min: 1                        │
│ patientReference String            │ Required                              │
│ urgency Enum                       │ critical, high, normal                  │
│ requiredBy Date                    │ Required                              │
│ deliveryLocation Object            │ address, location (GeoJSON)             │
│ contactInfo Object                 │ contactPerson, phone, extension         │
│ status Enum                        │ pending, matched, accepted, dispatched, delivered, cancelled, rejected │
│ matchedBloodBank UUID FK (0:1)     │ Optional, refers to BloodBank           │
│ dispatchRecord UUID FK (0:1)       │ Optional, refers to DispatchRecord      │
│ timestamps                         │                                       │
└────────────────────────────────────┴───────────────────────────────────────┘

│
│ 1
│ │
│ │ matched bloodBank
│ ▼ M
┌─────────────────────────────────────────────────────────────────────────────┐
│                       DISPATCH_RECORDS COLLECTION                           │
├────────┬─────────────────┴──────────┬───────────────────────────────────────┤
│ dispatchId String (UQ)             │ Generated, Required, Unique            │
│ requestId UUID FK (1:1)            │ Required, Indexed                       │
│ bloodBankId UUID FK (M:1)          │ Required, Indexed                       │
│ inventoryId UUID FK (1:1)          │ Required, refers to BloodInventory      │
│ bloodGroup Enum                    │ Required                              │
│ componentType Enum                 │ Required                              │
│ unitsDispatched Number             │ Required, Min: 1                        │
│ status Enum                        │ assigned, prepared, dispatched, in_transit, delivered, cancelled │
│ assignedBy UUID FK                 │ Refers to User                          │
│ trackingInfo Object                │ driverName, vehicleNumber, timestamps   │
│ timestamps                         │                                       │
└────────────────────────────────────┴───────────────────────────────────────┘

│
│ M
│ │
│ │ donor
│ ▼ M
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DONATION_HISTORY COLLECTION                         │
├────────┬─────────────────┴──────────┬───────────────────────────────────────┤
│ donorId UUID FK (M:1)              │ Required, Indexed                       │
│ hospitalId UUID FK (0:1)           │ Optional                                │
│ bloodBankId UUID FK (0:1)        │ Optional                                │
│ bloodGroup Enum                    │ Required, Indexed                       │
│ donationDate Date                  │ Required, Default: now                  │
│ componentType Enum                 │ Required, Default: whole_blood          │
│ unitsCollected Number              │ Required, Min: 1                        │
│ donationType Enum                  │ Required, Default: voluntary            │
│ donationCenter Object              │ name, address                           │
│ status Enum                        │ completed, cancelled, no_show             │
│ timestamps                         │                                       │
└────────────────────────────────────┴───────────────────────────────────────┘

│
│ 1                              
│ │                               
│ ▼ M                             
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BLOOD_INVENTORY (via donationId)                    │
│                                                                             │
│ DonationHistory links to BloodInventory                                      │
│ showing the source of the inventory                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Relationship Diagram

```
                    USERS
                      │
          ┌───────────┼───────────┐
          │           │           │
          │           │           │
      HOSPITALS    BLOODBANKS   DONORS
          │           │           │
          │           │           │
          │    ┌──────┴──────┐    │
          │    │             │    │
          │    ▼             ▼    │
          │  BLOOD_INVENTORY      │
          │    ▲             ▲    │
          │    │             │    │
          │    │        DONATION_HISTORY
          │    │             │    │
          │    │             │    │
          ▼    │             │    ▼
    BLOOD_REQUESTS ──────► DISPATCH_RECORDS
          │                     │
          │      NOTIFICATIONS  │
          └─────────┬───────────┘
                    │
               AUDIT_LOGS
```

## Index Summary

| Collection | Index Fields | Type | Purpose |
|------------|--------------|------|---------|
| users | email (unique) | Hash | User lookup |
| users | role | Hash | Role-based queries |
| hospitals | location | 2dsphere | Geospatial queries |
| bloodbanks | location | 2dsphere | Geospatial queries |
| bloodbanks | verificationStatus | Hash | Filter verified banks |
| donors | location | 2dsphere | Geospatial queries |
| donors | bloodGroup, isAvailable | Compound | Find available donors |
| bloodInventory | bloodBankId, bloodGroup, componentType | Compound (Unique) | Prevent duplicates |
| bloodInventory | expiryDate | TTL | Auto-expiry |
| bloodRequests | hospitalId | Hash | Owner queries |
| bloodRequests | status, urgency | Compound | Filter by status |
| bloodRequests | createdAt | Hash | Sort by date |
| dispatchRecords | requestId | Hash | Request tracking |
| dispatchRecords | bloodBankId | Hash | Bank queries |
| dispatchRecords | status | Hash | Status queries |

## Data Population Rules

1. **User Creation**: Must create corresponding role-specific document
2. **Blood Inventory**: Cannot exceed physical capacity (validation)
3. **Dispatch**: Only create after request acceptance
4. **Inventory Updates**: Must be logged in audit logs
5. **Blood Group**: Must follow ABO/Rh system rules

## Transaction Safety

1. **Inventory Deduction**: Only after dispatch confirmation
2. **Duplicate Prevention**: Unique compound indexes
3. **Reference Integrity**: Application-level validation
4. **Expiry Handling**: Automatic status updates via cron job
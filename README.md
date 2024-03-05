# Vehicle Maintenance Tracker
## Overview

This documentation provides an overview of a smartcontract to track users vehicle maintenance date and price called Vehicle Maintenance Tracker. This system is built using TypeScript using the Azle framework. Vehicle Maintenance Tracker helps users to track their vehicles maintenance, including Add, Read, Update, and Delete the track record.

## Data Structures

The Vehicle Maintenance Tracker system utilizes the following data structure:
1. Maintenance
   - `id`: A unique identifier for the vehicle maintenance.
   - `date`: The date of the vehicle maintenance.
   - `name`: The name of the vehicle.
   - `typeVehicle`: The type of the vehicle, such as motorcycle, car, truck.
   - `price`: The cost of the maintenance.
   - `createdAt`: The timestamp when the sleep record was created.
   - `updatedAt`: An optional field indicating the timestamp when the sleep record was last updated.
2. MaintenancePayload: A simplified version of Vehicle Maintenance used for adding new maintenance, containing the `name`, `typeVehicle`, `date`, and `price` fields.

## Functions
1. addMaintenance
   - Description: Adds a new maintenance record to the system.
   - Parameters:
     - payload: `MaintenancePayload` object containing the details of the vehicle maintenance.
2. getMaintenances
   - Description: Retrieves all maintenance records stored in the system.
   - Parameters: -
3. getMaintenance
   - Description: Retrieves a specific maintenance record stored in the system.
   - Parameters:
     - `id`: The ID of the vehicle maintenance record to retrieve.
4. getMaintenancesByName
   - Description: Retrieves all maintenance records stored in the system based on name search.
   - Parameters:
     - `name`: The name of the vehicle maintenance record to retrieve.
5. getMaintenancesByType
    - Description: Retrieves all maintenance records stored in the system based on type search.
    - Parameters:
      - `typeVehicle`: The type of the vehicle maintenance record to retrieve
6. getAvaragePriceByName
    - Description: Retrieves average cost of maintenance records stored in the system based on name search.
    - Parameters:
      - `name`: The name of the vehicle maintenance record to retrieve.
7. getAvaragePriceByType
    - Description: Retrieves average cost of maintenance records stored in the system based on type search.
    - Parameters:
      - `typeVehicle`: The type of the vehicle maintenance record to retrieve.
8. deleteMaintenance
    - Description: Delete a specific maintenance record from the system by ID.
    - Parameters:
      - `id`: The ID of the vehicle maintenance record to delete.
9. updateMaintenance
    - Description: Updates an existing specific maintenance record from the system with new data by ID.
    - Parameters:
      - `id`: The ID of the vehicle maintenance record to update.
      - `payload`: MaintenancePayload object containing the details of the vehicle maintenance.

## Installation
1. Clone the repository
   
   ```
   git clone https://github.com/SamuelYudiGunawan/vehicle-maintenance-tracker.git
   ```
2. Install dependencies

   ```
   npm install
   ```
3. Start the IC local development environment

   ```
   dfx start --background --clean
   ```
4. Deploy the canisters to the local development environment

   ```
   dfx deploy
   ```

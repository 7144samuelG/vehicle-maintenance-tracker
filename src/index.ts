import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';
/** 
 * this type represents maintenance.
 */
type Maintenance = Record<{
    id: string;
    name: string; // the name of the vechile, ex: Motorcycle 12, Car 40, etc
    typeVehicle: string; // the type of the vechile, ex: motorcycle, car, truck, bicycle, etc
    date: string;
    price: number;
    daysRequired:nat64,
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>
/**
*This type represents payload for creating a business
*/
type MaintenancePayload = Record<{
    name: string;
    typeVehicle: string;
    date: string;
    price: number;
    daysRequired:nat64,
}>
/**
 * This type represents booking of car maintenance.
 */
type booking=Record<{
    id:string,
    name:string,
    typeofvehicle:string,
    createdAt:nat64
}>
/**
 * This type represents payload for creating booking.
 */
type bookingPayload=Record<{
    name:string,
    typeofvehicle:string
}>
/**
 * storages variables
 */

const maintenanceStorage = new StableBTreeMap<string, Maintenance>(0, 44, 1024);
const bookmaintenance=new StableBTreeMap<string,booking>(1,44,1024);

/**
 * function to add maintenance
 * @param payload{MaintenancePayload} payload for creating maintenance listing.
 * @returns {Result<Maintenance,Error>} Results of operation.
 */
$update;
export function addMaintenance(payload: MaintenancePayload): Result<Maintenance, string> {
    const maintenance: Maintenance = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    maintenanceStorage.insert(maintenance.id, maintenance);
    return Result.Ok(maintenance);
}



/**
 * function to get maintenances
 * @returns {Result[Maintenance],Error} returns the results of the operation
 */
$query;
export function getMaintenances(): Result<Vec<Maintenance>, string> {
    return Result.Ok(maintenanceStorage.values());
}



/**
 * function to get maintenances by id
 * @param {string} maintenance id
 * @returns {Result<Maintenance,Error>} returns the results of the operation
 */
$query;
export function getMaintenance(id: string): Result<Maintenance, string> {
    //return an error if no id is passed
    if(!id){
        return Result.Err("BadRequest id is required");
    }
    return match(maintenanceStorage.get(id), {
        Some: (record) => Result.Ok<Maintenance, string>(record),
        None: () => Result.Err<Maintenance, string>(`Maintenance not found`)
    });
}

/**
 * function to get maintenances by name
 * @param {string} maintenance name
 * @returns {Result<Maintenance,Error>} returns the results of the operation
 */
$query;
export function getMaintenancesByName(name: string): Result<Vec<Maintenance>, string> {
    //generate an error if no name  is passed
    if(!name){
        return Result.Err("BadRequest name is required");
    }
    const maintenance = maintenanceStorage.values();

    const maintenanceFilter = maintenance.filter(record => record.name === name);
    return Result.Ok(maintenanceFilter);
}


/**
 * function to get maintenances by type
 * @param {string} maintenance type
 * @returns {Result<Maintenance,Error>} returns the results of the operation
 */
$query;
export function getMaintenancesByType(typeVechile: string): Result<Vec<Maintenance>, string> {
    //generate an error if no typevehicle is passed
    if(!typeVechile){
        return Result.Err("BadRequest vehicletype is required");
    }
    const maintenance = maintenanceStorage.values();
    const maintenanceFilter = maintenance.filter(record => record.typeVehicle === typeVechile);
    return Result.Ok(maintenanceFilter);
}



/**
 * function to get average price by name
 * @param {string} maintenance 
 * @returns {Result<Maintenance,Error>} returns the results of the operation
 */
$query;
export function getAveragePriceByName(name: string): Result<number, string> {
    //generate an error if no name is passed
    if(!name){
        return Result.Err("BadRequest name is required");
    }
    const maintenance = maintenanceStorage.values();
    const maintenanceFilter = maintenance.filter(record => record.name === name);
    const totalPrice = maintenanceFilter.reduce((acc, record) => acc + record.price, 0);
    const avgPrice = totalPrice / maintenanceFilter.length;
    return Result.Ok<number, string>(avgPrice);
}



/**
 *  function to get avarage price by type
 * @param {string} maintenance type
 * @returns {Result<Maintenance,Error>} returns the results of the operation
 */
$query;
export function getAveragePriceByType(typeVechile: string): Result<number, string> {
    //generate an error if np typeVehicle is passed
    if(!typeVechile){
        return Result.Err("BadRequest typevehechile is required");
    }
    const maintenance = maintenanceStorage.values();
    const maintenanceFilter = maintenance.filter(record => record.typeVehicle === typeVechile);
    const totalPrice = maintenanceFilter.reduce((acc, record) => acc + record.price, 0);
    const avgPrice = totalPrice / maintenanceFilter.length;
    return Result.Ok<number, string>(avgPrice);
}

/**
 * function to update days of maintenance of different types of vehicle
 * @param {nat64} maintenance type
 * @returns {Result<Maintenance,Error>} returns the results of the operation
 */

$update
export function updateDaysOfMaintenance(id:string,vehicletype:string,days:nat64,payload: MaintenancePayload):Result<Maintenance,string>{
    //generate an error if no type of vehicle passed
    if(!id || !vehicletype){
        return Result.Err("BadRequest typevehechile and id are required");
    }
    return match(maintenanceStorage.get(id), {
        Some: (record) => {
            const updatedRecord: Maintenance = {...record, ...payload,daysRequired:days, updatedAt: Opt.Some(ic.time())};
            maintenanceStorage.insert(record.id, updatedRecord);
            return Result.Ok<Maintenance, string>(updatedRecord);
        },
        None: () => Result.Err<Maintenance, string>(`Maintenance not found`)
    });
}
// function to delete maintenance by id
$update;
export function deleteMaintenance(id: string): Result<Maintenance, string> {
    return match(maintenanceStorage.remove(id), {
        Some: (deletedRecord) => Result.Ok<Maintenance, string>(deletedRecord),
        None: () => Result.Err<Maintenance, string>(`Maintenance not found`)
    });
}


// function to update maintenance by id
$update;
export function updateMaintenance(id: string, payload: MaintenancePayload): Result<Maintenance, string> {
    //return an error if no id is passed
    if(!id){
        return Result.Err("BadRequest id is required");
    }
    return match(maintenanceStorage.get(id), {
        Some: (record) => {
            const updatedRecord: Maintenance = {...record, ...payload, updatedAt: Opt.Some(ic.time())};
            maintenanceStorage.insert(record.id, updatedRecord);
            return Result.Ok<Maintenance, string>(updatedRecord);
        },
        None: () => Result.Err<Maintenance, string>(`Maintenance not found`)
    });
}
/**
 * this function allow user to book for vehicle maintenance
 */
$update
export function bookMaintenance(payload:bookingPayload):Result<booking,string>{
    const bookvehiclemaintenance: booking = { id: uuidv4(), createdAt: ic.time(), ...payload };
    bookmaintenance.insert(bookvehiclemaintenance.id,bookvehiclemaintenance);
    return Result.Ok(bookvehiclemaintenance);
}
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    },
};
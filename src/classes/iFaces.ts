import Lap from "./lap";
import GeoPoint from "./geoPoint";
import GpsPoint from "./gpsPoint";
import * as consts from './consts';
import Activity from "./activity";

 export interface iXsiType {
    'xsi:type': string;
}

 export interface iXmlBuild {
    VersionMajor: Array<string>;
    VersionMinor: Array<string>;
    BuildMajor: Array<string>;
    BuildMinor: Array<string>;
}

 export interface iXmlAuthor {
    Name: Array<string>;
    $: iXsiType;
    Build: Array<any>;
    LangID: Array<string>;
    PartNumber: Array<string>;
}

 export interface iXmlCreator {
    Name: Array<string>;
    isRuntastic: Boolean;
    $: iXsiType;
    ProductID: Array<string>;
    UnitId: Array<string>;
    Version: Array<iXmlBuild>;
}

 export interface iXmlActivity {
    $: { Sport: string }; //{Sport}
    Creator: Array<iXmlCreator>;
    Id: Array<string>;
    Lap: Array<iXmlLap>;
}

 export interface iXmlLap {
    $: { StartTime: string };
    AverageHeartRateBpm?: Array<{ Value: string }>;
    MaximumHeartRateBpm?: Array<{ Value: string }>
    MaximumSpeed?: Array<string>;
    TotalTimeSeconds?: Array<string>;
    Calories?: Array<string>;
    DistanceMeters?: Array<string>;
    MaxBikeCadence?: Array<string>;
    Steps?: Array<string>;
    AvgRunCadence?: Array<string>;
    MaxRunCadence?: Array<string>;
    AvgSpeed?: Array<string>;
    Intensity?: Array<string>;
    Extensions?: any;
    Cadence?: Array<string>;
    TriggerMethod?: Array<string>;
    Track?: Array<iXmlTrack>;
}

 export interface iXmlTrack {
    Trackpoint: Array<iXmlTrackPoint>;
}

export interface iXmlTrackPoint {
    AltitudeMeters: Array<string>;
    DistanceMeters: Array<String>;
    Extensions: Array<any>;
    HeartRateBpm: Array<{
        $: any;
        Value: string
    }>;
    Position: Array<{
        LatitudeDegrees: Array<string>;
        LongitudeDegrees: Array<string>;
    }>;
    Time: Array<string>;
    Cadence: Array<string>;
}

export interface iXmlActivities {
    $: any;
    Creator: Array<iXmlCreator>;
    Id: Array<string>;
    Lap: Array<any>;
    Activity: Array<iXmlActivity>;
}

interface iXmlData {
    TrainingCenterDatabase: iXmlTrainingCenterDatabase;
}

interface iXmlTrainingCenterDatabase {
    $: { creator?: string };
    Activities: Array<iXmlActivities>;
    Author: Array<iXmlAuthor>;
}

/**
 * Δήλωση για γεωγραφικό σημείο
 * @interface
 */
 interface iGeoPoint {
    latitudeDegrees: number
    longitudeDegrees: number
    altitudeMeters: number
}

export {
    iGeoPoint as IGeoPoint
}

export interface iZone{
    zone:number, 
    time:number
}

export const enum ActivitiesTypes {
    Generic = 0,
    Running = 1,
    Biking = 2,
    Transition = 3,
    FitnessEquipment = 4,
    Swimming = 5,
    Walking = 6,
    Sedentary = 8,
    All = 254,
    Invalid = 0xFF
}

export class SavePoints {
    time: number;
    hr: number;
    cadence: number;
    distance: number;
    position: GeoPoint;
    constructor() {
        this.hr = consts.ERROR_NUMBER_VALUE;
        this.cadence = consts.ERROR_NUMBER_VALUE;
    }

    assignPoint(point: GpsPoint, distance: number, time: number, thisValue: Activity): void {
        if (point) {
            this.time = time;
            this.hr = point.heartRateBpm;
            switch (thisValue.sport) {
                case ActivitiesTypes.Running:
                    this.cadence = point.runCadence;
                    break;
                case ActivitiesTypes.Biking:
                    this.cadence = point.cadence;
                    break;
                default:
                    this.cadence = consts.ERROR_NUMBER_VALUE;
                    break;
            }
            this.position = point.position;
            this.distance = distance;
        }
    }
}

export class DataRecord {
    date:Date;
    value:number | string | any;
}

 export {
    iGeoPoint, 
    iXmlTrainingCenterDatabase,
    iXmlData
 }

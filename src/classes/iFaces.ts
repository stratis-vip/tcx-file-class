import Lap from "./lap";

 interface iXsiType {
    'xsi:type': string;
}

 interface iXmlBuild {
    VersionMajor: Array<string>;
    VersionMinor: Array<string>;
    BuildMajor: Array<string>;
    BuildMinor: Array<string>;
}

 interface iXmlAuthor {
    Name: Array<string>;
    $: iXsiType;
    Build: Array<any>;
    LangID: Array<string>;
    PartNumber: Array<string>;
}

 interface iXmlCreator {
    Name: Array<string>;
    isRuntastic: Boolean;
    $: iXsiType;
    ProductID: Array<string>;
    UnitId: Array<string>;
    Version: Array<iXmlBuild>;
}

 interface iXmlActivity {
    $: { Sport: string }; //{Sport}
    Creator: Array<iXmlCreator>;
    Id: Array<string>;
    Lap: Array<iXmlLap>;
}

 interface iXmlLap {
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

 interface iXmlTrack {
    Trackpoint: Array<iXmlTrackPoint>;
}
interface iXmlTrackPoint {
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

interface iXmlActivities {
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
    iGeoPoint, 
    iXmlTrainingCenterDatabase,
    iXmlLap,
    iXmlTrackPoint,
    iXsiType,
    iXmlBuild,
    iXmlAuthor,
    iXmlCreator,
    iXmlActivity,
    iXmlTrack,
    iXmlActivities, 
    iXmlData
 }

declare class GpsPoint {
    distanceMeters: number;
    speed: number;
    runCandence: number;
    candence: number;
    heartRateBpm: number;
    position: {
        latitudeDegrees: number;
        longitudeDegrees: number;
        altitudeMeters: number;
    };
    time: string;
    constructor(obj: any);
}
export default GpsPoint;

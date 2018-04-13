import Point from "./point";
declare class Lap {
    startTime: string;
    averageHeartRateBpm: number;
    maximumHeartRateBpm: number;
    maximumSpeed: number;
    totalTimeSeconds: number;
    calories: number;
    distanceMeters: number;
    maxBikeCadence: number;
    steps: number;
    avgRunCadence: number;
    maxRunCadence: number;
    avgSpeed: number;
    intensity: string;
    trackPoints: Array<Point>;
    triggerMethod: string;
    constructor(obj: any);
}
export default Lap;

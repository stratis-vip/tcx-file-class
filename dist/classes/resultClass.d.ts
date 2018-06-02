import { SavePoints } from "./iFaces";
import { BestTimes } from "./bestTimes";
export declare class ResultClass {
    id: string;
    sport: number;
    athlete: number;
    distance: number;
    totalTime: number;
    minAlt: number;
    maxAlt: number;
    totalUp: number;
    totalDown: number;
    maxSpeed: number;
    maxCadence: number;
    maxHR: number;
    zones: {
        zone: number;
        time: number;
    }[];
    points: Array<SavePoints>;
    times: BestTimes[];
    constructor();
}

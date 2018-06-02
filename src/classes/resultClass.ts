import * as consts from "./consts";
import { SavePoints } from "./iFaces";
import {BestTimes} from "./bestTimes";

export class ResultClass {
    id = "";
    sport = 255;
    athlete =consts.ERROR_NUMBER_VALUE;
    distance = 0;
    totalTime = 0;
    minAlt = consts.ERROR_NUMBER_VALUE;
    maxAlt = consts.ERROR_NUMBER_VALUE;
    totalUp = 0;
    totalDown = 0;
    maxSpeed = consts.ERROR_NUMBER_VALUE;
    maxCadence = consts.ERROR_NUMBER_VALUE;
    maxHR = consts.ERROR_NUMBER_VALUE;
    zones = [{ zone: 1, time: 0 },
    { zone: 2, time: 0 },
    { zone: 3, time: 0 },
    { zone: 4, time: 0 },
    { zone: 5, time: 0 }]
    points: Array<SavePoints>;
    times = Array<BestTimes>();
    constructor() {
        this.points = new Array<SavePoints>();
    }
}
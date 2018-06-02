import * as consts from "./consts";
import { ActivitiesTypes } from "./iFaces";

export default class BestTimes {
    start = consts.ERROR_NUMBER_VALUE;
    end = consts.ERROR_NUMBER_VALUE;
    distance: number;
    time = consts.ERROR_NUMBER_VALUE;
    recTime = consts.ERROR_NUMBER_VALUE;
    avgHr = consts.ERROR_NUMBER_VALUE;
    dAlt = consts.ERROR_NUMBER_VALUE;
}

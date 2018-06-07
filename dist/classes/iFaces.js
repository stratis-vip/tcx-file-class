"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts = require("./consts");
class SavePoints {
    constructor() {
        this.hr = consts.ERROR_NUMBER_VALUE;
        this.cadence = consts.ERROR_NUMBER_VALUE;
        this.isChangingPoint = false;
    }
    assignPoint(point, distance, time, thisValue, isChangingPoint) {
        if (point) {
            this.time = time;
            this.hr = point.heartRateBpm;
            switch (thisValue.sport) {
                case 1 /* Running */:
                    this.cadence = point.runCadence;
                    break;
                case 2 /* Biking */:
                    this.cadence = point.cadence;
                    break;
                default:
                    this.cadence = consts.ERROR_NUMBER_VALUE;
                    break;
            }
            this.position = point.position;
            this.distance = distance;
            this.isChangingPoint = isChangingPoint;
        }
    }
}
exports.SavePoints = SavePoints;
class DataRecord {
}
exports.DataRecord = DataRecord;
//# sourceMappingURL=iFaces.js.map
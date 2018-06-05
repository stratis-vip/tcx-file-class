"use strict";
exports.__esModule = true;
var consts = require("./consts");
var SavePoints = /** @class */ (function () {
    function SavePoints() {
        this.hr = consts.ERROR_NUMBER_VALUE;
        this.cadence = consts.ERROR_NUMBER_VALUE;
    }
    SavePoints.prototype.assignPoint = function (point, distance, time, thisValue) {
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
        }
    };
    return SavePoints;
}());
exports.SavePoints = SavePoints;
var DataRecord = /** @class */ (function () {
    function DataRecord() {
    }
    return DataRecord;
}());
exports.DataRecord = DataRecord;

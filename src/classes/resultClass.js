"use strict";
exports.__esModule = true;
var consts = require("./consts");
var ResultClass = /** @class */ (function () {
    function ResultClass() {
        this.id = "";
        this.sport = 255;
        this.athlete = consts.ERROR_NUMBER_VALUE;
        this.distance = 0;
        this.totalTime = 0;
        this.minAlt = consts.ERROR_NUMBER_VALUE;
        this.maxAlt = consts.ERROR_NUMBER_VALUE;
        this.totalUp = 0;
        this.totalDown = 0;
        this.maxSpeed = consts.ERROR_NUMBER_VALUE;
        this.maxCadence = consts.ERROR_NUMBER_VALUE;
        this.maxHR = consts.ERROR_NUMBER_VALUE;
        this.zones = [{ zone: 1, time: 0 },
            { zone: 2, time: 0 },
            { zone: 3, time: 0 },
            { zone: 4, time: 0 },
            { zone: 5, time: 0 }];
        this.times = Array();
        this.points = new Array();
    }
    return ResultClass;
}());
exports.ResultClass = ResultClass;

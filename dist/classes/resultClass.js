"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts = require("./consts");
class ResultClass {
    constructor() {
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
}
exports.ResultClass = ResultClass;
//# sourceMappingURL=resultClass.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const point_1 = require("./point");
class TrackPoints {
    constructor(obj) {
        this.points = new Array();
        if (obj !== undefined) {
            let pointCount = obj.Trackpoint.length;
            for (let i = 0; i != pointCount; ++i) {
                this.points.push(new point_1.default(obj.Trackpoint[i]));
            }
        }
    }
}
exports.default = TrackPoints;
//# sourceMappingURL=trackPoint.js.map
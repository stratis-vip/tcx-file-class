"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts = require("./consts");
class Point {
    constructor(obj) {
        this.distanceMeters = consts.ERROR_NUMBER_VALUE;
        this.speed = consts.ERROR_NUMBER_VALUE;
        this.runCandence = consts.ERROR_NUMBER_VALUE;
        this.candence = consts.ERROR_NUMBER_VALUE;
        this.heartRateBpm = consts.ERROR_NUMBER_VALUE;
        this.position = {
            latitudeDegrees: consts.ERROR_NUMBER_VALUE,
            longitudeDegrees: consts.ERROR_NUMBER_VALUE,
            altitudeMeters: consts.ERROR_NUMBER_VALUE
        };
        this.time = consts.ERROR_STRING_VALUE;
        if (obj !== undefined) {
            if (obj.DistanceMeters !== undefined) {
                this.distanceMeters = Number(obj.DistanceMeters[0]);
            }
            if (obj.Extensions !== undefined && obj.Extensions[0]["ns3:TPX"] !== undefined) {
                this.speed = Number(obj.Extensions[0]["ns3:TPX"][0]["ns3:Speed"][0]);
                if (obj.Extensions[0]["ns3:TPX"][0]["ns3:RunCadence"] !== undefined) {
                    this.runCandence = Number(obj.Extensions[0]["ns3:TPX"][0]["ns3:RunCadence"][0]);
                }
            }
            else {
                if (obj.Extensions !== undefined && obj.Extensions[0].TPX !== undefined) {
                    //TODO na βρω ποδηλατικό πολαρ
                    this.runCandence = Number(obj.Extensions[0].TPX[0].RunCadence[0]);
                    this.speed = Number(obj.Extensions[0].TPX[0].Speed[0]);
                }
            }
            if (obj.Cadence !== undefined) {
                this.candence = Number(obj.Cadence[0]);
            }
            if (obj.HeartRateBpm !== undefined) {
                this.heartRateBpm = Number(obj.HeartRateBpm[0].Value[0]);
            }
            this.time = obj.Time[0];
            if (obj.Position !== undefined) {
                this.position.latitudeDegrees = Number(obj.Position[0].LatitudeDegrees[0]);
                this.position.longitudeDegrees = Number(obj.Position[0].LongitudeDegrees[0]);
                if (obj.AltitudeMeters !== undefined) {
                    this.position.altitudeMeters = Number(obj.AltitudeMeters[0]);
                }
                else {
                    this.position.altitudeMeters = consts.ERROR_NUMBER_VALUE;
                }
            }
        }
    }
}
exports.default = Point;
//# sourceMappingURL=point.js.map
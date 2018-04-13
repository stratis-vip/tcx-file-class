"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts = require("./consts");
const point_1 = require("./point");
class Lap {
    constructor(obj) {
        this.maxBikeCadence = consts.ERROR_NUMBER_VALUE;
        this.steps = consts.ERROR_NUMBER_VALUE;
        this.avgRunCadence = consts.ERROR_NUMBER_VALUE;
        this.maxRunCadence = consts.ERROR_NUMBER_VALUE;
        this.avgSpeed = consts.ERROR_NUMBER_VALUE;
        this.intensity = consts.ERROR_STRING_VALUE;
        this.triggerMethod = consts.ERROR_STRING_VALUE;
        if (Object.keys(obj).length !== 0) {
            this.startTime = obj.$.StartTime;
            this.averageHeartRateBpm = Number(obj.AverageHeartRateBpm[0].Value[0]);
            this.maximumHeartRateBpm = Number(obj.MaximumHeartRateBpm[0].Value[0]);
            this.maximumSpeed = Number(obj.MaximumSpeed[0]);
            this.totalTimeSeconds = Number(obj.TotalTimeSeconds[0]);
            this.calories = Number(obj.Calories[0]);
            this.distanceMeters = Number(obj.DistanceMeters[0]);
            this.maxBikeCadence = consts.ERROR_NUMBER_VALUE;
            this.steps = consts.ERROR_NUMBER_VALUE;
            this.avgRunCadence = consts.ERROR_NUMBER_VALUE;
            this.maxRunCadence = consts.ERROR_NUMBER_VALUE;
            this.avgSpeed = consts.ERROR_NUMBER_VALUE;
            this.intensity = consts.ERROR_STRING_VALUE;
            if (obj.Extensions !== undefined) {
                if (obj.Extensions[0]["ns3:LX"] !== undefined) {
                    //garimn
                    if (obj.Extensions[0]["ns3:LX"][0]["ns3:MaxBikeCadence"] !== undefined) {
                        this.maxBikeCadence = Number(obj.Extensions[0]["ns3:LX"][0]["ns3:MaxBikeCadence"][0]);
                    }
                    if (obj.Extensions[0]["ns3:LX"][0]["ns3:Steps"] !== undefined) {
                        this.steps = Number(obj.Extensions[0]["ns3:LX"][0]["ns3:Steps"][0]);
                    }
                    if (obj.Extensions[0]["ns3:LX"][0]["ns3:AvgRunCadence"] !== undefined) {
                        this.avgRunCadence = Number(obj.Extensions[0]["ns3:LX"][0]["ns3:AvgRunCadence"][0]);
                    }
                    if (obj.Extensions[0]["ns3:LX"][0]["ns3:MaxRunCadence"] !== undefined) {
                        this.maxRunCadence = Number(obj.Extensions[0]["ns3:LX"][0]["ns3:MaxRunCadence"][0]);
                    }
                    if (obj.Extensions[0]["ns3:LX"][0]["ns3:AvgSpeed"] !== undefined) {
                        this.avgSpeed = Number(obj.Extensions[0]["ns3:LX"][0]["ns3:AvgSpeed"][0]);
                    }
                }
                else {
                    if (obj.Extensions[0].LX !== undefined) {
                        this.avgSpeed = Number(obj.Extensions[0].LX[0].AvgSpeed[0]);
                        //TODO να δω τι γίνεται με ποδηλατικό πόλαρ αρχείο
                        if (obj.Cadence !== undefined) {
                            this.avgRunCadence = Number(obj.Cadence[0]);
                        }
                    }
                    //polar
                }
            }
            if (obj.Intensity !== undefined) {
                this.intensity = obj.Intensity[0];
            }
            let po = obj.Track[0].TrackPoint;
            this.trackPoints = getPoints(obj);
            this.triggerMethod = obj.TriggerMethod[0];
        }
    }
}
function getPoints(obj) {
    let points = [];
    if (obj !== undefined) {
        let pointCount = obj.Track[0].Trackpoint.length;
        for (let i = 0; i != pointCount; ++i) {
            points.push(new point_1.default(obj.Track[0].Trackpoint[i]));
        }
    }
    return points;
}
exports.default = Lap;
//# sourceMappingURL=lap.js.map
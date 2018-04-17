"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts = require("./consts");
const GpsPoint_1 = require("./GpsPoint");
function getValueFromObject(arg) {
    if (arg !== undefined) {
        return Number(arg[0].Value[0]);
    }
    else {
        return consts.ERROR_NUMBER_VALUE;
    }
}
/** Οι πληροφορίες που έχει το κάθε Lap στο tcx αρχείο */
class Lap {
    /**Δημιουργία αντικειμένου
     * @param obj το αντικείμενο με τον γύρο και τα σημεία
     */
    constructor(obj) {
        /**Μέσοι καρδιακοί παλμοί */
        this.averageHeartRateBpm = consts.ERROR_NUMBER_VALUE;
        /** Μέγιστος καρδιακός παλμός */
        this.maximumHeartRateBpm = consts.ERROR_NUMBER_VALUE;
        /** Μέγιστη ταχύτητα */
        this.maximumSpeed = consts.ERROR_NUMBER_VALUE;
        /**Συνολικός χρόνος */
        this.totalTimeSeconds = consts.ERROR_NUMBER_VALUE;
        /**θερμίδες */
        this.calories = consts.ERROR_NUMBER_VALUE;
        /**H απόσταση σε μέτρα */
        this.distanceMeters = consts.ERROR_NUMBER_VALUE;
        /**Μέγιστη πεταλιά ποδηλάτου */
        this.maxBikeCadence = consts.ERROR_NUMBER_VALUE;
        /**Βήματα (;) */
        this.steps = consts.ERROR_NUMBER_VALUE;
        /**Μέσος αριθμός βημάτων ανά λεπτό */
        this.avgRunCadence = consts.ERROR_NUMBER_VALUE;
        /**Μέγιστος αριθμός βημάτων ανά λεπτό */
        this.maxRunCadence = consts.ERROR_NUMBER_VALUE;
        /**Μέση ταχύτητα */
        this.avgSpeed = consts.ERROR_NUMBER_VALUE;
        /**intensity */
        this.intensity = consts.ERROR_STRING_VALUE;
        /**TriggerMethod*/
        this.triggerMethod = consts.ERROR_STRING_VALUE;
        if (Object.keys(obj).length !== 0) {
            this.startTime = obj.$.StartTime;
            this.averageHeartRateBpm = getValueFromObject(obj.AverageHeartRateBpm);
            this.maximumHeartRateBpm = getValueFromObject(obj.MaximumHeartRateBpm);
            this.maximumSpeed = consts.getExt(obj.MaximumSpeed);
            this.totalTimeSeconds = consts.getExt(obj.TotalTimeSeconds);
            this.calories = consts.getExt(obj.Calories);
            this.distanceMeters = consts.getExt(obj.DistanceMeters);
            this.maxBikeCadence = consts.ERROR_NUMBER_VALUE;
            this.steps = consts.ERROR_NUMBER_VALUE;
            this.avgRunCadence = consts.ERROR_NUMBER_VALUE;
            this.maxRunCadence = consts.ERROR_NUMBER_VALUE;
            this.avgSpeed = consts.ERROR_NUMBER_VALUE;
            this.intensity = consts.ERROR_STRING_VALUE;
            if (obj.Extensions !== undefined) {
                if (obj.Extensions[0]["ns3:LX"] !== undefined) {
                    //garimn
                    this.maxBikeCadence = consts.getExt(obj.Extensions[0]["ns3:LX"][0]["ns3:MaxBikeCadence"]);
                    this.steps = consts.getExt(obj.Extensions[0]["ns3:LX"][0]["ns3:Steps"]);
                    this.avgRunCadence = consts.getExt(obj.Extensions[0]["ns3:LX"][0]["ns3:AvgRunCadence"]);
                    this.maxRunCadence = consts.getExt(obj.Extensions[0]["ns3:LX"][0]["ns3:MaxRunCadence"]);
                    this.avgSpeed = consts.getExt(obj.Extensions[0]["ns3:LX"][0]["ns3:AvgSpeed"]);
                }
                else {
                    if (obj.Extensions[0].LX !== undefined) {
                        this.avgSpeed = consts.getExt(obj.Extensions[0].LX[0].AvgSpeed);
                        this.avgRunCadence = consts.getExt(obj.Cadence);
                    }
                }
            }
        }
        if (obj.Intensity !== undefined) {
            this.intensity = obj.Intensity[0];
        }
        // let po = obj.Track[0].TrackPoint;
        this.trackPoints = getPoints(obj);
        this.triggerMethod = obj.TriggerMethod[0];
    }
}
exports.default = Lap;
/**
 * Δημιουργεί ένα πίνακα με τα gps σημεία του αρχείου
 *
 * @param {iXmlLap} obj το αντικείμενο με τον xml Lap
 */
function getPoints(obj) {
    let points = new Array();
    if (obj !== undefined) {
        let pointCount = obj.Track[0].Trackpoint.length;
        for (let i = 0; i != pointCount; ++i) {
            points.push(new GpsPoint_1.default(obj.Track[0].Trackpoint[i]));
        }
    }
    return points;
}
//# sourceMappingURL=lap.js.map
"use strict";
exports.__esModule = true;
var consts = require("./consts");
var gpsPoint_1 = require("./gpsPoint");
/** Οι πληροφορίες που έχει το κάθε Lap στο tcx αρχείο */
var Lap = /** @class */ (function () {
    /**Δημιουργία αντικειμένου
     * @param obj το αντικείμενο με τον γύρο και τα σημεία
     */
    function Lap(obj) {
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
            this.averageHeartRateBpm = consts.getExtV(obj.AverageHeartRateBpm);
            this.maximumHeartRateBpm = consts.getExtV(obj.MaximumHeartRateBpm);
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
    return Lap;
}());
exports.Lap = Lap;
/**
 * Δημιουργεί ένα πίνακα με τα gps σημεία του αρχείου
 *
 * @param {iXmlLap} obj το αντικείμενο με τον xml Lap
 */
function getPoints(obj) {
    var points = new Array();
    if (obj !== undefined) {
        var pointCount = obj.Track[0].Trackpoint.length;
        for (var i = 0; i != pointCount; ++i) {
            points.push(new gpsPoint_1.GpsPoint(obj.Track[0].Trackpoint[i]));
        }
    }
    return points;
}

"use strict";
exports.__esModule = true;
var consts = require("./consts");
var geoPoint_1 = require("./geoPoint");
/**
 * To αντικείμενο που κρατά όλα τα στοιχεία που έχει το TCX αρχείο για κάθε ένα σημείο καταγραφής
 */
var GpsPoint = /** @class */ (function () {
    /**
     * Συμπληρώνει το αντικείμενο από τα στοιχεία του TCX
     *
     * @param obj η xml καταγραφή από το αρχείο TCX
     */
    function GpsPoint(obj) {
        /**Η μέχρι τώρα απόσταση */
        this.distanceMeters = consts.ERROR_NUMBER_VALUE;
        /**η τρέχουσα ταχύτητα */
        this.speed = consts.ERROR_NUMBER_VALUE;
        /**Η ταχύτητα βηματισμού */
        this.runCadence = consts.ERROR_NUMBER_VALUE;
        /**Το cadence */
        this.cadence = consts.ERROR_NUMBER_VALUE;
        /**O τρέχων καρδιακός παλμός */
        this.heartRateBpm = consts.ERROR_NUMBER_VALUE;
        /**Οι συντεταγμένες του σημείου και το υψόμετρο */
        this.position = new geoPoint_1.GeoPoint();
        /**Ο χρόνος καταγραφής */
        this.time = consts.ERROR_STRING_VALUE;
        if (obj !== undefined) {
            this.distanceMeters = consts.getExt(obj.DistanceMeters);
            if (obj.Extensions !== undefined && obj.Extensions[0]["ns3:TPX"] !== undefined) {
                this.speed = consts.getExt(obj.Extensions[0]["ns3:TPX"][0]["ns3:Speed"]);
                this.runCadence = consts.getExt(obj.Extensions[0]["ns3:TPX"][0]["ns3:RunCadence"]);
            }
            else {
                if (obj.Extensions !== undefined && obj.Extensions[0].TPX !== undefined) {
                    this.runCadence = consts.getExt(obj.Extensions[0].TPX[0].RunCadence);
                    this.speed = consts.getExt(obj.Extensions[0].TPX[0].Speed);
                }
            }
            this.cadence = consts.getExt(obj.Cadence);
            // if (obj.Cadence !== undefined) {
            // this.cadence = Number(obj.Cadence[0]);
            // }
            this.heartRateBpm = consts.getExtV(obj.HeartRateBpm);
            // if (obj.HeartRateBpm !== undefined) {
            //     this.heartRateBpm = Number(obj.HeartRateBpm[0].Value[0]);
            // }
            //this.time = consts.getExt(obj.Time);
            this.time = obj.Time[0];
            if (obj.Position !== undefined) {
                this.position.latitudeDegrees = consts.getExt(obj.Position[0].LatitudeDegrees);
                this.position.longitudeDegrees = consts.getExt(obj.Position[0].LongitudeDegrees);
                this.position.altitudeMeters = consts.getExt(obj.AltitudeMeters);
            }
        }
    }
    return GpsPoint;
}());
exports.GpsPoint = GpsPoint;

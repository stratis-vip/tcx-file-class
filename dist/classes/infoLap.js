"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Οι πληροφορίες που έχει συγκεντρωτικά το κάθε Lap στο tcx αρχείο */
class InfoLap {
    /**Δημιουργία αντικειμένου
     * @param obj το αντικείμενο από όπου θα αφαιρέσει μόνο τις ιδιότητες που μας ενδιαφέρουν
     */
    constructor(obj) {
        this.startTime = obj.startTime;
        this.averageHeartRateBpm = obj.averageHeartRateBpm;
        this.maximumHeartRateBpm = obj.maximumHeartRateBpm;
        this.maximumSpeed = obj.maximumSpeed;
        this.totalTimeSeconds = obj.totalTimeSeconds;
        this.calories = obj.calories;
        this.distanceMeters = obj.distanceMeters;
        this.maxBikeCadence = obj.maxBikeCadence;
        this.steps = obj.steps;
        this.avgRunCadence = obj.avgRunCadence;
        this.maxRunCadence = obj.maxRunCadence;
        this.avgSpeed = obj.avgSpeed;
    }
}
exports.default = InfoLap;
//# sourceMappingURL=infoLap.js.map
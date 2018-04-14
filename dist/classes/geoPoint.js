"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts = require("./consts");
/**
 * Κρατά τα δεδομένα του γεωγραφικού σημείου
 * @implements iGeoPoint
 */
class GeoPoint {
    /**
     * Αν δε δωθούν τιμές, αυτόματα παίρνει την τιμή λάθους αριθμού (-1)
     * @param lat το γεγραφικό πλάτος σε ΔΕΚΑΔΙΚΕΣ ΜΟΙΡΕΣ
     * @param lon το γεγραφικό μήκος σε ΔΕΚΑΔΙΚΕΣ ΜΟΙΡΕΣ
     * @param alt το υψόμετρο σε μέτρα
     */
    constructor(lat, lon, alt) {
        lat ? (this.latitudeDegrees = lat) : (this.latitudeDegrees = consts.ERROR_NUMBER_VALUE);
        lon ? (this.longitudeDegrees = lon) : (this.longitudeDegrees = consts.ERROR_NUMBER_VALUE);
        alt ? (this.altitudeMeters = alt) : (this.altitudeMeters = consts.ERROR_NUMBER_VALUE);
    }
}
exports.default = GeoPoint;
//# sourceMappingURL=geoPoint.js.map
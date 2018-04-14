import { iGeoPoint } from "./iFaces";
import * as consts from "./consts";
/**
 * Κρατά τα δεδομένα του γεωγραφικού σημείου
 * @implements iGeoPoint
 */
export default class GeoPoint implements iGeoPoint {
    latitudeDegrees: number;
    longitudeDegrees: number;
    altitudeMeters: number;
    /**
     * Αν δε δωθούν τιμές, αυτόματα παίρνει την τιμή λάθους αριθμού (-1)
     * @param lat το γεγραφικό πλάτος σε ΔΕΚΑΔΙΚΕΣ ΜΟΙΡΕΣ
     * @param lon το γεγραφικό μήκος σε ΔΕΚΑΔΙΚΕΣ ΜΟΙΡΕΣ
     * @param alt το υψόμετρο σε μέτρα
     */
    constructor(lat?: number, lon?: number, alt?: number) {
        lat ? (this.latitudeDegrees = lat) : (this.latitudeDegrees = consts.ERROR_NUMBER_VALUE);
        lon ? (this.longitudeDegrees = lon) : (this.longitudeDegrees = consts.ERROR_NUMBER_VALUE);
        alt ? (this.altitudeMeters = alt) : (this.altitudeMeters = consts.ERROR_NUMBER_VALUE);
    }
}

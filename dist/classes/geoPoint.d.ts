import { iGeoPoint } from "./iFaces";
/**
 * Κρατά τα δεδομένα του γεωγραφικού σημείου
 * @implements iGeoPoint
 */
export declare class GeoPoint implements iGeoPoint {
    latitudeDegrees: number;
    longitudeDegrees: number;
    altitudeMeters: number;
    /**
     * Αν δε δωθούν τιμές, αυτόματα παίρνει την τιμή λάθους αριθμού (-1)
     * @param lat το γεγραφικό πλάτος σε ΔΕΚΑΔΙΚΕΣ ΜΟΙΡΕΣ
     * @param lon το γεγραφικό μήκος σε ΔΕΚΑΔΙΚΕΣ ΜΟΙΡΕΣ
     * @param alt το υψόμετρο σε μέτρα
     */
    constructor(lat?: number, lon?: number, alt?: number);
}

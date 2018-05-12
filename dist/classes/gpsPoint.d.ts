import { iXmlTrackPoint } from "./iFaces";
import GeoPoint from "./geoPoint";
/**
 * To αντικείμενο που κρατά όλα τα στοιχεία που έχει το TCX αρχείο για κάθε ένα σημείο καταγραφής
 */
export default class GpsPoint {
    /**Η μέχρι τώρα απόσταση */
    distanceMeters: number;
    /**η τρέχουσα ταχύτητα */
    speed: number;
    /**Η ταχύτητα βηματισμού */
    runCadence: number;
    /**Το cadence */
    cadence: number;
    /**O τρέχων καρδιακός παλμός */
    heartRateBpm: number;
    /**Οι συντεταγμένες του σημείου και το υψόμετρο */
    position: GeoPoint;
    /**Ο χρόνος καταγραφής */
    time: string;
    /**
     * Συμπληρώνει το αντικείμενο από τα στοιχεία του TCX
     *
     * @param obj η xml καταγραφή από το αρχείο TCX
     */
    constructor(obj: iXmlTrackPoint);
}

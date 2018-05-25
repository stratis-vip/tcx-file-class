import TcxFile from "./tcxFile";
import InfoLap from "./infoLap";
import GpsPoint from "./gpsPoint";
import { iZone, ActivitiesTypes, SavePoints } from "./iFaces";
/**
 * Αρχικό αντικείμενο που κρατά πρακτικά όλη την προπόνηση
 * Πρακτικά, το αντικείμενο αυτό θα «μοιράσει» επι μέρους
 * τα στοιχεία του ώστε να είναι πιο πρακτικό.
 */
export default class Activity {
    /**Η Ταυτότητα της δραστηριότητας */
    id: string;
    /**Αν είναι έτοιμη η δραστηριότητα. Αν το αρχείο TCX είναι εσφαλμένο, η ιδιότητα αυτή είναι false */
    isReady: boolean;
    /**Η απόσταση (σε ΜΕΤΡΑ) όπως την έχει καταγγεγραμένη στα Laps */
    distanceFromLaps: number;
    /**Η απόσταση (σε ΜΕΤΡΑ) όπως υπολογίζεται από τα σημεία που έχει καταγράψει στο TCX */
    distanceDromPoints: number;
    /**Ο χρόνος όπως έχει καταγραφεί στα Laps (σε secs) */
    timeFromLaps: number;
    /**Ο χρόνος όπως υπολογίζεται από τα σημεία που έχει καταγράψει στο ΤCX (σε secs) */
    timeFromPoints: number;
    /**Πίνακας με τους πληροφοριακούς γύρους. Laps που δεν έχουν τα Points */
    infoLaps: Array<InfoLap>;
    /**Πίνακας με τα σημεία Point όλης της δραστηριότητας */
    tPoints: Array<GpsPoint>;
    /**Πίνακας που κρατάει τα δευτερόλεπτα προπόνησης */
    zones: iZone[];
    sport: ActivitiesTypes;
    proccessElements: ResultClass;
    lapsElements: ResultClass;
    /**
     * @param {TcxFile} xmlSource το αντικείμενο που κρατά όλα τα στοιχεία από το tcx αρχείο
     */
    constructor(athleteId: number, xmlSource: TcxFile, zones?: [number, number, number, number] | null);
    getFasters(): void;
    checkDistance(position: number): void;
    /**
    * Βρίσκει την απόσταση μόνο από τις πληροφορίες των γύρων
    *
    * @param {InfoLap[]} laps τα InfoLap από την δραστηριότητα
    * @return {number} η απόσταση σε μέτρα
    */
    getDistanceFromLaps(): number;
    getMaxCadence(value1: number, value2: number): number;
    /**
 * Υπολογίζει την απόσταση από τα σημεία του TCX
 *
 * @param {Point[]} points τα  σημεία TrackPoints από την δραστηριότητα
 * @return {ResultClass} αντικείμενο ResultClassπου κρατά όλα τα στοιχεία
 */
    getDistanceFromPoints(points: Array<GpsPoint>, bpmZones?: [number, number, number, number]): ResultClass;
}
export declare class bestTimes {
    start: number;
    end: number;
    distance: number;
    time: number;
    recTime: number;
    avgHr: number;
    dAlt: number;
}
export declare class ResultClass {
    id: string;
    sport: number;
    athlete: number;
    distance: number;
    totalTime: number;
    minAlt: number;
    maxAlt: number;
    totalUp: number;
    totalDown: number;
    maxSpeed: number;
    maxCadence: number;
    maxHR: number;
    zones: {
        zone: number;
        time: number;
    }[];
    points: Array<SavePoints>;
    times: bestTimes[];
    constructor();
}
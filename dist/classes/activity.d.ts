/// <reference types="node" />
import { EventEmitter } from 'events';
import { GeoPoint } from "./geoPoint";
import { InfoLap } from "./infoLap";
import { GpsPoint } from "./gpsPoint";
import { iZone, ActivitiesTypes, ProgressMessage } from "./iFaces";
import { TcxFile } from './tcxFile';
import { ResultClass } from './resultClass';
/**
 * Αρχικό αντικείμενο που κρατά πρακτικά όλη την προπόνηση
 * Πρακτικά, το αντικείμενο αυτό θα «μοιράσει» επι μέρους
 * τα στοιχεία του ώστε να είναι πιο πρακτικό.
 */
export declare class Activity extends EventEmitter {
    /**Η Ταυτότητα της δραστηριότητας */
    id: string;
    /**Αν είναι έτοιμη η δραστηριότητα. Αν το αρχείο TCX είναι εσφαλμένο, η ιδιότητα αυτή είναι false */
    isReady: boolean;
    /**Η απόσταση (σε ΜΕΤΡΑ) όπως την έχει καταγγεγραμένη στα Laps */
    distanceFromLaps: number;
    /**Η απόσταση (σε ΜΕΤΡΑ) όπως υπολογίζεται από τα σημεία που έχει καταγράψει στο TCX */
    distanceFromPoints: number;
    /**Ο χρόνος όπως έχει καταγρ
     * αφεί στα Laps (σε secs) */
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
    constructor();
    read(athleteId: number, xmlSource: TcxFile, zones?: [number, number, number, number] | null): void;
    getFasters(obj: Activity): void;
    checkDistance(obj: Activity, position: number): void;
    /**
    * Βρίσκει την απόσταση μόνο από τις πληροφορίες των γύρων
    *
    * @param {InfoLap[]} laps τα InfoLap από την δραστηριότητα
    * @return {number} η απόσταση σε μέτρα
    */
    getDistanceFromLaps(): number;
    getMaxCadence(value1: number, value2: number): number;
    sendEmit(msg: ProgressMessage): void;
    assignGpsPoint(point: GpsPoint): GeoPoint;
    getSportMaxCadence(point: GpsPoint, obj: ResultClass): number;
    /**
 * Υπολογίζει την απόσταση από τα σημεία του TCX
 *
 * @param {Point[]} points τα  σημεία TrackPoints από την δραστηριότητα
 * @return {ResultClass} αντικείμενο ResultClassπου κρατά όλα τα στοιχεία
 */
    getDistanceFromPoints(points: Array<GpsPoint>, bpmZones?: [number, number, number, number]): ResultClass;
}

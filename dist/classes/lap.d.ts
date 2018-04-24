import GpsPoint from "./GpsPoint";
import { iXmlLap } from "./iFaces";
/** Οι πληροφορίες που έχει το κάθε Lap στο tcx αρχείο */
export default class Lap {
    /**Ο χρόνος έναρξης του Lap σε μορφή  <YYYY>-<MM>-<ΔΔ>T<ΩΩ>:<ΛΛ>:<ΔΔ>.<000>Z */
    startTime: string;
    /**Μέσοι καρδιακοί παλμοί */
    averageHeartRateBpm: number;
    /** Μέγιστος καρδιακός παλμός */
    maximumHeartRateBpm: number;
    /** Μέγιστη ταχύτητα */
    maximumSpeed: number;
    /**Συνολικός χρόνος */
    totalTimeSeconds: number;
    /**θερμίδες */
    calories: number;
    /**H απόσταση σε μέτρα */
    distanceMeters: number;
    /**Μέγιστη πεταλιά ποδηλάτου */
    maxBikeCadence: number;
    /**Βήματα (;) */
    steps: number;
    /**Μέσος αριθμός βημάτων ανά λεπτό */
    avgRunCadence: number;
    /**Μέγιστος αριθμός βημάτων ανά λεπτό */
    maxRunCadence: number;
    /**Μέση ταχύτητα */
    avgSpeed: number;
    /**intensity */
    intensity: string;
    /**Πίνακας με τα σημεία που έχει καταγράψει το TCX */
    trackPoints: Array<GpsPoint>;
    /**TriggerMethod*/
    triggerMethod: string;
    /**Δημιουργία αντικειμένου
     * @param obj το αντικείμενο με τον γύρο και τα σημεία
     */
    constructor(obj: iXmlLap);
}

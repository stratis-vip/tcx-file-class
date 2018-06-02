import { Lap } from "./lap";
/** Οι πληροφορίες που έχει συγκεντρωτικά το κάθε Lap στο tcx αρχείο */
export declare class InfoLap {
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
    /**Δημιουργία αντικειμένου
     * @param obj το αντικείμενο από όπου θα αφαιρέσει μόνο τις ιδιότητες που μας ενδιαφέρουν
     */
    constructor(obj: Lap);
}

import * as consts from "./consts";
import GpsPoint from "./gpsPoint";
import { iXmlLap, iXmlTrackPoint } from "./iFaces";
import { timingSafeEqual } from "crypto";

/** Οι πληροφορίες που έχει το κάθε Lap στο tcx αρχείο */
export default class Lap {
    /**Ο χρόνος έναρξης του Lap σε μορφή  <YYYY>-<MM>-<ΔΔ>T<ΩΩ>:<ΛΛ>:<ΔΔ>.<000>Z */
    startTime: string;
    /**Μέσοι καρδιακοί παλμοί */
    averageHeartRateBpm = consts.ERROR_NUMBER_VALUE;
    /** Μέγιστος καρδιακός παλμός */
    maximumHeartRateBpm = consts.ERROR_NUMBER_VALUE;
    /** Μέγιστη ταχύτητα */
    maximumSpeed = consts.ERROR_NUMBER_VALUE;
    /**Συνολικός χρόνος */
    totalTimeSeconds = consts.ERROR_NUMBER_VALUE;
    /**θερμίδες */
    calories = consts.ERROR_NUMBER_VALUE;
    /**H απόσταση σε μέτρα */
    distanceMeters = consts.ERROR_NUMBER_VALUE;
    /**Μέγιστη πεταλιά ποδηλάτου */
    maxBikeCadence = consts.ERROR_NUMBER_VALUE;
    /**Βήματα (;) */
    steps = consts.ERROR_NUMBER_VALUE;
    /**Μέσος αριθμός βημάτων ανά λεπτό */
    avgRunCadence = consts.ERROR_NUMBER_VALUE;
    /**Μέγιστος αριθμός βημάτων ανά λεπτό */
    maxRunCadence = consts.ERROR_NUMBER_VALUE;
    /**Μέση ταχύτητα */
    avgSpeed = consts.ERROR_NUMBER_VALUE;
    /**intensity */
    intensity = consts.ERROR_STRING_VALUE;
    /**Πίνακας με τα σημεία που έχει καταγράψει το TCX */
    trackPoints: Array<GpsPoint>;
    /**TriggerMethod*/
    triggerMethod = consts.ERROR_STRING_VALUE;
    /**Δημιουργία αντικειμένου
     * @param obj το αντικείμενο με τον γύρο και τα σημεία
     */
    constructor(obj: iXmlLap) {
        if (Object.keys(obj).length !== 0) {
            this.startTime = obj.$.StartTime;
            this.averageHeartRateBpm = consts.getExtV(obj.AverageHeartRateBpm);
            this.maximumHeartRateBpm = consts.getExtV(obj.MaximumHeartRateBpm);
            this.maximumSpeed = consts.getExt(obj.MaximumSpeed);
            this.totalTimeSeconds = consts.getExt(obj.TotalTimeSeconds);
            this.calories = consts.getExt(obj.Calories);
            this.distanceMeters = consts.getExt(obj.DistanceMeters);
            this.maxBikeCadence = consts.ERROR_NUMBER_VALUE;
            this.steps = consts.ERROR_NUMBER_VALUE;
            this.avgRunCadence = consts.ERROR_NUMBER_VALUE;
            this.maxRunCadence = consts.ERROR_NUMBER_VALUE;
            this.avgSpeed = consts.ERROR_NUMBER_VALUE;
            this.intensity = consts.ERROR_STRING_VALUE;
            if (obj.Extensions !== undefined) {
                if (obj.Extensions[0]["ns3:LX"] !== undefined) {
                    //garimn
                    this.maxBikeCadence = consts.getExt(obj.Extensions[0]["ns3:LX"][0]["ns3:MaxBikeCadence"]);
                    this.steps = consts.getExt(obj.Extensions[0]["ns3:LX"][0]["ns3:Steps"]);
                    this.avgRunCadence = consts.getExt(obj.Extensions[0]["ns3:LX"][0]["ns3:AvgRunCadence"]);
                    this.maxRunCadence = consts.getExt(obj.Extensions[0]["ns3:LX"][0]["ns3:MaxRunCadence"]);
                    this.avgSpeed = consts.getExt(obj.Extensions[0]["ns3:LX"][0]["ns3:AvgSpeed"]);
                } else {
                    if (obj.Extensions[0].LX !== undefined) {
                        this.avgSpeed = consts.getExt(obj.Extensions[0].LX[0].AvgSpeed);
                        this.avgRunCadence = consts.getExt(obj.Cadence);
                    }
                }
            }
        }
        if (obj.Intensity !== undefined) {
            this.intensity = obj.Intensity[0];
        }
        // let po = obj.Track[0].TrackPoint;
        this.trackPoints = getPoints(obj);
        this.triggerMethod = obj.TriggerMethod[0];
    }
}

/**
 * Δημιουργεί ένα πίνακα με τα gps σημεία του αρχείου
 * 
 * @param {iXmlLap} obj το αντικείμενο με τον xml Lap
 */
function getPoints(obj: iXmlLap) {
    let points = new Array<GpsPoint>();
    if (obj !== undefined) {
        let pointCount = obj.Track[0].Trackpoint.length;
        for (let i = 0; i != pointCount; ++i) {
            points.push(new GpsPoint(obj.Track[0].Trackpoint[i]));
        }
    }
    return points;
}
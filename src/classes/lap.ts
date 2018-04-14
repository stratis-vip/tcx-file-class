import * as consts from "./consts";
import GpsPoint from "./GpsPoint";
import { iXmlLap, iXmlTrackPoint } from "./iFaces";

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
            this.averageHeartRateBpm = Number(obj.AverageHeartRateBpm[0].Value[0]);
            this.maximumHeartRateBpm = Number(obj.MaximumHeartRateBpm[0].Value[0]);
            this.maximumSpeed = Number(obj.MaximumSpeed[0]);
            this.totalTimeSeconds = Number(obj.TotalTimeSeconds[0]);
            this.calories = Number(obj.Calories[0]);
            this.distanceMeters = Number(obj.DistanceMeters[0]);
            this.maxBikeCadence = consts.ERROR_NUMBER_VALUE;
            this.steps = consts.ERROR_NUMBER_VALUE;
            this.avgRunCadence = consts.ERROR_NUMBER_VALUE;
            this.maxRunCadence = consts.ERROR_NUMBER_VALUE;
            this.avgSpeed = consts.ERROR_NUMBER_VALUE;
            this.intensity = consts.ERROR_STRING_VALUE;
            if (obj.Extensions !== undefined) {
                if (obj.Extensions[0]["ns3:LX"] !== undefined) {
                    //garimn
                    if (obj.Extensions[0]["ns3:LX"][0]["ns3:MaxBikeCadence"] !== undefined) {
                        this.maxBikeCadence = Number(obj.Extensions[0]["ns3:LX"][0]["ns3:MaxBikeCadence"][0]);
                    }

                    if (obj.Extensions[0]["ns3:LX"][0]["ns3:Steps"] !== undefined) {
                        this.steps = Number(obj.Extensions[0]["ns3:LX"][0]["ns3:Steps"][0]);
                    }

                    if (obj.Extensions[0]["ns3:LX"][0]["ns3:AvgRunCadence"] !== undefined) {
                        this.avgRunCadence = Number(obj.Extensions[0]["ns3:LX"][0]["ns3:AvgRunCadence"][0]);
                    }

                    if (obj.Extensions[0]["ns3:LX"][0]["ns3:MaxRunCadence"] !== undefined) {
                        this.maxRunCadence = Number(obj.Extensions[0]["ns3:LX"][0]["ns3:MaxRunCadence"][0]);
                    }

                    if (obj.Extensions[0]["ns3:LX"][0]["ns3:AvgSpeed"] !== undefined) {
                        this.avgSpeed = Number(obj.Extensions[0]["ns3:LX"][0]["ns3:AvgSpeed"][0]);
                    }
                } else {
                    if (obj.Extensions[0].LX !== undefined) {
                        this.avgSpeed = Number(obj.Extensions[0].LX[0].AvgSpeed[0]);
                        //TODO να δω τι γίνεται με ποδηλατικό πόλαρ αρχείο
                        if (obj.Cadence !== undefined) {
                            this.avgRunCadence = Number(obj.Cadence[0]);
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
}

/**
 * Δημιουργεί ένα πίνακα με τα gps σημεία του αρχείου
 * 
 * @param {iXmlLap} obj το αντικείμενο με τον xml Lap
 */
function getPoints(obj: iXmlLap) {
    let points =new Array<GpsPoint>();
    if (obj !== undefined) {
        let pointCount = obj.Track[0].Trackpoint.length;
        for (let i = 0; i != pointCount; ++i) {
            points.push(new GpsPoint(obj.Track[0].Trackpoint[i]));
        }
    }
    return points;
}
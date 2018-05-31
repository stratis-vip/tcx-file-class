import {EventEmitter} from 'events';
import  TcxFile  from "./tcxFile";
import * as consts from "./consts";

import GeoPoint from "./geoPoint";
import { apostasi, secsToTime, TimePaceFromSpeedMpS } from "../utils/functions";
import InfoLap from "./infoLap";
import  Lap  from "./lap"
import  GpsPoint  from "./gpsPoint"
import { iZone, ActivitiesTypes, SavePoints, ProgressMessage } from "./iFaces";

/**
 * Αρχικό αντικείμενο που κρατά πρακτικά όλη την προπόνηση 
 * Πρακτικά, το αντικείμενο αυτό θα «μοιράσει» επι μέρους 
 * τα στοιχεία του ώστε να είναι πιο πρακτικό.
 */
export default class Activity extends EventEmitter {
    /**Η Ταυτότητα της δραστηριότητας */
    id: string = consts.ERROR_STRING_VALUE;
    /**Αν είναι έτοιμη η δραστηριότητα. Αν το αρχείο TCX είναι εσφαλμένο, η ιδιότητα αυτή είναι false */
    isReady = false;
    /**Η απόσταση (σε ΜΕΤΡΑ) όπως την έχει καταγγεγραμένη στα Laps */
    distanceFromLaps = consts.ERROR_NUMBER_VALUE;
    /**Η απόσταση (σε ΜΕΤΡΑ) όπως υπολογίζεται από τα σημεία που έχει καταγράψει στο TCX */
    distanceDromPoints = consts.ERROR_NUMBER_VALUE;
    /**Ο χρόνος όπως έχει καταγραφεί στα Laps (σε secs) */
    timeFromLaps = consts.ERROR_NUMBER_VALUE;
    /**Ο χρόνος όπως υπολογίζεται από τα σημεία που έχει καταγράψει στο ΤCX (σε secs) */
    timeFromPoints = consts.ERROR_NUMBER_VALUE;
    /**Πίνακας με τους πληροφοριακούς γύρους. Laps που δεν έχουν τα Points */
    infoLaps: Array<InfoLap> = new Array<InfoLap>();
    /**Πίνακας με τα σημεία Point όλης της δραστηριότητας */
    tPoints: Array<GpsPoint> = new Array<GpsPoint>();
    /**Πίνακας που κρατάει τα δευτερόλεπτα προπόνησης */

    zones = new Array<iZone>();
    sport = ActivitiesTypes.Invalid;
    proccessElements = new ResultClass();
    lapsElements = new ResultClass();

    /** 
     * @param {TcxFile} xmlSource το αντικείμενο που κρατά όλα τα στοιχεία από το tcx αρχείο
     */
    constructor() {
        super();
        this.isReady = false;
    }

    read(athleteId:number,xmlSource: TcxFile, zones?: [number, number, number, number]|null){
        let self = this;
        if (xmlSource.isReady) {
            self.id = xmlSource.getId();
            let laps: Array<Lap> = new Array<Lap>();
            laps = xmlSource.getLaps();
            laps.forEach((lap: Lap) => {
                self.infoLaps.push(new InfoLap(lap));
                (lap as Lap).trackPoints.forEach((point: GpsPoint) => {
                    if (point.position.latitudeDegrees !== consts.ERROR_NUMBER_VALUE) {
                        self.tPoints.push(point);
                    }
                });
            });
            self.sport = getSportFromString(xmlSource.getSport());
            self.proccessElements = self.getDistanceFromPoints(self, self.tPoints, zones);

            self.distanceFromLaps = self.getDistanceFromLaps();
            self.distanceDromPoints = self.proccessElements.distance;
            self.timeFromLaps = getTimeFromLaps(self.infoLaps);
            self.timeFromPoints = self.proccessElements.totalTime;
            self.isReady = true;
            self.proccessElements.id = self.id;
            self.proccessElements.sport = self.sport;
            self.proccessElements.athlete = athleteId;
            if (self.proccessElements.points.length > 1) {
                self.getFasters(self);
            }
        }
    }
    
    getFasters(obj:Activity) {
        let self =obj;
        let len = this.proccessElements.points.length;

        for (let i = 0; i != len; ++i) {
            self.emit('Process',{event:'getFasters',value:i/len});
            this.checkDistance(self, i);
        }
    }

    checkDistance(obj:Activity, position: number) {
        let self =obj;
        let limits = [100, 200, 400, 1000, 2000, 5000, 10000, 21100, 42195, 50000, 100000, 200000];
        let curLimit = 0;
        let startingDistance = this.proccessElements.points[position].distance;
        let startTime = this.proccessElements.points[position].time;
        let nextPoint: SavePoints;
        let nextIndex: number;
        do {
            nextPoint = this.proccessElements.points.find((value, index) => {
                nextIndex = index;
                return value.distance - startingDistance > limits[curLimit];
            });
            if (nextPoint) {
                let time = nextPoint.time - startTime;
                let distance = nextPoint.distance - startingDistance;
                let limitTime = time * limits[curLimit] / distance;
                if (this.proccessElements.times[curLimit] === undefined) {
                    this.proccessElements.times[curLimit] = new bestTimes();
                    this.proccessElements.times[curLimit] =
                        {
                            start: position,
                            end: nextIndex,
                            distance: distance,
                            time: time,
                            recTime: limitTime,
                            avgHr: consts.ERROR_NUMBER_VALUE,
                            dAlt: consts.ERROR_NUMBER_VALUE
                        };
                }
                //αν ο χρόνος είναι καλύτερος πρόσθεσε το σημείο
                if (this.proccessElements.times[curLimit].recTime > limitTime) {
                    this.proccessElements.times[curLimit] =
                        {
                            start: position,
                            end: nextIndex,
                            distance: distance,
                            time: time,
                            recTime: limitTime,
                            avgHr: consts.ERROR_NUMBER_VALUE,
                            dAlt: consts.ERROR_NUMBER_VALUE
                        };
                }



                let startPoint = 0;
                if (this.proccessElements.times[curLimit] === undefined) {
                    startPoint = -1;
                } else {
                    startPoint = this.proccessElements.times[curLimit].start;
                }
                let endPoint = this.proccessElements.times[curLimit].end + 1;

                let avgHr = this.proccessElements.points.slice(startPoint, endPoint).map(value => value.hr).reduce((a, b) => a + b) / (endPoint - startPoint);
                let Altιtudes = this.proccessElements.points.slice(startPoint, endPoint).map(value => value.position.altitudeMeters);
                let avgAlt = Altιtudes.reduce((a, b) => a + b) / (endPoint - startPoint);

                let startAlt = Altιtudes[0];
                let up = 0;
                let down = 0;
                for (let i = 1; i != Altιtudes.length; i++) {
                    if (Altιtudes[i] > startAlt) {
                        up += Altιtudes[i] - startAlt;
                    }
                    else {
                        down += startAlt - Altιtudes[i];
                    }
                    startAlt = Altιtudes[i];
                }
                let dt = Math.round(up - down);
                this.proccessElements.times[curLimit].avgHr = Math.round(avgHr);
                this.proccessElements.times[curLimit].dAlt = Math.round(dt);
                ++curLimit;
            }
        } while (nextPoint !== undefined);
    }

    /**
    * Βρίσκει την απόσταση μόνο από τις πληροφορίες των γύρων
    * 
    * @param {InfoLap[]} laps τα InfoLap από την δραστηριότητα
    * @return {number} η απόσταση σε μέτρα
    */
    getDistanceFromLaps(): number {
        let laps = this.infoLaps;
        let temp = new ResultClass();
        let distance = 0;
        let lapCount = laps.length;
        for (let i = 0; i != lapCount; ++i) {
            temp.distance += laps[i].distanceMeters;

            temp.maxSpeed = getBiggerValue(laps[i].maximumSpeed, temp.maxSpeed);
            temp.maxHR = getBiggerValue(laps[i].maximumHeartRateBpm, temp.maxHR);
            temp.maxCadence = this.getMaxCadence(laps[i].maxBikeCadence, temp.maxCadence);
        }
        return temp.distance;
    }

    getMaxCadence(value1: number, value2: number): number {
        switch (this.sport) {
            case ActivitiesTypes.Running:
                return getBiggerValue(value1, value2);
            case ActivitiesTypes.Biking:
                return getBiggerValue(value1, value2);
            default:
                return consts.ERROR_NUMBER_VALUE;
        }
    }


    sendEmit(msg:ProgressMessage){
        this.emit('progress',msg);
    }
    /**
 * Υπολογίζει την απόσταση από τα σημεία του TCX
 * 
 * @param {Point[]} points τα  σημεία TrackPoints από την δραστηριότητα
 * @return {ResultClass} αντικείμενο ResultClassπου κρατά όλα τα στοιχεία
 */
    getDistanceFromPoints(obj:Activity,points: Array<GpsPoint>, bpmZones?: [number, number, number, number]): ResultClass {
       
       let self= obj;
        let pointsCount = points.length;
        let from: GeoPoint = new GeoPoint();
        let to: GeoPoint = new GeoPoint();
        let previous = 0;
        let fromTime: Date;
        let toTime: Date;

        let oldDistance = 0;
        let temp = new ResultClass();

        let counter = 0;
        for (let i = 0; i != pointsCount; ++i) {
            
            if (points[i].position.longitudeDegrees !== consts.ERROR_NUMBER_VALUE &&
                points[i].position.latitudeDegrees !== consts.ERROR_NUMBER_VALUE) {
                if (from.latitudeDegrees === consts.ERROR_NUMBER_VALUE &&
                    from.longitudeDegrees === consts.ERROR_NUMBER_VALUE) {
                    from.longitudeDegrees = points[i].position.longitudeDegrees;
                    from.latitudeDegrees = points[i].position.latitudeDegrees;
                    from.altitudeMeters = points[i].position.altitudeMeters;
                    fromTime = new Date(points[i].time);
                    oldDistance = points[i].distanceMeters;
                }


                to.longitudeDegrees = points[i].position.longitudeDegrees;
                to.latitudeDegrees = points[i].position.latitudeDegrees;
                to.altitudeMeters = points[i].position.altitudeMeters;
                toTime = new Date(points[i].time);
                if ((points[i].speed === 0) || (points[i].distanceMeters - oldDistance < 0.2 && oldDistance !== 0)) {
                    // console.log('DEBUG '+oldDistance + '  ' + points[i].distanceMeters+ ' '+points[i].time);
                } else {
                    let diff: number;
                    diff = (Number(toTime) - Number(fromTime)) / 1000;
                    if (diff > 5 && points[i - 1].speed === 0) {

                    } else {
                        //Υπολογισμός αρχικού υψομέτρου
                        if (temp.minAlt === consts.ERROR_NUMBER_VALUE) {
                            temp.minAlt = from.altitudeMeters;
                            temp.maxAlt = from.altitudeMeters
                        }

                        if (to.altitudeMeters < temp.minAlt) {
                            temp.minAlt = to.altitudeMeters;
                        }
                        if (to.altitudeMeters > temp.maxAlt) {
                            temp.maxAlt = to.altitudeMeters;
                        }
                        if (to.altitudeMeters >= from.altitudeMeters) {

                            ++previous;
                            if (previous >= 1) {
                                temp.totalUp += (to.altitudeMeters - from.altitudeMeters);
                                previous = 0;
                            }
                        } else {
                            --previous;
                            if (previous <= -1) {
                                temp.totalDown += (from.altitudeMeters - to.altitudeMeters);
                                previous = 0;
                            }
                        }
                        let meters = apostasi(from, to);

                        temp.distance += meters;
                        switch (this.sport) {
                            case ActivitiesTypes.Biking:
                                temp.maxCadence = this.getMaxCadence(points[i].cadence, temp.maxCadence);
                                break;
                            case ActivitiesTypes.Running:
                                temp.maxCadence = this.getMaxCadence(points[i].runCadence, temp.maxCadence);
                                break;
                            default:
                                temp.maxCadence = consts.ERROR_NUMBER_VALUE;

                        }

                        let tempSpeed = temp.maxSpeed;
                        if (diff > 0) {
                            tempSpeed = meters / diff;
                            if (tempSpeed > temp.maxSpeed) {
                                temp.maxSpeed = tempSpeed;
                            }
                        }
                        let hr = points[i].heartRateBpm;
                        if (hr > temp.maxHR) {
                            temp.maxHR = hr;
                        }
                        if (hr !== consts.ERROR_NUMBER_VALUE && bpmZones !== null && bpmZones !== undefined) {
                            if (hr < bpmZones[0]) {
                                temp.zones[0].time += diff;
                            } else {
                                if (hr < bpmZones[1]) {
                                    temp.zones[1].time += diff;
                                } else {
                                    if (hr < bpmZones[2]) {
                                        temp.zones[2].time += diff;
                                    } else {
                                        if (hr < bpmZones[3]) {
                                            temp.zones[3].time += diff;
                                        } else {
                                            temp.zones[4].time += diff;
                                        }
                                    }
                                }
                            }
                        }
                        temp.totalTime += (toTime.valueOf() - fromTime.valueOf()) / 1000;
                    }
                }
                fromTime = toTime;
                from.longitudeDegrees = to.longitudeDegrees;
                from.latitudeDegrees = to.latitudeDegrees;
                from.altitudeMeters = to.altitudeMeters;
                oldDistance = points[i].distanceMeters;
                let sPoint = new SavePoints();
                sPoint.assignPoint(points[i], oldDistance, temp.totalTime, this);
                temp.points.push(sPoint);
                let cur= 100*i/pointsCount;
                if ((cur)>counter){
                    counter++;
                    self.sendEmit({type:'Υπολογισμός σημείων',value:cur});
                }
            }
        }

        this.zones = temp.zones;
        this.distanceDromPoints = temp.distance;
        return temp;
    }
}

export class bestTimes {
    start = consts.ERROR_NUMBER_VALUE;
    end = consts.ERROR_NUMBER_VALUE;
    distance: number;
    time = consts.ERROR_NUMBER_VALUE;
    recTime = consts.ERROR_NUMBER_VALUE;
    avgHr = consts.ERROR_NUMBER_VALUE;
    dAlt = consts.ERROR_NUMBER_VALUE;
}
/**
 * 
 * @param sp Το κείμενο στο Xml Αρχείο
 */
function getSportFromString(sp: string): ActivitiesTypes {
    //για σιγουριά κάνω το κείμενο Κεφαλαίο
    let sport = sp.toUpperCase();
    let actType: ActivitiesTypes;
    switch (sport) {
        case "RUNNING": actType = ActivitiesTypes.Running;
            break;
        case "GENERIC": actType = ActivitiesTypes.Generic;
            break
        case "BIKING": actType = ActivitiesTypes.Biking;
            break;
        case "TRANSITION": actType = ActivitiesTypes.Transition;
            break;
        case "FITNESSEQUIPMENT": actType = ActivitiesTypes.FitnessEquipment;
            break;
        case "SWIMMING": actType = ActivitiesTypes.Swimming;
            break;
        case "WALKING": actType = ActivitiesTypes.Walking;
            break;
        case "SEDENTARY": actType = ActivitiesTypes.Sedentary;
            break;
        case "ALL": actType = ActivitiesTypes.All;
            break;
        case "INVALID": actType = ActivitiesTypes.Invalid;
            break;
    }
    return actType;
}

/**
 * Βρίσκει τον μεγαλύτερο από τους δυο αριθμούς
 * 
 * @param value1 ο πρώτος αριθμός
 * @param newValue ο δεύτερος αριθμός
 */
function getBiggerValue(value1: number, value2: number): number {
    if (value1 > value2) {
        value2 = value1
    }
    return value2;
}



export class ResultClass {
    id = "";
    sport = 255;
    athlete =consts.ERROR_NUMBER_VALUE;
    distance = 0;
    totalTime = 0;
    minAlt = consts.ERROR_NUMBER_VALUE;
    maxAlt = consts.ERROR_NUMBER_VALUE;
    totalUp = 0;
    totalDown = 0;
    maxSpeed = consts.ERROR_NUMBER_VALUE;
    maxCadence = consts.ERROR_NUMBER_VALUE;
    maxHR = consts.ERROR_NUMBER_VALUE;
    zones = [{ zone: 1, time: 0 },
    { zone: 2, time: 0 },
    { zone: 3, time: 0 },
    { zone: 4, time: 0 },
    { zone: 5, time: 0 }]
    points: Array<SavePoints>;
    times = Array<bestTimes>();
    constructor() {
        this.points = new Array<SavePoints>();
    }
}

/**
 * Υπολογίζει τον χρόνο από τις πληροφορίες των γύρων
 * 
 * @param {InfoLap[]} laps τα InfoLap από την δραστηριότητα
 * @return o χρόνος σε δευτερόλεπτα
 */
function getTimeFromLaps(laps: InfoLap[]): number {
    let lapCount = laps.length;
    let time = consts.ERROR_NUMBER_VALUE;
    for (let i = 0; i != lapCount; ++i) {
        time += laps[i].totalTimeSeconds;
    }
    return time;
}

/**
 * Υπολογίζει τον χρόνο από τα σημεία του TCX
 * 
 * @param {Point[]} points τα σημεία Point από την δραστηριότητα
 * @return o χρόνος σε δευτερόλεπτα
 */
function getTimeFromPoints(points: Array<GpsPoint>): number {
    let time = 0.0;
    let pointsCount = points.length;
    let from: Date = null;
    let to: Date = null;
    for (let i = 0; i != pointsCount; ++i) {
        if (from === null) {
            from = new Date(points[i].time);
        }
        to = new Date(points[i].time);
        time += to.valueOf() - from.valueOf();
        from = to;
    }
    return time / 1000.0;
}
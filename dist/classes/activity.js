"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const consts = require("./consts");
const geoPoint_1 = require("./geoPoint");
const functions_1 = require("../utils/functions");
const infoLap_1 = require("./infoLap");
const iFaces_1 = require("./iFaces");
const resultClass_1 = require("./resultClass");
const bestTimes_1 = require("./bestTimes");
//class MyEmitter extends EventEmitter {}
/**
 * Αρχικό αντικείμενο που κρατά πρακτικά όλη την προπόνηση
 * Πρακτικά, το αντικείμενο αυτό θα «μοιράσει» επι μέρους
 * τα στοιχεία του ώστε να είναι πιο πρακτικό.
 */
class Activity extends events_1.EventEmitter {
    /**
     * @param {TcxFile} xmlSource το αντικείμενο που κρατά όλα τα στοιχεία από το tcx αρχείο
     */
    constructor() {
        super();
        /**Η Ταυτότητα της δραστηριότητας */
        this.id = consts.ERROR_STRING_VALUE;
        /**Αν είναι έτοιμη η δραστηριότητα. Αν το αρχείο TCX είναι εσφαλμένο, η ιδιότητα αυτή είναι false */
        this.isReady = false;
        /**Η απόσταση (σε ΜΕΤΡΑ) όπως την έχει καταγγεγραμένη στα Laps */
        this.distanceFromLaps = consts.ERROR_NUMBER_VALUE;
        /**Η απόσταση (σε ΜΕΤΡΑ) όπως υπολογίζεται από τα σημεία που έχει καταγράψει στο TCX */
        this.distanceDromPoints = consts.ERROR_NUMBER_VALUE;
        /**Ο χρόνος όπως έχει καταγρ
         * αφεί στα Laps (σε secs) */
        this.timeFromLaps = consts.ERROR_NUMBER_VALUE;
        /**Ο χρόνος όπως υπολογίζεται από τα σημεία που έχει καταγράψει στο ΤCX (σε secs) */
        this.timeFromPoints = consts.ERROR_NUMBER_VALUE;
        /**Πίνακας με τους πληροφοριακούς γύρους. Laps που δεν έχουν τα Points */
        this.infoLaps = new Array();
        /**Πίνακας με τα σημεία Point όλης της δραστηριότητας */
        this.tPoints = new Array();
        /**Πίνακας που κρατάει τα δευτερόλεπτα προπόνησης */
        this.zones = new Array();
        this.sport = 255 /* Invalid */;
        this.proccessElements = new resultClass_1.ResultClass();
        this.lapsElements = new resultClass_1.ResultClass();
        this.isReady = false;
    }
    read(athleteId, xmlSource, zones) {
        let self = this;
        if (xmlSource.isReady) {
            self.id = xmlSource.getId();
            let laps = new Array();
            laps = xmlSource.getLaps();
            laps.forEach((lap) => {
                self.infoLaps.push(new infoLap_1.default(lap));
                lap.trackPoints.forEach((point) => {
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
    getFasters(obj) {
        let self = obj;
        let len = this.proccessElements.points.length;
        for (let i = 0; i != len; ++i) {
            self.emit('Process', { event: 'getFasters', value: i / len });
            this.checkDistance(self, i);
        }
    }
    checkDistance(obj, position) {
        let self = obj;
        let limits = [100, 200, 400, 1000, 2000, 5000, 10000, 21100, 42195, 50000, 100000, 200000];
        let curLimit = 0;
        let startingDistance = this.proccessElements.points[position].distance;
        let startTime = this.proccessElements.points[position].time;
        let nextPoint;
        let nextIndex;
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
                    this.proccessElements.times[curLimit] = new bestTimes_1.default();
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
                }
                else {
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
    getDistanceFromLaps() {
        let laps = this.infoLaps;
        let temp = new resultClass_1.ResultClass();
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
    getMaxCadence(value1, value2) {
        switch (this.sport) {
            case 1 /* Running */:
                return getBiggerValue(value1, value2);
            case 2 /* Biking */:
                return getBiggerValue(value1, value2);
            default:
                return consts.ERROR_NUMBER_VALUE;
        }
    }
    sendEmit(msg) {
        this.emit('progress', msg);
    }
    /**
 * Υπολογίζει την απόσταση από τα σημεία του TCX
 *
 * @param {Point[]} points τα  σημεία TrackPoints από την δραστηριότητα
 * @return {ResultClass} αντικείμενο ResultClassπου κρατά όλα τα στοιχεία
 */
    getDistanceFromPoints(obj, points, bpmZones) {
        let self = obj;
        let pointsCount = points.length;
        let from = new geoPoint_1.default();
        let to = new geoPoint_1.default();
        let previous = 0;
        let fromTime;
        let toTime;
        let oldDistance = 0;
        let temp = new resultClass_1.ResultClass();
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
                }
                else {
                    let diff;
                    diff = (Number(toTime) - Number(fromTime)) / 1000;
                    if (diff > 5 && points[i - 1].speed === 0) {
                    }
                    else {
                        //Υπολογισμός αρχικού υψομέτρου
                        if (temp.minAlt === consts.ERROR_NUMBER_VALUE) {
                            temp.minAlt = from.altitudeMeters;
                            temp.maxAlt = from.altitudeMeters;
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
                        }
                        else {
                            --previous;
                            if (previous <= -1) {
                                temp.totalDown += (from.altitudeMeters - to.altitudeMeters);
                                previous = 0;
                            }
                        }
                        let meters = functions_1.apostasi(from, to);
                        temp.distance += meters;
                        switch (this.sport) {
                            case 2 /* Biking */:
                                temp.maxCadence = this.getMaxCadence(points[i].cadence, temp.maxCadence);
                                break;
                            case 1 /* Running */:
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
                            }
                            else {
                                if (hr < bpmZones[1]) {
                                    temp.zones[1].time += diff;
                                }
                                else {
                                    if (hr < bpmZones[2]) {
                                        temp.zones[2].time += diff;
                                    }
                                    else {
                                        if (hr < bpmZones[3]) {
                                            temp.zones[3].time += diff;
                                        }
                                        else {
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
                let sPoint = new iFaces_1.SavePoints();
                sPoint.assignPoint(points[i], oldDistance, temp.totalTime, this);
                temp.points.push(sPoint);
                let cur = 100 * i / pointsCount;
                if ((cur) > counter) {
                    counter++;
                    self.sendEmit({ type: 'Υπολογισμός σημείων', value: cur });
                }
            }
        }
        this.zones = temp.zones;
        this.distanceDromPoints = temp.distance;
        return temp;
    }
}
exports.default = Activity;
/**
 * Υπολογίζει τον χρόνο από τις πληροφορίες των γύρων
 *
 * @param {InfoLap[]} laps τα InfoLap από την δραστηριότητα
 * @return o χρόνος σε δευτερόλεπτα
 */
function getTimeFromLaps(laps) {
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
function getTimeFromPoints(points) {
    let time = 0.0;
    let pointsCount = points.length;
    let from = null;
    let to = null;
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
/**
 *
 * @param sp Το κείμενο στο Xml Αρχείο
 */
function getSportFromString(sp) {
    //για σιγουριά κάνω το κείμενο Κεφαλαίο
    let sport = sp.toUpperCase();
    let actType;
    switch (sport) {
        case "RUNNING":
            actType = 1 /* Running */;
            break;
        case "GENERIC":
            actType = 0 /* Generic */;
            break;
        case "BIKING":
            actType = 2 /* Biking */;
            break;
        case "TRANSITION":
            actType = 3 /* Transition */;
            break;
        case "FITNESSEQUIPMENT":
            actType = 4 /* FitnessEquipment */;
            break;
        case "SWIMMING":
            actType = 5 /* Swimming */;
            break;
        case "WALKING":
            actType = 6 /* Walking */;
            break;
        case "SEDENTARY":
            actType = 8 /* Sedentary */;
            break;
        case "ALL":
            actType = 254 /* All */;
            break;
        case "INVALID":
            actType = 255 /* Invalid */;
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
function getBiggerValue(value1, value2) {
    if (value1 > value2) {
        value2 = value1;
    }
    return value2;
}
//# sourceMappingURL=activity.js.map
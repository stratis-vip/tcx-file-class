import geoPoint from "../classes/geoPoint";
import * as consts from '../classes/consts';


/** 
 * Υπολογίζει την απόσταση σε ΜΕΤΡΑ από το σημείο FromPoint στο σημείο ToPoint
 * 
 * @param {geoPoint} FromPoint οι συντεταγμένες του αρχικού σημείου σε ΜΟΙΡΕΣ
 * @param {geoPoint} ToPoint οι συντεταγμένες του τελικού σημείου σε ΜΟΙΡΕΣ
 * @returns {number} η απόσταση ανάμεσα στα σημεία σε ΜΕΤΡΑ
*/
//test οκ
const apostasi = (FromPoint: geoPoint, ToPoint: geoPoint): number => {
  let lat2 = ToPoint.latitudeDegrees;
  let lon2 = ToPoint.longitudeDegrees;
  let lat1 = FromPoint.latitudeDegrees;
  let lon1 = FromPoint.longitudeDegrees;
  //console.log(`${lat2}\n${lon2}\n${lat1}\n${lon1}\n `)
  let φ1 = degToRads(lat1);
  let φ2 = degToRads(lat2);
  let λ1 = degToRads(lon1);
  let λ2 = degToRads(lon2);
  let Δλ = degToRads(lon2 - lon1);
  let Δφ = degToRads(lat2 - lat1);
  let R = 6371e3;
  let a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};


/** 
* Μετατρέπει τις Μοίρες σε Ακτίνια
* 
* @param {number} Degrees οι μοίρες
* @returns {number} τις degrees μοίρες σε ακτίνια
*/
//test ok
const degToRads = (Degrees: number): number => {
  return Degrees * (Math.PI / 180);
};


/** 
* Μετατρέπει τα ακτίνια σε μοίρες
* 
* @param {number} η γωνία angle σε ακτίνια
* @returns {number} τα ακτίνια angle σε μοίρες
*/
//test ok
const radToDegrees = (angle: number): number => {
  return angle * (180 / Math.PI);
};

/**
 * H secsToTime μετατρέπει τα δευτερόλεπτα value σε χρόνο της μορφής
 * [ΩΩ:]ΛΛ:ΔΔ.ΕΕ.
 * 
 * <p>Οι ώρες δεν εμφανίζονται αν τεθεί η τιμή showHours σε false (εξ ορισμού
 * εμφανίζονται οι ώρες)</p>
 * @param {number} value ο χρόνος σε secs
 * @param {boolean} showHours αν θα εμφανίζεται το πεδίο ΩΩ:
 * @returns {string} o χρόνος σε μορφή ΩΩ:ΛΛ:ΔΔ.ΕΕ
 * 
 */
//τεστ οκ
const secsToTime = (value: number, showHours?: boolean) => {
  showHours === undefined ? (showHours = true) : (showHours = showHours);
  let result: string;
  showHours && value < consts.SECONDS_IN_DAY && value < consts.SECONDS_IN_HOUR ? (result = `00:`) : (result = "");
  if (value <= 0) {
    return result + "00:00.00";
  }
  else {
    //βρίσκω τις ημέρες
    if (value > consts.SECONDS_IN_DAY) {
      let days = Math.trunc(value / consts.SECONDS_IN_DAY);
      value -= days * consts.SECONDS_IN_DAY;
      result = `${days}d `;
      value < 3600 ? result += "00:" : result = result;
    }

    //βρίσκω τις ώρες
    let hrs = Math.floor(value / consts.SECONDS_IN_HOUR);

    if (hrs > 0) {
      value -= hrs * consts.SECONDS_IN_HOUR;
      hrs > 9
        ? (result += hrs.toString() + ":")
        : (result = `0${hrs.toString()}:`);
    }

    //μιν -> λεπτά
    let min = Math.floor(value / 60);
    value -= min * 60;
    min > 9
      ? (result += min.toString() + ":")
      : (result += `0${min.toString()}:`);

    //sec -> δευτερόλεπτα
    let secs = Math.floor(value);
    secs > 9 ? (result += secs.toString()) : (result += `0${secs.toString()}`);

    value -= secs;
    if (value === 0) {
      return `${result}.00`;
    }

    //mil -> εκατοστά
    let mil = Math.round(value * 100);
    mil > 9
      ? (result += `.${mil.toString()}`)
      : (result += `.0${mil.toString()}`);

    return result;
  }
};

/** 
 * Υπολογίζει τις συντεταγμένες του σημείου που βρίσκεται σε δεδομένα απόσταση και αζιμούθιο από το σημείο που στεκόμαστε
 * 
 * @param {geoPoint} FromPoint το αρχικό σημείο
 * @param {number} distance η απόσταση σε μέτρα προς το επόμενο σημείο
 * @param {number} Bearing το αζιμούθιο προς το τελικό σημείο σε ΜΟΙΡΕΣ 
 * @returns {GeoPoint} αντικείμενο Cordinates
 */
//test ok
const getNextPointCordinatesFromDistanceBearing = (
  FromPoint: geoPoint,
  distance: number,
  Bearing: number
): geoPoint => {
  let brng = degToRads(Bearing);
  let lat1 = FromPoint.latitudeDegrees;
  let lon1 = FromPoint.longitudeDegrees;
  let d = distance;
  let R = 6371e3;
  let φ1 = degToRads(lat1);

  let λ1 = degToRads(lon1);

  let temp = new geoPoint();
  temp.latitudeDegrees = Math.asin(
    Math.sin(φ1) * Math.cos(d / R) +
    Math.cos(φ1) * Math.sin(d / R) * Math.cos(brng)
  );
  let φ2 = temp.latitudeDegrees;
  temp.longitudeDegrees =
    λ1 +
    Math.atan2(
      Math.sin(brng) * Math.sin(d / R) * Math.cos(φ1),
      Math.cos(d / R) - Math.sin(φ1) * Math.sin(φ2)
    );

  temp.latitudeDegrees = radToDegrees(temp.latitudeDegrees);
  temp.longitudeDegrees = radToDegrees(temp.longitudeDegrees);
  temp.altitudeMeters = FromPoint.altitudeMeters;
  return temp;
};

/**
 * Mετατρέπει την ταχύτητα από m/s σε δεκαδικό ρυθμό min/km
 * @param {number} value η ταχύτητα σε m/s
 * @returns string το ρυθμό σε λεπτά το χιλιόμετρο με τη μορφή Λ,Δ 
 * @example decimalPaceFromSpeedMpS(2.77) = 6 (06:00.00)
 */
const decimalPaceFromSpeedMpS = (value: number) => {
  //test ok
  return 50 / (value * 3);
};

/**
 * Mετατρέπει την ταχύτητα από m/s σε ρυθμό της μορφής ΛΛ:ΔΔ.ΕΕ
 * @param  {number} value η ταχύτητα σε m/s
 * @returns string ο ρυθμός σε μορφή ΛΛ:ΔΔ.ΕΕ
 */
const TimePaceFromSpeedMpS = (value: number): string => {
  //test ok
  return decimalPaceToTimePace(decimalPaceFromSpeedMpS(value));
};

/**
 * Mετατρέπει τον ρυθμο από την δεκαδική του μορφή στη μορφή ΛΛ:ΔΔ.ΕΕ
 * @param  {number} value
 * @returns string: ο ρυθμός σε μορφή ΛΛ:ΔΔ.ΕΕ
 */
const decimalPaceToTimePace = (value: number) => {
  return secsToTime(value * 60, false);
};

function addTuples<T extends Array<any>>(arg: T, arg1: T): T {
  let res = arg;

  for (let i = 0; i !== arg.length; ++i) {
    //console.log(typeof arg[i]);
    if (arg[i] instanceof Array) {
      for (let j = 0; j !== arg[i].length; ++j) {
        for (let k = 0; k !== arg1[i].length; ++k) {
          if (res[i][j].zone === arg1[i][k].zone) {
            res[i][j].time += arg1[i][k].time;
          }
        }
      }
    } else {
      if (!isNaN(arg1[i])) {
        res[i] = arg[i] + arg1[i];
      }
    }
  }
  return arg;
}
/**
 * Βρίσκει τον μέσο όρο από τον πίνακα με αριθμούς
 * 
 * @param ar πίνακας με αριθμούς
 */
function avgArray(ar: Array<number>): number {
  let avg = 0;
  if (ar.length != 0) {
    avg = ar.reduce(((a, b) => a + b));
    return avg / ar.length;
  } else { return consts.ERROR_NUMBER_VALUE; }
}


function movingAvg(ar: Array<number | null>, period?: number): Array<number> | null {
  //κενός πίνακας => επιστρέφει []
  if (ar.length === 0){
    return ar;
  }

  let per:number;
  if (period !== undefined){
    per = period;
  } else {
    per= 0;
  }
  //δεν υπάρχει moving με 1!!!! επιστρέφει ο ίδιος πίνακας
  if (per ===1 || per <0){
    return ar;
  }

  if (per === 0 || per > ar.length) {
    let subSum = ar.reduce((a,b)=>a+b);
    return [subSum/ar.length];
  }

  let result = [];
  for (let i=0;i!=ar.length;++i){
    if (i+1 >=per){
      let sum:number | null = null;
      for (let j=0; j!=per;++j){
        if (sum === null && ar[i-j] === null){
          sum = null;
        }else {
          sum += ar[i-j];
        }
      }
      if (sum === null){
        result.push(null);
      }else {
        result.push(sum/per);
      }
    }else {
      result.push(null);
    }
  }
  return result;
}

export {
  addTuples,
  apostasi,
  // Bearing,
  // calculateBmi,
  decimalPaceFromSpeedMpS,
  decimalPaceToTimePace,
  degToRads,
  // distanceFromMtoKM,
  // formatDate,
  getNextPointCordinatesFromDistanceBearing,
  // isInCurrentWeek,
  // putSlashInFront,
  radToDegrees,
  secsToTime,
  // speedFromMpStoKpH,
  TimePaceFromSpeedMpS,

  avgArray,
  movingAvg
};

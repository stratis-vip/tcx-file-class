import geoPoint from "../classes/geoPoint";
/**
 * Υπολογίζει την απόσταση σε ΜΕΤΡΑ από το σημείο FromPoint στο σημείο ToPoint
 *
 * @param {geoPoint} FromPoint οι συντεταγμένες του αρχικού σημείου σε ΜΟΙΡΕΣ
 * @param {geoPoint} ToPoint οι συντεταγμένες του τελικού σημείου σε ΜΟΙΡΕΣ
 * @returns {number} η απόσταση ανάμεσα στα σημεία σε ΜΕΤΡΑ
*/
declare const apostasi: (FromPoint: geoPoint, ToPoint: geoPoint) => number;
/**
* Μετατρέπει τις Μοίρες σε Ακτίνια
*
* @param {number} Degrees οι μοίρες
* @returns {number} τις degrees μοίρες σε ακτίνια
*/
declare const degToRads: (Degrees: number) => number;
/**
* Μετατρέπει τα ακτίνια σε μοίρες
*
* @param {number} η γωνία angle σε ακτίνια
* @returns {number} τα ακτίνια angle σε μοίρες
*/
declare const radToDegrees: (angle: number) => number;
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
declare const secsToTime: (value: number, showHours?: boolean) => string;
/**
 * Υπολογίζει τις συντεταγμένες του σημείου που βρίσκεται σε δεδομένα απόσταση και αζιμούθιο από το σημείο που στεκόμαστε
 *
 * @param {geoPoint} FromPoint το αρχικό σημείο
 * @param {number} distance η απόσταση σε μέτρα προς το επόμενο σημείο
 * @param {number} Bearing το αζιμούθιο προς το τελικό σημείο σε ΜΟΙΡΕΣ
 * @returns {GeoPoint} αντικείμενο Cordinates
 */
declare const getNextPointCordinatesFromDistanceBearing: (FromPoint: geoPoint, distance: number, Bearing: number) => geoPoint;
/**
 * Mετατρέπει την ταχύτητα από m/s σε δεκαδικό ρυθμό min/km
 * @param {number} value η ταχύτητα σε m/s
 * @returns string το ρυθμό σε λεπτά το χιλιόμετρο με τη μορφή Λ,Δ
 * @example decimalPaceFromSpeedMpS(2.77) = 6 (06:00.00)
 */
declare const decimalPaceFromSpeedMpS: (value: number) => number;
/**
 * Mετατρέπει την ταχύτητα από m/s σε ρυθμό της μορφής ΛΛ:ΔΔ.ΕΕ
 * @param  {number} value η ταχύτητα σε m/s
 * @returns string ο ρυθμός σε μορφή ΛΛ:ΔΔ.ΕΕ
 */
declare const TimePaceFromSpeedMpS: (value: number) => string;
/**
 * Mετατρέπει τον ρυθμο από την δεκαδική του μορφή στη μορφή ΛΛ:ΔΔ.ΕΕ
 * @param  {number} value
 * @returns string: ο ρυθμός σε μορφή ΛΛ:ΔΔ.ΕΕ
 */
declare const decimalPaceToTimePace: (value: number) => string;
declare function addTuples<T extends Array<any>>(arg: T, arg1: T): T;
/**
 * Βρίσκει τον μέσο όρο από τον πίνακα με αριθμούς
 *
 * @param ar πίνακας με αριθμούς
 */
declare function avgArray(ar: Array<number>): number;
declare function movingAvg(ar: Array<number | null>, period?: number): Array<number> | null;
export { addTuples, apostasi, decimalPaceFromSpeedMpS, decimalPaceToTimePace, degToRads, getNextPointCordinatesFromDistanceBearing, radToDegrees, secsToTime, TimePaceFromSpeedMpS, avgArray, movingAvg };

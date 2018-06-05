"use strict";
exports.__esModule = true;
/**Λάθος τιμή για αριθμό */
exports.ERROR_NUMBER_VALUE = -1;
/**Λάθος τιμή για γραμματοσειρά */
exports.ERROR_STRING_VALUE = "";
exports.SECONDS_IN_DAY = 86400;
exports.SECONDS_IN_HOUR = 3600;
exports.DEFAULT_NAME_STRING = 'Ανώνυμος';
exports.MINWEIGHT = 27.3; //Lizzie Velasquez at her 21 https://en.wikipedia.org/wiki/Lizzie_Vel%C3%A1squez
exports.MAXWEIGHT = 635; //Jon Brower Minnoch https://en.wikipedia.org/wiki/Jon_Brower_Minnoch
exports.MINHEIGHT = 0.546; //Chandra Bahadur Dangi https://en.wikipedia.org/wiki/Chandra_Bahadur_Dangi
exports.MAXHEIGHT = 2.72; //Robert Wadlow https://en.wikipedia.org/wiki/Robert_Wadlow
exports.MAXVO2MAX = 100;
exports.MAX_HEART_RATE = 220;
exports.MIN_HEART_RATE = 27;
function getExt(arg) {
    if (arg !== undefined) {
        return Number(arg[0]);
    }
    else {
        return exports.ERROR_NUMBER_VALUE;
    }
}
exports.getExt = getExt;
function getExtV(arg) {
    if (arg !== undefined) {
        return Number(arg[0].Value[0]);
    }
    else {
        return exports.ERROR_NUMBER_VALUE;
    }
}
exports.getExtV = getExtV;

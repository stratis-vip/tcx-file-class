"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**Λάθος τιμή για αριθμό */
exports.ERROR_NUMBER_VALUE = -1;
/**Λάθος τιμή για γραμματοσειρά */
exports.ERROR_STRING_VALUE = "";
function getExt(arg) {
    if (arg !== undefined) {
        return Number(arg[0]);
    }
    else {
        return exports.ERROR_NUMBER_VALUE;
    }
}
exports.getExt = getExt;
//# sourceMappingURL=consts.js.map
"use strict";
exports.__esModule = true;
/**
 * Τα στοιχεία του προγράμματος που παρήγαγε το TCX αρχείο
 */
var Author = /** @class */ (function () {
    /**
     * Δημιουργεί το αντικείμενο Author από το αντίστοιχο του TCX
     * @param {iXmlAuthor} obj το αποθηκευμένο σε xml μορφή αντικείμενο στο TCX
     */
    function Author(obj) {
        if (Object.keys(obj).length !== 0) {
            this.name = obj.Name[0];
            this.typeOfAuthor = obj.$['xsi:type'];
            this.build = getBuildString(obj.Build[0].Version[0]);
            this.langId = obj.LangID[0];
            this.partNumber = obj.PartNumber[0];
        }
    }
    return Author;
}());
exports.Author = Author;
function getBuildString(obj) {
    var build = obj.VersionMajor[0] + "." + obj.VersionMinor[0];
    //polar has not VersionMajor and VersionMinor
    if (obj.BuildMajor !== undefined && obj.BuildMinor !== undefined) {
        build += "." + obj.BuildMajor[0] + "." + obj.BuildMinor[0];
    }
    return build;
}

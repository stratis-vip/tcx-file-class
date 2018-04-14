"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Τα στοιχεία του προγράμματος που παρήγαγε το TCX αρχείο
 */
class Author {
    /**
     * Δημιουργεί το αντικείμενο Author από το αντίστοιχο του TCX
     * @param {iXmlAuthor} obj το αποθηκευμένο σε xml μορφή αντικείμενο στο TCX
     */
    constructor(obj) {
        if (Object.keys(obj).length !== 0) {
            this.name = obj.Name[0];
            this.typeOfAuthor = obj.$['xsi:type'];
            this.build = getBuildString(obj.Build[0].Version[0]);
            this.langId = obj.LangID[0];
            this.partNumber = obj.PartNumber[0];
        }
    }
}
function getBuildString(obj) {
    let build = obj.VersionMajor[0] + "." + obj.VersionMinor[0];
    //polar has not VersionMajor and VersionMinor
    if (obj.BuildMajor !== undefined && obj.BuildMinor !== undefined) {
        build += "." + obj.BuildMajor[0] + "." + obj.BuildMinor[0];
    }
    return build;
}
exports.default = Author;
//# sourceMappingURL=author.js.map
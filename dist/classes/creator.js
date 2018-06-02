"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Creator {
    constructor(obj) {
        if (obj !== undefined) {
            this.name = obj.Name[0];
            if (!obj.isRuntastic) {
                this.typeOfCreator = obj.$['xsi:type'];
                this.productId = Number(obj.ProductID[0]);
                this.unitId = Number(obj.UnitId[0]);
                this.version = getVersionString(obj.Version[0]);
            }
        }
    }
}
exports.Creator = Creator;
function getVersionString(obj) {
    let build = obj.VersionMajor[0] + "." + obj.VersionMinor[0] + "." +
        obj.BuildMajor[0] + "." + obj.BuildMinor[0];
    return build;
}
//# sourceMappingURL=creator.js.map
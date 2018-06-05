"use strict";
exports.__esModule = true;
var Creator = /** @class */ (function () {
    function Creator(obj) {
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
    return Creator;
}());
exports.Creator = Creator;
function getVersionString(obj) {
    var build = obj.VersionMajor[0] + "." + obj.VersionMinor[0] + "." +
        obj.BuildMajor[0] + "." + obj.BuildMinor[0];
    return build;
}

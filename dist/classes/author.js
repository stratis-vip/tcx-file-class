"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Author {
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
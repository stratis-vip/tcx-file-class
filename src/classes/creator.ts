import { iXsiType, iXmlBuild, iXmlCreator } from "./iFaces";

class Creator {
    name: string;

    typeOfCreator: string;
    productId: Number;
    unitId: Number;
    version: string;
    isRuntastic: boolean;
    constructor(obj?: iXmlCreator) {
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

function getVersionString(obj: iXmlBuild): string {
    let build = obj.VersionMajor[0] + "." + obj.VersionMinor[0] + "." +
        obj.BuildMajor[0] + "." + obj.BuildMinor[0];
    return build;
}

export default Creator;
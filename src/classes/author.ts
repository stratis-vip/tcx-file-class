import { iXsiType, iXmlBuild, iXmlAuthor } from "../classes/iFaces"


class Author {
    name: string;
    type: string | any;
    build: string;
    langId: string;
    partNumber: string;
    constructor(obj: iXmlAuthor|any) {
        if (Object.keys(obj).length !== 0 ) {
            this.name = obj.Name[0];
            this.type = obj.$['xsi:type'];
            this.build = getBuildString(obj.Build[0].Version[0]);
            this.langId = obj.LangID[0];
            this.partNumber = obj.PartNumber[0];
        }
    }
}

function getBuildString(obj: iXmlBuild): string {
    let build = obj.VersionMajor[0] + "." + obj.VersionMinor[0];
    //polar has not VersionMajor and VersionMinor
    if (obj.BuildMajor !== undefined && obj.BuildMinor !== undefined) {
        build += "." + obj.BuildMajor[0] + "." + obj.BuildMinor[0];
    }
    return build;
}

export default Author;
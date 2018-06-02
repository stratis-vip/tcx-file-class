import { iXsiType, iXmlBuild, iXmlAuthor } from "../classes/iFaces"

/**
 * Τα στοιχεία του προγράμματος που παρήγαγε το TCX αρχείο
 */
export class Author {
    /**Το όνομα */
    name: string;
    /**Ο τύπος του προγράμματος */
    typeOfAuthor: string | any;
    /**Η έκδοση */
    build: string;
    /**Η γλώσσα */
    langId: string;
    /**Ο αριθμός ονομαστικού (αν υπάρχει) */
    partNumber: string;
    /**
     * Δημιουργεί το αντικείμενο Author από το αντίστοιχο του TCX
     * @param {iXmlAuthor} obj το αποθηκευμένο σε xml μορφή αντικείμενο στο TCX
     */
    constructor(obj: iXmlAuthor | any) {
        if (Object.keys(obj).length !== 0) {
            this.name = obj.Name[0];
            this.typeOfAuthor = obj.$['xsi:type'];
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
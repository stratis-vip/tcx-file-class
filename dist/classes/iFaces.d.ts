export interface xsiType {
    'xsi:type': string;
}
export interface xmlBuild {
    VersionMajor: Array<string>;
    VersionMinor: Array<string>;
    BuildMajor: Array<string>;
    BuildMinor: Array<string>;
}
export interface xmlAuthor {
    Name: Array<string>;
    $: xsiType;
    Build: Array<any>;
    LangID: Array<string>;
    PartNumber: Array<string>;
}
export interface xmlCreator {
    Name: Array<string>;
    isRuntastic: Boolean;
    $: xsiType;
    ProductID: Array<string>;
    UnitId: Array<string>;
    Version: Array<xmlBuild>;
}
export interface xmlActivity_ {
    $: {
        Sport: string;
    };
    Creator: Array<xmlCreator>;
    Id: Array<string>;
    Lap: any;
}
export interface xmlActivities {
    $: any;
    Creator: Array<xmlCreator>;
    Id: Array<string>;
    Lap: Array<any>;
    Activity: Array<xmlActivity_>;
}
export interface xmlData {
    TrainingCenterDatabase: xmlTrainingCenterDatabase;
}
export interface xmlTrainingCenterDatabase {
    $: {
        creator?: string;
    };
    Activities: Array<xmlActivities>;
    Author: Array<xmlAuthor>;
}
export { xsiType as iXsiType, xmlBuild as iXmlBuild, xmlAuthor as iXmlAuthor, xmlCreator as iXmlCreator, xmlData as iXmlData, xmlTrainingCenterDatabase as iXmlTrainingCenterDatabase };

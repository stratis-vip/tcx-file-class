export interface xsiType {
    'xsi:type': string;
}
export interface xmlBuild {
    VersionMajor: [string];
    VersionMinor: [string];
    BuildMajor: [string];
    BuildMinor: [string];
}
export interface xmlAuthor {
    Name: [string];
    $: xsiType;
    Build: [any];
    LangID: [string];
    PartNumber: [string];
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
    $: {};
    Creator: Array<xmlCreator>;
    Id: Array<string>;
    Lap: Array<{}>;
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

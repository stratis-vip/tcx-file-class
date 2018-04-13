interface xsiType {
    'xsi:type':string;  
}

interface xmlBuild {
    VersionMajor: [string];
    VersionMinor: [string];
    BuildMajor: [string];
    BuildMinor: [string];
}

interface xmlAuthor {
    Name:[string];
    $: xsiType;
    Build: [any];
    LangID: [string];
    PartNumber: [string];
}

interface xmlCreator{
    Name:Array<string>;
    isRuntastic: Boolean;
    $: xsiType;
    ProductID: Array<string>;
    UnitId: Array<string>;
    Version:Array<xmlBuild>;
}

interface xmlActivity_{
    $:{Sport:string}; //{Sport}
    Creator:Array<xmlCreator>;
    Id: Array<string>;
    Lap: any;

}

interface xmlActivities{
    $: {};
    Creator:Array<xmlCreator>;
    Id: Array<string>;
    Lap: Array<{}>; 
    Activity: Array<xmlActivity_>;
}
interface xmlData{
    TrainingCenterDatabase:xmlTrainingCenterDatabase;
}

interface xmlTrainingCenterDatabase{
    $: {creator?:String};
    Activities: Array<xmlActivities>;
    Author: Array<xmlAuthor>;
}
export { 
    xsiType as iXsiType, 
    xmlBuild as iXmlBuild,
    xmlAuthor as iXmlAuthor,
    xmlCreator as iXmlCreator,
    xmlData as iXmlData,
    xmlTrainingCenterDatabase as iXmlTrainingCenterDatabase,   
};
import { iXmlCreator } from "./iFaces";
declare class Creator {
    name: string;
    typeOfCreator: string;
    productId: Number;
    unitId: Number;
    version: string;
    isRuntastic: boolean;
    constructor(obj?: iXmlCreator);
}
export default Creator;

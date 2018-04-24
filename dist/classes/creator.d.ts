import { iXmlCreator } from "./iFaces";
export default class Creator {
    name: string;
    typeOfCreator: string;
    productId: Number;
    unitId: Number;
    version: string;
    isRuntastic: boolean;
    constructor(obj?: iXmlCreator);
}

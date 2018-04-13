import { iXmlAuthor } from "../classes/iFaces";
declare class Author {
    name: string;
    typeOfAuthor: string | any;
    build: string;
    langId: string;
    partNumber: string;
    constructor(obj: iXmlAuthor | any);
}
export default Author;

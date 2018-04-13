import Author from "./author";
import Creator from "./creator";
import { iXmlData } from './iFaces';
import Lap from './lap';
declare class TcxFile {
    data: iXmlData;
    isError: string;
    isReady: boolean;
    constructor(filename: string, callback: (err: string) => void);
    getId(): string;
    getSport(): string;
    getAuthor(): Author | null;
    hasCreator(): boolean;
    getCreator(): Creator | null;
    getLaps(): Array<Lap> | Array<null>;
}
export default TcxFile;

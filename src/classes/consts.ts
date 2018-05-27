/**Λάθος τιμή για αριθμό */
export const ERROR_NUMBER_VALUE = -1;
/**Λάθος τιμή για γραμματοσειρά */
export const ERROR_STRING_VALUE = "";
export const SECONDS_IN_DAY = 86400;
export const SECONDS_IN_HOUR = 3600;
export const DEFAULT_NAME_STRING = 'Ανώνυμος';

export const MINWEIGHT= 27.3; //Lizzie Velasquez at her 21 https://en.wikipedia.org/wiki/Lizzie_Vel%C3%A1squez
export const MAXWEIGHT= 635;   //Jon Brower Minnoch https://en.wikipedia.org/wiki/Jon_Brower_Minnoch

export const MINHEIGHT= 0.546;   //Chandra Bahadur Dangi https://en.wikipedia.org/wiki/Chandra_Bahadur_Dangi
export const MAXHEIGHT= 2.72; //Robert Wadlow https://en.wikipedia.org/wiki/Robert_Wadlow

export const MAXVO2MAX= 100;

export const MAX_HEART_RATE = 220;
export const MIN_HEART_RATE = 27;

export function getExt<T>(arg: T|any): number {
    if (arg !== undefined) {
        return Number(arg[0]);
    }
    else {
        return ERROR_NUMBER_VALUE;
    }
}


export function getExtV<T>(arg: T|any): number {
    if (arg !== undefined) {
        return Number(arg[0].Value[0]);
    } else {
        return ERROR_NUMBER_VALUE;
    }
}
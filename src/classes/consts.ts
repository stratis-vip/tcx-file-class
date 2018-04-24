/**Λάθος τιμή για αριθμό */
export const ERROR_NUMBER_VALUE = -1;
/**Λάθος τιμή για γραμματοσειρά */
export const ERROR_STRING_VALUE = "";


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
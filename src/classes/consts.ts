/**Λάθος τιμή για αριθμό */
export const ERROR_NUMBER_VALUE = -1;
/**Λάθος τιμή για γραμματοσειρά */
export const ERROR_STRING_VALUE = "";


export function getExt<T>(arg: T): number {
    if (arg !== undefined) {
        return Number((arg[0] as Array<string>));
    }
    else {
        return ERROR_NUMBER_VALUE;
    }
}
declare type mergeCallback<T> = (item1: T, item2: T) => boolean;
/**
 * Merges two sorted arrays
 *
 * @param arr1 sorted array
 * @param arr2 sorted array
 * @returns merged sorted array
 */
declare const merge: <T>(arr1: T[], arr2: T[], callback: mergeCallback<T>) => T[];
declare const mergeSort: <T>(arr: T[], callback: mergeCallback<T>) => T[];
declare const main: () => void;

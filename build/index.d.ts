declare type mergeCallback<T> = (item1: T, item2: T) => boolean;
/**
 * Merges two sorted arrays
 *
 * @param arr1 sorted array
 * @param arr2 sorted array
 * @returns merged sorted array
 */
declare const merge: <T>(arr1: T[], arr2: T[], callback: mergeCallback<T>) => T[];
/**
 * Sorts an array defined by the user using merge sort
 *
 * @param arr any type of array
 * @param callback defines what direction to sort and of what value
 * @returns sorted array defined by the callback
 *
 */
declare const mergeSort: <T>(arr: T[], callback: mergeCallback<T>) => T[];
declare const exampleUse: () => void;
declare const timer: () => void;

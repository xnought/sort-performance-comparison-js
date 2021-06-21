"use strict";
/**
 * Merges two sorted arrays
 *
 * @param arr1 sorted array
 * @param arr2 sorted array
 * @returns merged sorted array
 */
const merge = (arr1, arr2, callback) => {
    let arr1Index = 0, arr2Index = 0; //start at the beginning
    const arr1Len = arr1.length, arr2Len = arr2.length; //get both lengths of arrays
    // resulting array will have all elements
    let result = [];
    //stop when we reach the end of one array
    while (arr1Index < arr1Len && arr2Index < arr2Len) {
        // first we get both current item comparison
        const item1 = arr1[arr1Index], item2 = arr2[arr2Index];
        const itemToAdd = callback(item1, item2); //callback function to select item to add
        result.push(itemToAdd ? item1 : item2); //add the smaller item
        itemToAdd ? arr1Index++ : arr2Index++; //increment the index of the one added
    }
    // add the left over from the other array and return merged
    const entriesLeft = arr1Index < arr1Len
        ? arr1.slice(arr1Index, arr1Len)
        : arr2.slice(arr2Index, arr2Len);
    const combined = result.concat(entriesLeft);
    return combined;
};
const mergeSort = (arr, callback) => {
    const arrLen = arr.length;
    if (arrLen <= 1)
        return arr; // this is when we stop splitting
    const middle = Math.floor(arrLen / 2);
    const lhside = arr.slice(0, middle);
    const rhside = arr.slice(middle, arrLen);
    const lhsideSort = mergeSort(lhside, callback);
    const rhsideSort = mergeSort(rhside, callback);
    return merge(lhsideSort, rhsideSort, callback);
};
const main = () => {
    let arr = [];
    const n = 10000000;
    for (let i = 0; i < n; i++)
        arr.push(Math.random());
    console.log(`n = ${n}`);
    const mySort = "Implemented Merge sort";
    console.time(mySort);
    const result1 = mergeSort(arr, (item1, item2) => item1 < item2);
    console.timeEnd(mySort);
    //compare against native support for sorting (they use quicksort)
    const native = "native support in javascript";
    console.time(native);
    const result2 = arr.sort((a, b) => a - b);
    console.timeEnd(native);
    // console.log(result1);
    // console.log(result2);
};
main(); //execute the main method
//# sourceMappingURL=index.js.map
type mergeCallback<T> = (item1: T, item2: T) => boolean;

/**
 * Merges two sorted arrays
 *
 * @param arr1 sorted array
 * @param arr2 sorted array
 * @returns merged sorted array
 */
const merge = <T>(arr1: T[], arr2: T[], callback: mergeCallback<T>): T[] => {
	let arr1Index = 0,
		arr2Index = 0; //start at the beginning
	const arr1Len = arr1.length,
		arr2Len = arr2.length; //get both lengths of arrays

	// resulting array will have all elements
	let result = [];

	//stop when we reach the end of one array
	while (arr1Index < arr1Len && arr2Index < arr2Len) {
		// first we get both current item comparison
		const item1 = arr1[arr1Index],
			item2 = arr2[arr2Index];
		const itemToAdd = callback(item1, item2); //callback function to select item to add
		result.push(itemToAdd ? item1 : item2); //add the smaller item
		itemToAdd ? arr1Index++ : arr2Index++; //increment the index of the one added
	}

	// add the left over from the other array and return merged
	const entriesLeft: T[] =
		arr1Index < arr1Len
			? arr1.slice(arr1Index, arr1Len)
			: arr2.slice(arr2Index, arr2Len);
	const combined: T[] = result.concat(entriesLeft);
	return combined;
};

/**
 * Sorts an array defined by the user using merge sort
 *
 * @param arr any type of array
 * @param callback defines what direction to sort and of what value
 * @returns sorted array defined by the callback
 *
 */
const mergeSort = <T>(arr: T[], callback: mergeCallback<T>): T[] => {
	const arrLen = arr.length;
	if (arrLen <= 1) return arr; // this is when we stop splitting
	const middle = Math.floor(arrLen / 2);
	const lhside = arr.slice(0, middle);
	const rhside = arr.slice(middle, arrLen);

	const lhsideSort = mergeSort(lhside, callback);
	const rhsideSort = mergeSort(rhside, callback);

	return merge(lhsideSort, rhsideSort, callback);
};

const exampleUse = () => {
	const unsortedArray = [4, 3, 2, 1, 6, 8];
	const ascending = mergeSort(unsortedArray, (a, b) => a < b);
	const descending = mergeSort(unsortedArray, (a, b) => b < a);
	console.log("Unsorted", unsortedArray);
	console.log("Ascending", ascending);
	console.log("Descending", descending);
};

const timer = () => {
	let arr = [];
	const n = 10000000;
	for (let i = 0; i < n; i++) arr.push(Math.random());

	console.log(`n = ${n}`);
	const mySort = "Implemented Merge sort";
	console.time(mySort);
	const result1 = mergeSort(arr, (a, b) => a < b);
	console.timeEnd(mySort);

	//compare against native support for sorting (they use quicksort)
	const native = "native support in javascript";
	console.time(native);
	const result2 = arr.sort((a, b) => a - b);
	console.timeEnd(native);
};

timer();

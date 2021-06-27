# sort-performance-comparison-js

Testing the performance of my implementation of merge sort vs the native sort by javascript. The native sort uses insertion sort for length < 10 and
uses quick sort for lists larger.

## comparison

```
n = 10000000, Implemented Merge sort: 7432.241ms, native support in javascript: 13946.826ms
```

For large n merge sort wins out, but anything smaller there is negligible improvement and is worse most the time.

## implementation

If you just want the implementation, I did it in typescript, but if you just want to see the plain compiled javascript
just look below to see the basic logic of the sort.

```javascript
/**
 * Merges two sorted arrays
 *
 * @param arr1 sorted array
 * @param arr2 sorted array
 * @returns merged sorted array
 */
const merge = (arr1, arr2, callback) => {
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
	const entriesLeft =
		arr1Index < arr1Len
			? arr1.slice(arr1Index, arr1Len)
			: arr2.slice(arr2Index, arr2Len);
	const combined = result.concat(entriesLeft);
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
const mergeSort = (arr, callback) => {
	const arrLen = arr.length;
	if (arrLen <= 1) return arr; // this is when we stop splitting
	const middle = Math.floor(arrLen / 2); //find the where to split
	// split into two arrays
	const lhside = arr.slice(0, middle),
		rhside = arr.slice(middle, arrLen);
	// call mergeSort on both sides
	const lhsideSort = mergeSort(lhside, callback),
		rhsideSort = mergeSort(rhside, callback);
	// merge two sorted arrays
	return merge(lhsideSort, rhsideSort, callback);
};
```

## Example Use Case

```javascript
const unsortedArray = [4, 3, 2, 1, 6, 8];
const ascending = mergeSort(unsortedArray, (a, b) => a < b);
const descending = mergeSort(unsortedArray, (a, b) => b < a);
console.log("Unsorted", unsortedArray);
console.log("Ascending", ascending);
console.log("Descending", descending);
```

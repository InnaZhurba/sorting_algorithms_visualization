/*
 * i stands for the iteration count.
 */
export function selectionSort(array, i) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++)
        if (array[j] < array[minIndex])
            minIndex = j;

    // minIndex and i are the indices to be swapped.
    // i + 1 should be passed as the iteration count for the next function call.
    return [minIndex, i];
}

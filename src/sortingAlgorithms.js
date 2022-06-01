export const bubbleSort = ({i, j, n, arr, finished}) => {
    finished = typeof i === 'undefined' ? false : i;
    i = typeof i === 'undefined' ? 0 : i;
    j = typeof j === 'undefined' ? 0 : j;
    n = typeof n === 'undefined' ? arr.length : n;

    for (; i < n; ++i) {
        let j = i;
        for (; j < n; ++j) {
            if (arr[j] > arr[j+1]) {
                // const temp = arr[j];
                // arr[j] = arr[j+1];
                // arr[j+1] = temp;
                
                // console.log(arr);

                return {
                    i: i,
                    j: j,
                    n: n,
                    finished: false,
                    // arr: arr,
                    swappedIndex1: j,
                    swappedIndex2: j+1,
                };
            }
        }
    }

    return {finished: true};

}


// const mergeSort = ({leftStart, sortedArr, arrForMerging, idx, finished, size}) => {
//     leftStart = typeof leftStart === 'undefined' ? 0 : leftStart;

//     idx = typeof idx === 'undefined' ? 0 : idx;
//     finished = typeof finished === 'undefined' ? false : finished;
//     arrForMerging = typeof arrForMerging === 'undefined' ? new Array(sortedArr.length) : arrForMerging;
//     size = typeof size === 'undefined' ? 1 : size;

//     left = typeof left === 'undefined' ? leftStart : left;
//     right = typeof right === 'undefined' ? Math.min(left + size, sortedArr.length) : right;

//     leftEnd = typeof leftEnd === 'undefined' ? right : leftEnd;
//     rightEnd = typeof rightEnd === 'undefined' ? Math.min(right + size, sortedArr.length) : rightEnd;
    
    

//     if (size < sortedArr.length) {
//       if (leftStart < sortedArr.length) {
//         if (left >= leftEnd && right >= rightEnd) {
//           leftStart += 2*size;

//           left = leftStart;
//           right = Math.min(left + size, sortedArr.length);
//           leftEnd = right;
//           rightEnd = Math.min(right + size, sortedArr.length);

//           idx = left;
//         }
                
//         if (left < leftEnd && right < rightEnd) {
//           swap_idx = [left, right];
//           if (sortedArr[left] <= sortedArr[right]) {
//             arrForMerging[idx++] = sortedArr[left++];
//             swap = false;
//           } else {
//             arrForMerging[idx++] = sortedArr[right++];
//             swap = true;
//           }
    
//           return {left: left,
//             right: right, 
//             leftStart: leftStart,
//             leftEnd: leftEnd,
//             rightEnd: rightEnd,
//             sortedArr: sortedArr,
//             arrForMerging: arrForMerging,
//             idx: idx,
//             finished: finished,
//             size: size,
//             swap: swap,
//             swap_idx: swap_idx};
//         }
      
//         if (left < leftEnd) {
//           swap_idx = [left, left]
//           swap = false;
//           arrForMerging[idx++] = sortedArr[left++];
//           return {left: left,
//             right: right, 
//             leftStart: leftStart,
//             leftEnd: leftEnd,
//             rightEnd: rightEnd,
//             sortedArr: sortedArr,
//             arrForMerging: arrForMerging,
//             idx: idx,
//             finished: finished,
//             size: size,
//             swap: swap,
//             swap_idx: swap_idx};
//         }
      
//         if (right < rightEnd) {
//           swap_idx = [right, right]
//           swap = false;
//           arrForMerging[idx++] = sortedArr[right++];
//           return {left: left,
//             right: right, 
//             leftStart: leftStart,
//             leftEnd: leftEnd,
//             rightEnd: rightEnd,
//             sortedArr: sortedArr,
//             arrForMerging: arrForMerging,
//             idx: idx,
//             finished: finished,
//             size: size,
//             swap: swap,
//             swap_idx: swap_idx};
//         }
        
//       }

//       let tempArr = sortedArr;
//       sortedArr = arrForMerging;
//       arrForMerging = tempArr;  
      
//       size *= 2;
//       leftStart = 0;

//       left = leftStart;
//       right = Math.min(left + size, sortedArr.length);
//       leftEnd = right,
//       rightEnd = Math.min(right + size, sortedArr.length);

//       idx = left;
//     }
    
//     return {left: left,
//             right: right, 
//             leftStart: leftStart,
//             leftEnd: leftEnd,
//             rightEnd: rightEnd,
//             sortedArr: sortedArr,
//             arrForMerging: arrForMerging,
//             idx: idx,
//             finished: true,
//             size: size,
//             swap: swap,
//             swap_idx: swap_idx};
// }


/*
 * i stands for the iteration count.
 * Usage:
 *
 * state = {array: [4, 3, 2, 1]};
 * while (state.finished !== true) {
 *     state = selectionSort(state);
 *     swap(state.toSwap1, state.toSwap2);
 * }
 * swap(state.toSwap1, state.toSwap2);
 */
const selectionSort = ({array, i}) => {
    i = typeof i === 'undefined' ? 0 : i;

    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
            minIndex = j;
        }
    }

    if (i === minIndex || i === array.length - 1) {
        return {toSwap1: minIndex, toSwap2: i, finished: true};
    }

    [array[minIndex], array[i]] = [array[i], array[minIndex]];

    return {array, i: i + 1, toSwap1: minIndex, toSwap2: i, finished: false};
}


/*
 * Helper function for quickSort. Does only one step.
 */
const partition = ({array, low, high, i, j}) => {
    i = typeof i === 'undefined' ? low - 1 : i;
    j = typeof j === 'undefined' ? low : j;

    let pivot = array[high];

    for (; j <= high - 1; j++) {
        if (array[j] <= pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];

            return {array, i, j, finished: false};
        }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    return {array, i: i + 1, j: high, pivot: i + 1, low, high, finished: true};
}


/*
 * i, j are the indices to be swapped.
 * Usage:
 *
 * state = {array: [4, 3, 2, 1]}
 * while (state.finished !== true) {
 *     state = quickSort(state);
 *     swap(state.i, state.j);
 * }
 * swap(state.i, state.j);
 */
const quickSort = ({array, stack, top, i, j, high, low, partitionFinished}) => {
    if (typeof stack === 'undefined') {
        stack = new Array(array.length);
        stack.fill(0);

        top = -1;
        stack[++top] = 0;
        stack[++top] = array.length - 1;

        partitionFinished = true;
    }

    if (partitionFinished) {
        high = stack[top--];
        low = stack[top--];
    }

    let partitionState = partition({array, low, high, i, j});

    if (!partitionState.finished) {
        return {
            array, stack, top, i: partitionState.i, j: partitionState.j, low, high,
            partitionFinished: false, finished: false
        };
    }

    let pivot = partitionState.pivot;

    if (pivot - 1 > low) {
        stack[++top] = low;
        stack[++top] = pivot - 1;
    }

    if (pivot + 1 < high) {
        stack[++top] = pivot + 1;
        stack[++top] = high;
    }

    if (top >= 0) {
        return {array, stack, top, partitionFinished: true, finished: false};
    }

    return {array, stack, top, finished: true};
}


export default { 
    bubbleSort,
    // mergeSort
};
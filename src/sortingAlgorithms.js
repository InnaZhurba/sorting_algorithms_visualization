export const bubbleSort = ({i, j, n, arr, finished}) => {
    finished = finished == undefined ? false : finished;
    i = i == undefined ? 0 : i;
    j = j == undefined ? 0 : j;
    n = n == undefined ? arr.length : n;

    for (; i < n; i++) {
        for (; j < n-1; j++) {
            if (arr[j] > arr[j+1]) {
                const newJ = j+1;
                return {
                    i: i,
                    j: newJ,
                    n: n,
                    finished: false,
                    swappedIndex1: j,
                    swappedIndex2: j+1,
                };
            } else {
                const newJ = j+1;
                return {
                    indexForSelect1: j,
                    indexForSelect2: j+1,
                    i: i,
                    j: newJ,
                    n: n,
                    finished: false,
                };
            }
        }
        j = 0;
    }

    return {finished: true};

}


// export const mergeSort = ({leftStart, sortedArr, arrForMerging, idx, finished, size}) => {
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
 * i, j - iteration counters.
 * minIndex - index of the current min element.
 */
export const selectionSort = ({arr, i, j, minIndex}) => {
    i = i === undefined ? 0 : i;
    j = j === undefined ? i + 1 : j;
    minIndex = minIndex === undefined ? i : minIndex;

    let newMinIndex = minIndex;
    if (arr[j] < arr[minIndex]) {
        newMinIndex = j;
    }

    if (j < arr.length) {
        return {
            indexForSelect1: j, indexForSelect2: minIndex, i, j: j + 1, minIndex: newMinIndex,
            finished: false
        };
    }

    if (i === minIndex || i === arr.length - 2) {
        return {finished: true};
    }

    return {i: i + 1, swappedIndex1: minIndex, swappedIndex2: i, finished: false};
}


export const insertionSort = ({array, i}) => {
    i = typeof i === 'undefined' ? 1 : i;

    let n = array.length;
    // for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
    let current = array[i];
    // The last element of our sorted subarray
    let j = i-1; 
    while ((j > -1) && (current < array[j])) {
        array[j+1] = array[j];
        j--;
    }
    array[j+1] = current;
    // }
    if (i === n-1){
        return {array, i: i+1, finished:true}    
    }
    return {array, i: i+1, finished:false} 
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
export const quickSort = ({array, stack, top, i, j, high, low, partitionFinished}) => {
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
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

    if (i === arr.length - 1) {
        return {finished: true};
    }

    j = j === undefined ? i + 1 : j;
    minIndex = minIndex === undefined ? i : minIndex;

    let newMinIndex = minIndex;
    if (arr[j] <= arr[minIndex]) {
        newMinIndex = j;
    }

    if (j < arr.length) {
        return {
            indexForSelect1: j, indexForSelect2: minIndex, i, j: j + 1, minIndex: newMinIndex,
            finished: false
        };
    }

    if (minIndex === i) {
        return {i: i + 1, indexForSelect1: i, indexForSelect2: arr.length - 1, finished: false};
    }

    return {i: i + 1, swappedIndex1: minIndex, swappedIndex2: i, finished: false};
}


export const insertionSort = ({i, j, n, array, finished}) => {
    i = i === undefined ? 1 : i;
    j = j === undefined ? i - 1 : j;
    n = n === undefined ? array.length : n;
    finished = finished == undefined ? false : finished;


    

    // current = current === undefined ? array[i] : current;

    // for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
    // let current = array[i];
    // The last element of our sorted subarray
    // let j = i-1; 
    if ((j > -1) && (array[i] < array[j])) {
        // array[j+1] = array[j];
        let new_j = j-1;
        return {array, i: i, j: new_j, swappedIndex1: array[j+1], swappedIndex2: array[j], j, finished:false}
    }

    // array[j+1] = current;
    // }
    // let n = array.length;
    if (i === n-1){
        return {finished:true}    
    }
    let new_j_here = i-1;

    return {array, i: i+1, j: new_j_here, indexForSelect1: i-1, indexForSelect1: i, finished:false} 
}


/*
 * Helper function for quickSort. Does only one step.
 * low, high - partition boundaries.
 * i, j - iteration counters.
 */
const partition = ({arr, low, high, i, j}) => {
    i = typeof i === 'undefined' ? low - 1 : i;
    j = typeof j === 'undefined' ? low : j;

    if (j <= high - 1) {
        if (arr[j] <= arr[high]) {
            i++;
            if (i !== j) {
                return {i, j, toSwap: true, finished: false};
            }
        }
        return {i, j, toSwap: false, finished: false};
    }

    return {pivot: i + 1, finished: true};
}


/*
 * stack, top - partition boundaries' stack and its top.
 * i, j - iteration counters.
 * low, high - current partition boundaries.
 */
export const quickSort = ({arr, stack, top, i, j, high, low, partitionFinished}) => {
    if (typeof stack === 'undefined') {
        stack = new Array(arr.length);
        stack.fill(0);

        top = -1;
        stack[++top] = 0;
        stack[++top] = arr.length - 1;

        partitionFinished = true;
    }

    if (partitionFinished) {
        if (top < 0) {
            return {finished: true};
        }

        high = stack[top--];
        low = stack[top--];
    }

    let partitionState = partition({arr, low, high, i, j});

    if (!partitionState.finished) {
        if (partitionState.toSwap) {
            return {
                stack, top, i: partitionState.i, j: partitionState.j + 1, low, high,
                swappedIndex1: partitionState.i, swappedIndex2: partitionState.j,
                partitionFinished: false, finished: false
            };
        }
        return {
            stack, top, i: partitionState.i, j: partitionState.j + 1, low, high,
            indexForSelect1: partitionState.j, indexForSelect2: high, partitionFinished: false,
            finished: false
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

    if (pivot === high) {
        return {
            stack, top, indexForSelect1: high - 1, indexForSelect2: high,
            partitionFinished: true, finished: false
        };
    }

    return {
        stack, top, swappedIndex1: pivot, swappedIndex2: high,
        partitionFinished: true, finished: false
    };
}

const bubbleSort = ({i, j, n, arr, finished}) => {
    finished = typeof i === 'undefined' ? false : i;
    i = typeof i === 'undefined' ? 0 : i;
    j = typeof j === 'undefined' ? 0 : j;
    n = typeof n === 'undefined' ? arr.length : n;

    for (; i < n; ++i) {
        for (; j < n-i-1; ++j) {
            if (arr[j] > arr[j+1]) {
                const temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;

                return {
                    i: i,
                    j: j,
                    n: n,
                    finished: finished,
                    arr: arr,
                    swappedIndex1: j,
                    swappedIndex2: j+1,
                };
            }
        }
    }

    return {arr: arr, finished: true};

}


const mergeSort = ({leftStart, sortedArr, arrForMerging, idx, finished, size}) => {
    leftStart = typeof leftStart === 'undefined' ? 0 : leftStart;

    idx = typeof idx === 'undefined' ? 0 : idx;
    finished = typeof finished === 'undefined' ? false : finished;
    arrForMerging = typeof arrForMerging === 'undefined' ? new Array(sortedArr.length) : arrForMerging;
    size = typeof size === 'undefined' ? 1 : size;

    left = typeof left === 'undefined' ? leftStart : left;
    right = typeof right === 'undefined' ? Math.min(left + size, sortedArr.length) : right;

    leftEnd = typeof leftEnd === 'undefined' ? right : leftEnd;
    rightEnd = typeof rightEnd === 'undefined' ? Math.min(right + size, sortedArr.length) : rightEnd;
    
    

    while (size < sortedArr.length) {
      while (leftStart < sortedArr.length) {
        if (left >= leftEnd && right >= rightEnd) {
          leftStart += 2*size;

          left = leftStart;
          right = Math.min(left + size, sortedArr.length);
          leftEnd = right;
          rightEnd = Math.min(right + size, sortedArr.length);

          idx = left;
        }
                
        while (left < leftEnd && right < rightEnd) {
          swap_idx = [left, right];
          if (sortedArr[left] <= sortedArr[right]) {
            arrForMerging[idx++] = sortedArr[left++];
            swap = false;
          } else {
            arrForMerging[idx++] = sortedArr[right++];
            swap = true;
          }
    
          return {left: left,
            right: right, 
            leftStart: leftStart,
            leftEnd: leftEnd,
            rightEnd: rightEnd,
            sortedArr: sortedArr,
            arrForMerging: arrForMerging,
            idx: idx,
            finished: finished,
            size: size,
            swap: swap,
            swap_idx: swap_idx};
        }
      
        while (left < leftEnd) {
          swap_idx = [left, left]
          swap = false;
          arrForMerging[idx++] = sortedArr[left++];
          return {left: left,
            right: right, 
            leftStart: leftStart,
            leftEnd: leftEnd,
            rightEnd: rightEnd,
            sortedArr: sortedArr,
            arrForMerging: arrForMerging,
            idx: idx,
            finished: finished,
            size: size,
            swap: swap,
            swap_idx: swap_idx};
        }
      
        while (right < rightEnd) {
          swap_idx = [right, right]
          swap = false;
          arrForMerging[idx++] = sortedArr[right++];
          return {left: left,
            right: right, 
            leftStart: leftStart,
            leftEnd: leftEnd,
            rightEnd: rightEnd,
            sortedArr: sortedArr,
            arrForMerging: arrForMerging,
            idx: idx,
            finished: finished,
            size: size,
            swap: swap,
            swap_idx: swap_idx};
        }
        
      }

      let tempArr = sortedArr;
      sortedArr = arrForMerging;
      arrForMerging = tempArr;  
      
      size *= 2;
      leftStart = 0;

      left = leftStart;
      right = Math.min(left + size, sortedArr.length);
      leftEnd = right,
      rightEnd = Math.min(right + size, sortedArr.length);

      idx = left;
    }
    
    return {left: left,
            right: right, 
            leftStart: leftStart,
            leftEnd: leftEnd,
            rightEnd: rightEnd,
            sortedArr: sortedArr,
            arrForMerging: arrForMerging,
            idx: idx,
            finished: true,
            size: size,
            swap: swap,
            swap_idx: swap_idx};
}


export default { 
    bubbleSort,
    mergeSort
};


// MERGE SORT
// EXAMPLE OF USAGE
// objectA = {
//     sortedArr: new Array(1, 3, 2, 4),
//     finished: false
// };



// while (objectA.finished != true) {
//   objectA = mergeSort(objectA);
//   console.log(objectA);
//   console.log("");

// }
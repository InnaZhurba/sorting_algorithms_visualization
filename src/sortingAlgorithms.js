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
    
    

    if (size < sortedArr.length) {
      if (leftStart < sortedArr.length) {
        if (left >= leftEnd && right >= rightEnd) {
          leftStart += 2*size;

          left = leftStart;
          right = Math.min(left + size, sortedArr.length);
          leftEnd = right;
          rightEnd = Math.min(right + size, sortedArr.length);

          idx = left;
        }
                
        if (left < leftEnd && right < rightEnd) {
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
      
        if (left < leftEnd) {
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
      
        if (right < rightEnd) {
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
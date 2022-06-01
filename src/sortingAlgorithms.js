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
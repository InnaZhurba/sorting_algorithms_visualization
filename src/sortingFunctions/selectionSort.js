/*
 * i stands for the iteration count.
 */
export function selectionSort(state) {
    let minIndex = state.i;
    for (let j = state.i + 1; j < state.array.length; j++) {
        if (state.array[j] < state.array[minIndex]) {
            minIndex = j;
        }
    }

    [state.array[minIndex], state.array[state.i]] = [state.array[state.i], state.array[minIndex]];
    state.toSwap1 = minIndex;
    state.toSwap2 = state.i;
    state.i += 1;

    if (state.i === state.array.length - 1) {
        state.done = true;
    }

    return state;
}

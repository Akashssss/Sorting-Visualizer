export const bubbleSort = (array) => {
    const animations = [];
    const n = array.length;
    let swapped;
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            animations.push([j, j + 1, false]); // Compare
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                swapped = true;
                animations.push([j, j + 1, true]); // Swap
            }
        }
        if (!swapped) break;
    }
    return animations;
};

export const mergeSort = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
};

const mergeSortHelper = (
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations
) => {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(
        auxiliaryArray,
        middleIdx + 1,
        endIdx,
        mainArray,
        animations
    );
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
};

const doMerge = (
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations
) => {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
};

export const insertionSort = (array) => {
    const animations = [];
    const n = array.length;
    for (let i = 1; i < n; i++) {
        const key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            animations.push([j, j + 1]);
            animations.push([j, j + 1]);
            animations.push([j + 1, array[j]]);
            array[j + 1] = array[j];
            j--;
        }
        animations.push([j + 1, j + 1]);
        animations.push([j + 1, j + 1]);
        animations.push([j + 1, key]);
        array[j + 1] = key;
    }
    return animations;
};

export const quickSort = (array) => {
    const animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
};

const quickSortHelper = (array, low, high, animations) => {
    if (low < high) {
        const partitionIdx = partition(array, low, high, animations);
        quickSortHelper(array, low, partitionIdx - 1, animations);
        quickSortHelper(array, partitionIdx + 1, high, animations);
    }
};

const partition = (array, low, high, animations) => {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        animations.push([j, high]);
        animations.push([j, high]);
        if (array[j] <= pivot) {
            i++;
            animations.push([i, j]);
            animations.push([i, j]);
            animations.push([i, array[j]]);
            animations.push([j, i]);
            animations.push([j, i]);
            animations.push([j, array[i]]);
            swap(array, i, j);
        }
    }
    animations.push([i + 1, high]);
    animations.push([i + 1, high]);
    animations.push([i + 1, array[high]]);
    animations.push([high, i + 1]);
    animations.push([high, i + 1]);
    animations.push([high, array[i + 1]]);
    swap(array, i + 1, high);
    return i + 1;
};

export const selectionSort = (array) => {
    const animations = [];
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            animations.push([minIdx, j]);
            animations.push([minIdx, j]);
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        animations.push([i, minIdx]);
        animations.push([i, minIdx]);
        animations.push([i, array[minIdx]]);
        animations.push([minIdx, i]);
        animations.push([minIdx, i]);
        animations.push([minIdx, array[i]]);
        swap(array, i, minIdx);
    }
    return animations;
};

const swap = (array, i, j) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
};

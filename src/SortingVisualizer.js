import React, { useState, useEffect } from 'react';
import { randomIntArray } from './randomIntArray'; // Custom utility function to generate a random array

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [sortingAlgorithm, setSortingAlgorithm] = useState(null);
    const [intervalDuration, setIntervalDuration] = useState(10); // Initial interval duration is set to 2 seconds
    const [isSorting, setIsSorting] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // Generate a random array of 50 elements between 5 and 500
    const generateRandomArray = () => {
        let newArray = randomIntArray(50, 5, 500);
        setArray(newArray);
    };

    // Perform the selected sorting algorithm
    const performSort = () => {
        setIsSorting(true);
        setCurrentStep(0);
        let sortedArray = [...array];

        switch (sortingAlgorithm) {
            case 'bubbleSort':
                bubbleSort(sortedArray);
                break;
            case 'insertionSort':
                insertionSort(sortedArray);
                break;
            case 'mergeSort':
                mergeSort(sortedArray);
                break;
            case 'quickSort':
                quickSort(sortedArray);
                break;
            case 'selectionSort':
                selectionSort(sortedArray);
                break;
            default:
                break;
        }
    };

    // Bubble Sort Algorithm
    const bubbleSort = async (arr) => {
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
                setCurrentStep(j); // Update the current step for visualization
                setArray([...arr]);
                await sleep();
            }
        }

        setIsSorting(false);
    };

    // Insertion Sort Algorithm
    const insertionSort = async (arr) => {
        const n = arr.length;

        for (let i = 1; i < n; i++) {
            const key = arr[i];
            let j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
                setCurrentStep(j); // Update the current step for visualization
                setArray([...arr]);
                await sleep();
            }

            arr[j + 1] = key;
            setCurrentStep(i); // Update the current step for visualization
            setArray([...arr]);
            await sleep();
        }

        setIsSorting(false);
    };

    // Merge Sort Algorithm
    const mergeSort = async (arr, leftIndex = 0, rightIndex = arr.length - 1) => {
        const merge = async (left, right) => {
            const mergedArray = [];
            let leftIndex = 0;
            let rightIndex = 0;

            while (leftIndex < left.length && rightIndex < right.length) {
                if (left[leftIndex] < right[rightIndex]) {
                    mergedArray.push(left[leftIndex]);
                    leftIndex++;
                } else {
                    mergedArray.push(right[rightIndex]);
                    rightIndex++;
                }
                setCurrentStep(currentStep + 1); // Update the current step for visualization
                await sleep();
            }

            return mergedArray.concat(left.slice(leftIndex), right.slice(rightIndex));
        };

        if (leftIndex < rightIndex) {
            const mid = Math.floor((leftIndex + rightIndex) / 2);

            await mergeSort(arr, leftIndex, mid);
            await mergeSort(arr, mid + 1, rightIndex);

            const leftArray = arr.slice(leftIndex, mid + 1);
            const rightArray = arr.slice(mid + 1, rightIndex + 1);

            const mergedArray = await merge(leftArray, rightArray);

            arr.splice(leftIndex, mergedArray.length, ...mergedArray);
            setArray([...arr]); // Update the state to trigger re-render
        }

        setIsSorting(false);
    };

    // Quick Sort Algorithm
    const quickSort = async (arr) => {
        const partition = async (arr, low, high) => {
            const pivot = arr[high];
            let i = low - 1;

            for (let j = low; j <= high - 1; j++) {
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
                setCurrentStep(j); // Update the current step for visualization
                setArray([...arr]);
                await sleep();
            }

            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            return i + 1;
        };

        const quickSortHelper = async (arr, low, high) => {
            if (low < high) {
                const pi = await partition(arr, low, high);
                await quickSortHelper(arr, low, pi - 1);
                await quickSortHelper(arr, pi + 1, high);
            }
        };

        await quickSortHelper(arr, 0, arr.length - 1);
        setIsSorting(false);
    };

    // Selection Sort Algorithm
    const selectionSort = async (arr) => {
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;

            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            setCurrentStep(i); // Update the current step for visualization
            setArray([...arr]);
            await sleep();
        }

        setIsSorting(false);
    };

    // Utility function to simulate a delay
    const sleep = () =>
        new Promise((resolve) => setTimeout(resolve, intervalDuration));

    useEffect(() => {
        generateRandomArray();
    }, []);

    return (
        <div className="w-screen">
           
           <div className='fixed top-2 left-0 flex  gap-1'>
                <button
                    className="w-fit md:w-auto  bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={() => setSortingAlgorithm('bubbleSort')}
                    disabled={isSorting}
                >
                    Bubble Sort
                </button>
                <button
                    className="w-fit md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={() => setSortingAlgorithm('insertionSort')}
                    disabled={isSorting}
                >
                    Insertion Sort
                </button>
                <button
                    className="w-fit md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={() => setSortingAlgorithm('mergeSort')}
                    disabled={isSorting}
                >
                    Merge Sort
                </button>
                <button
                    className="w-fit md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={() => setSortingAlgorithm('quickSort')}
                    disabled={isSorting}
                >
                    Quick Sort
                </button>
                <button
                    className="w-fit md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={() => setSortingAlgorithm('selectionSort')}
                    disabled={isSorting}
                >
                    Selection Sort
                </button>
           </div>

           <div className='w-full flex justify-center mt-32 mx-1'>
                <div className='flex justify-around w-[100%]  '>
                    {array.map((value, index) => (
                        <div
                            key={index}
                            className={` bg-green-300 ${currentStep === index ? 'bg-blue-500' : ''
                                }`}
                            style={{
                                height: `${value}px`,
                                width: '0.5rem', // Adjust the width as needed
                            }}
                        />
                    ))}
                </div>
           </div>

          <div className='flex justify-between mt-9 mx-9'>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    onClick={generateRandomArray}
                    disabled={isSorting}
                >
                    Generate Random Array
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={performSort}
                    disabled={isSorting}
                >
                    Sort
                </button>
          </div>


        </div>
    );
};

export default SortingVisualizer;



// <div className="flex flex-row gap-4 mb-4 w-[90%] sticky">
   
// </div>




// <div className="flex gap-1 px-8 ">
    
// </div>



// <div className="flex items-center gap-4 mt-4">
 
// </div>
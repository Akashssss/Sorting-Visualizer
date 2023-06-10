export const randomIntArray = (length, min, max) => {
    const newArray = [];
    for (let i = 0; i < length; i++) {
        newArray.push(Math.floor(Math.random() * (max - min + 1) + min));
    }
    return newArray;
};

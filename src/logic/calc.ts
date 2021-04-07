export const getMean = (data: number[]): number => data.reduce((a, b) => a + b) / data.length;

export const getStandartDeviation = (data: number[]): number =>
    Math.sqrt(getMean(data.map((x) => Math.pow(x - getMean(data), 2))));

export const getMode = (data: number[]): number => {
    const modes: number[] = [];
    const count: number[] = [];
    let max = 0;

    data.forEach((n) => {
        count[n] = count[n] + 1 || 1;
        if (count[n] > max) {
            max = count[n];
        }
    });

    count.forEach((_, index) => {
        if (count[index] === max) {
            modes.push(index);
        }
    });

    return modes[0];
};

export const getMedian = (data: number[]): number => {
    let median = 0;
    const len = data.length;
    data = data.sort((a, b) => (a > b ? 0 : -1));
    median = len % 2 === 0 ? (data[len / 2 - 1] + data[len / 2]) / 2 : data[(len - 1) / 2];
    return median;
};

export const getLostQ = (data: number[]): number => Math.random();

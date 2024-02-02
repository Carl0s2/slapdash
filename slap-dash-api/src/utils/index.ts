export function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function checkTime(roundStart: Date, timeLimit: number) {
    // add a little buffer incase operations are slow for whatever reason
    const LATENCY_BUFFER = 2;
    const difference = (roundStart.getTime() - new Date().getTime()) / 1000;
    return difference < timeLimit + LATENCY_BUFFER;
}
  
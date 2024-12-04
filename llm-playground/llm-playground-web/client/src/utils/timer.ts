class Timer {
    duration: number = 10000;
    callBack?: () => void;
    #timeoutID: NodeJS.Timeout | undefined;

    constructor(duration: number, cb?: () => void) {
        this.duration = duration;
        this.callBack = cb;
    }

    start() {
        if (typeof this.#timeoutID === 'number') {
            this.cancel();
        }

        this.#timeoutID = setTimeout(() => {
            this.callBack?.();
        }, this.duration);
    }

    cancel() {
        clearTimeout(this.#timeoutID);
    }
}

export default Timer;

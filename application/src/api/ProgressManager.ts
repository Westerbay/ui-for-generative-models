export class ProgressManager {

    private value: number;
    private max: number;

    constructor(max: number = 100, initialValue: number = 0) {
        this.max = max > 0 ? max : 1;
        this.value = this.clamp(initialValue);
    }

    getValue() {
        return this.value;
    }

    getMax() {
        return this.max;
    }

    getPercentage(): number {
        return Math.round((this.value / this.max) * 100);
    }

    getPercentageFloat(): number {
        const percentage = (this.value / this.max) * 100;
        return parseFloat(percentage.toFixed(2));
    }

    setMax(max: number) {
        this.max = max;
    }

    setValue(value: number) {
        this.value = this.clamp(value);
    }

    increment(step: number = 1) {
        this.setValue(this.value + step);
    }

    reset() {
        this.value = 0;
    }

    private clamp(v: number) {
        return Math.min(this.max, Math.max(0, v));
    }

}
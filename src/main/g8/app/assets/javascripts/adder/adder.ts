import {ko} from "./knockout_loader.js"

export default class Adder {

    addend1: KnockoutObservable<string>;
    addend2: KnockoutObservable<string>;
    sum: KnockoutObservable<number>;

    constructor() {
        this.addend1 = ko.observable("0");
        this.addend2 = ko.observable("0");
        this.sum = ko.computed<number>(() => { return this.updateSum(); });
    }

    updateSum(): number {
        return parseInt(this.addend1()) + parseInt(this.addend2());
    }
}
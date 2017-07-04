import {ko} from "./knockout.js"

export default class SomeViewModel {

    name: KnockoutObservable<string>;
    field1: KnockoutObservable<string>;
    field2: KnockoutObservable<string>;
    field3: KnockoutObservable<string>;

    constructor() {
        this.name = ko.observable("");
        this.field1 = ko.observable("");
        this.field2 = ko.observable("");
        this.field3 = ko.observable("");

        this.name.subscribe(() => this.updateFields());
    }

    updateFields() {
        this.field1("Hello");
        this.field2(this.name());
        this.field3("!!!");
    }
}
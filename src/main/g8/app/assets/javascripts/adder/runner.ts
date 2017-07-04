import {ko} from "./knockout.js"
import Adder from "./adder.js";

let adder = new Adder();
ko.applyBindings(adder);
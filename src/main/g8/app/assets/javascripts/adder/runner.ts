import {ko} from "./knockout_loader.js";
import Adder from "./adder.js";

let adder = new Adder();
ko.applyBindings(adder);
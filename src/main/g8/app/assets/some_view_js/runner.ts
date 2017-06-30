import {ko} from "./knockout.js"
import SomeViewModel from "./some_view_model.js";

let someViewModel = new SomeViewModel();
ko.applyBindings(someViewModel);
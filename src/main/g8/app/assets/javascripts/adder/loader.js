var map = {
    'knockout': jsRoutes.controllers.Assets.versioned("lib/knockout/knockout.js").url,
    'knockout-pre-rendered': "https://cdnjs.cloudflare.com/ajax/libs/knockout-pre-rendered/0.9.1/knockout-pre-rendered.js"
};

SystemJS.config({
    map : map
});

SystemJS.import(jsRoutes.controllers.Assets.versioned("javascripts/adder/runner.js").url);
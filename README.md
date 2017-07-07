## Example of (template for) integrating Play Framework, TypeScript 2, Knockout.js, and Mocha for testing.

### Nota Bene

- I built this template for myself. 
The build may not be appropriate for your project. 
You should go through all of the code after expanding the template. 
There isn't much of it.

- I was very new to TypeScript when I built this. My JavaScript was not particularly up to date when I built this. 
The way I've integrated the tools could be horrendous to someone who knows both well.

- It could be that there are existing SBT plugins I was not aware of which would make the integration better.

- If there aren't existing SBT plugins, 
I'm positive the integration of all the tools could be made much nicer with SBT work. 
However, I think it would take a fair amount of work for which I do not have time. 
More than likely that work belongs in the 
[sbt-typescript plugin](https://github.com/joost-de-vries/sbt-typescript) which is used by this template.

- For the remainder of this document I'm going to use the name TypeScript only.
 Unless otherwise noted, 
 the reader should recognize I'm writing about the JavaScript produced by the TypeScript compiler.
 

### What you need.

- A relatively recent version of SBT. The 0.13.x series or above should be fine.
- TypeScript 2.0 or above.
- Node/NPM. I built this using Node 7.2.1 and NPM 3.10.10. I don't know how far back you can go with either.
 
### Getting Started
 
Create a new project based on the template.
 
 ```bash
 sbt new ereichert/ptkm.g8
 ```
 
Enter values for the few parameters, if you chose, and you should have a nearly functioning Play application ready to run.

### Run Play Run.

Well, not quite.

#### Background

##### Webjars

To make the integration a little more confusing I chose to use webjars for my JavaScript dependencies.

In build.sbt you will find 

```
"org.webjars" %% "webjars-play" % "2.5.0",
"org.webjars" % "knockout" % "3.4.1",
"org.webjars.npm" % "systemjs" % "0.19.40"
```

If you're not familiar with webjars, you should make yourself so.

***There's a twist however. The JavaScript dependencies added via webjars are not available when you try to run the 
TypeScript tests. More on that in a paragraph or two.***

##### Compiling and packaging the TypeScript.

[Joost de Vries](https://twitter.com/jouke) is the hero of this story. 
if you wind up using this template you should thank him for his work on his  
[sbt-typescript plugin](https://github.com/joost-de-vries/sbt-typescript).

sbt-typescript, installed via project/plugins.sbt, handles TypeScript compilation and packaging the artifacts for 
deployment. As long as you put your TypeScript files in the app/assets folder, 
the plugin will automatically detect changes and recompile. 

***sbt-typescript does not handle TypeScript testing. 
It seems like that would be a great feature to add to the plugin.***

##### TypeScript type definitions.

Now, if you're interested in this template you are probably aware that 
TypeScript is a typed language living in the untyped world of JavaScript.
 
In order to make TypeScript happy about the types presented by JavaScript libraries, you must make type definition files
 available for each JavaScript library you wish to use in TypeScript 
 (this is not strictly true but I tried to stick to the TypeScript defaults and the main feature of TypeScript, typing).
 
 sbt-typescript, the plugin, is capable of finding the type definition files managed via node modules. 
 That is, if you install @types/some_javascript_lib using npm (`npm install --save-dev @types/some_javascript_lib`)
   the type definitions will be available to TypeScript because the sbt-typescript plugin searches 
   node_module folders.
   
### Run Play Run: For real this time.
   
With that, you have enough information to run the project. 

Because I've already configured the template with the correct dependencies, 
including the JavaScript type definitions, you can run `npm install` at the root of the project which will read 
the package.json file and install the JavaScript dependencies.
 
Now the project is configured to be used like a typical Play project.

```bash
sbt run
```

will spin up the server and make the application available at our familiar http://localhost:9000.

##### Running the TypeScript tests.

To be clear, the Scala tests are not affected by any of the TypeScript integration. 
One still runs `sbt test` or `sbt it:test`. We cannot however run the TypeScript tests using SBT.
 
For the TypeScript tests we have to use NPM just as we would were we working on a pure JavaScript or 
TypeScript project (a project without Play).

And this brings us to the major friction point of this solution. 

The webjar dependencies declared in build.scala? They aren't available in Node.js. 
If you try to run the tests, you'll be served TypeScript compilation errors and/or missing JavaScript library errors.
 
We have to install the JavaScript dependencies as Node.js modules just like we did the JavaScript type definitions. 
Which means we have to repeat ourselves a little. 
In fact, based on some work I've done outside this template, you'll have to install all the dependencies added via 
    webjars, as Node.js dependencies.

As before, I've already added the Node.js dependencies to this project and, assuming you've run `npm install`, 
they should be available to the tests.

The test script is written in the scripts section of the package.json file. 
The following command will compile and run the TypeScript tests.

```base
npm test
```

The scripts section of the package.json file is important and enlightening.

```json
"scripts": {
    "test": "tsc -p test/javascripts/tsconfig.json && mocha test/javascripts/target/test/**/*_unit_spec.js",
    "clean": "rm -rf test/javascripts/target"
},
```

The "test" script runs the compilation of the TypeScript code and then runs the tests. You should notice a few things.

The TypeScript compilation of the tests uses a different tsconfig.json file than the TypeScript compilation of the 
    production code.
    
Reading the test/tsconfig.json file however, 
you'll find that the test tsconfig file inherits from the root tsconfig file. 
Most of the compilation settings used for production are fine for the tests as well. There are two I found I wanted
 to change.
    
1. The production compilation will produce JavaScript wrapped in the System.js loader which is a little 
        overkill for the tests and makes them more difficult to run. 
        
2. I do not want the tests being packaged for deployment to production. Therefore I changed the location at which
    the compilation artifacts will be written. 
    It seemed appropriate to put them in the same place as the Scala tests.
    

##### CSP and loader.js

One last note that is somewhat tangential to the purpose of this template.

I'm trying to work with CSP. 
If you're not familiar with CSP you should take some time to understand it since it seems it's going to stick around
    a bit, at least in the Play Framework.
    
As a result, code that used to be loaded by JavaScript in the HTML is now more easily loaded through downloaded scripts.
 Hence the existence of loader.js.


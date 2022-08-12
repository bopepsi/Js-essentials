// -------------------------Section 2-------------------------
console.log('------------------Section 2------------------')
/* Execution context is created by javascript engine
at global level 
Global Object(window) === this      */
// a and f are attached to global object(window)
var hello = 'hello world';
var f = () => { };

/* Execution context is created in two phases
1. Creation phase. Global object, this, outter enviroment.
   Setup memory space for Varibles and Functions 'Hoisting'.
   All var in JS are initially set to undefined. 
   Functions are siting in memory entirely.
2. Execution phase. Runs your code.     */

/* undefined is a special value in javascript.*/

/* Js ===> Single Threaded, Sync Execution.
Single Threaded: One command at a time.
Sync Execution: One at a time, in order.
Every function excution creates a new execution context, which runs through create phase and run the code line by line, then pop off the stack.     

Event Queue =========> Execution Stack      
event queue won't be executed until the execution stack is emoty        */


// You are not allowed to use c before that line of code is ran
// Not like using var you get undefined, you will get an error here if you try to access c
let c = true;

// -------------------------Section 3-------------------------
console.log('------------------Section 3------------------')
/* Coercion: convert a value from one type to another       
   Avoid Coercion by using '==='        */
console.log(3 < 2 < 1);
Number(undefined); // NaN
Number(null);      // 0
false == 0;        // true
console.log(false == 0);    // true
console.log(null == 0);     // false
console.log('' == 0);       // true
console.log('' == false);   // true
// 3<2 is false, false is 0, 0<1, it returns true.

/* Exsistence and Booleans      */
console.log(Boolean(undefined));    // false
console.log(Boolean(null));         // false
console.log(Boolean(''));           //false
console.log(Boolean(0));            // false
function name(input = 'name') {
    console.log('You are ' + input);
};
window.name = window.name || 'name';
// Check global Object, if name prop exisit, if not asign a new value

// -------------------------Section 4-------------------------
console.log('------------------Section 4------------------');
/* Functions are Objects
Objects are collection of key value pairs,
values for a key could be another set of key value pairs(Object)   */

var section4 = new Object();
section4['content'] = 'func and obj';       // computed member access
section4.number = 4;                        // member access

/* Function: A special type of Object,
It has all the features of Object, and have some special props.
Special props: Name, optional, can be anonymous
             : Code, invocable()
Function Expression: A unit of code that results in a value.
                     It doesn't have to save a variable.
Function Statement: A Statement that you declare the function.  */
// Function Expression
var s4a = 3;
var s4b = { greeting: 'hi' };
1 + 2;
// Creating a obj on the fly and setting it equal to a variable
var se4Greet = function () {
    console.log('Greeting from section 4')
}
// Pass a obj created on the fly
function log(a) { a() };
log(function () { console.log('Greeting again') });

/* By value (primitives data type)
   By reference (all objects (inluding functions))       */

let objC = {
    name: 'objC',

    call: function () {
        console.log(this);
        // No problem with 'this' when using ()=>{}
        const deeper = () => {
            const evenDeeper = () => console.log(this);
            evenDeeper();
        };
        deeper();
    }
}
objC.call();

/* 'arguments' and SPREAD
Arguments contains a list of all values, parameters that you pass to a function.        */
function greetArgs(firstName, LastName, Lang, ...other) {
    if (arguments.length === 0) console.log('No args given');
    else console.log(arguments);
    // arguments: an array like of all values passed in.
};
greetArgs('Bowen', 'J', 'cn');
greetArgs();
function greetSpread(...args) {
    if (arguments.length === 0) console.log('No args given');
    else console.log(arguments);
    // arguments: an array like of all values passed in.
};
greetSpread('no', 'constrains', 'of', 'number', 'of', 'args');


/* Function overloading
   Not exist in JS, since function are objects, cannot be overwritten       */


/* Immediately Invoked Functions Expressions (IIFEs)
    A function expression wrapped in (), so that JS engine understand that this is created on the fly, not a function statement. We also run it on the fly.
    Creating a function and run it all at the same time.    */

let greeting = 'Global';
(nickname => {
    let greeting = 'IIFE: Yo';
    console.log(greeting + ' ' + nickname);
})('Stan');

console.log(greeting)

/* IIFEs and safe code: Any vars declared in it is not touching the global enviroment.  */

/* Function factories
    A function that returns or make other thing for us. 
    Every time you call a function, it gets it own execution context, and any functions created inside it will point to that execution context. 
    Very useful, we don't need to pass in the same parameters, we can just create some new functions that have some parameter by default, by using closures.  */

function makeGreetings(lang) {
    // lang would be in a closure of return function's outter context
    return function (firstName, LastName) {
        if (lang === 'en') console.log('Hi ' + firstName + ' ' + LastName);
        if (lang === 'es') console.log('Hola ' + firstName + ' ' + LastName);
    }
}
/* Passing language to outter function, then return inner function.
    The lang with be trapped or collected in the closure.   */

/* makeGreetings executes 'en' as lang, and return a function, that functions outter reference will point to what the language was when makeGreetings was excuted here, then it ends. So the function returned is still pointing to 'en'    */

var greetEnglish = makeGreetings('en');
/* greetEnglish is a function object whose closure points to language being 'es'.   */
var greetSpanish = makeGreetings('es');
/* greetSpanish is a different function object whose closure points to a different excution context for the same function, that lang it 'es'.   */
/* Even thought its the same function, every time we excute it, it creates a new execution context, in a new memory space.  */
greetEnglish();
greetSpanish();

/* Closures and Callbacks
    Functions that do something after you run another function (giving it to another function and having it executed when it's done) is called callback functions.  */
var tellWhenDone = callback => {
    var a = 1000; // some work
    var b = 3000; // some work
    callback();
}
tellWhenDone(() => console.log('I am done!'));
tellWhenDone(() => console.log('All done!'));

let sayHiLater = () => {
    let greeting = 'Hi from sayHiLater';
    setTimeout(() => {
        console.log(greeting);
    }, 3000);
};
// sayHiLater();

/* After sayHiLater finishes, in 3000ms, setTimeout drops an event, the function inside runs. But 'greeting' doesn't exisiting inside this function and sayHiLater already finished running. So what happens? Exactly like what we saw before. It goes up the scope chain and it has a closure for this varible.    */

/* call(), apply(), and bind()
    Function: A special type of Object,
    It has all the features of Object, and have some special props.
    Special props: Name, optional, can be anonymous
                 : Code, invocable()
    All functions also have access to some special functions, methods on their own.
    call()
    apply()
    bind()

*/
var person = {
    firstName: 'Person ',
    lastName: 'Object',
    getFullName: function () {
        var fullName = this.firstName + this.lastName;
        return fullName;
    }
}

// bind()
var logName = function () {
    console.log('Logged: ' + this.getFullName());
    // We need a way to control where this. keyword points to in current execution context.
}.bind(person);
/* logName now points to a copy of this function obj that was created on the fly, bound with 'person' variable. So this.getFullName() ==> person.getFullName()  */
var logPersonName = logName.bind(person);
/* We are not running logNmae here, but use the function like an Object, and call a method of that object. bind() => Pass to it whatever object we want to be the this variable when the function runs. 
The bind() method returns a new function, it actually makes a copy of this logName function. And sets up this new function object with passed in object. So whenever logName runs, its execution context is created, JS engine sees that its created with bind() which sets up some hidden thing in the background.  */

// call()
var logNameV2 = function (f, l) {
    console.log('Logged: ', this.getFullName());
    console.log(f, ' ', l);
};
/* call() invokes the function, we call decide what this. keyword would be by passing it in as the first parameter.
    Unlike .bind(), which creates a copy of the function.
    .call() actually executes it, then decide what this variable should be, and the rest is that the parameters we would pass to the function.
*/
logNameV2.call(person, 'Token', 'Black');

/* apply() does the same thing as call(), but it takes the parameters as an array.  
Array can be more useful
*/
logNameV2.apply(person, ['Butters', 'Butt']);
/* Or create function and pass in this. on the fly. */
(function (f, l) {
    console.log('Logged: ', this.getFullName());
    console.log(f, ' ', l);
}).apply(person, ['This', 'New']);

// Function borrowing
var person2 = {
    firstName: 'Another ',
    lastName: 'Person',
};
console.log(person.getFullName.apply(person2));
/* Setting this. keyword in getFullName from person to this. from person2.  
We use the function in person here with person2 by apply(person2) to it.    */

// Function currying
/* Creating a copy of a function but with some preset parameters. Very useful in math situations.
    In particular have something to do with bind(), with bind() we are creating a new copy of the function. So what happens if we pass parameters to it.     */
var mutiply = (a, b) => a * b;
var mutiplyByTwo = mutiply.bind(null, 2);
var mutiplyByThree = mutiply.bind(null, 3);
console.log(mutiplyByTwo(80));
console.log(mutiplyByThree(80));
/* We don't care what this. keyword is, so we pass null or this.
What does giving it a prameter do?
Giving parameters sets the permanent values of the origin function when the copy is made.
var a will always be 2.     */

// Functional Programming
/* We think and code in terms of functions.
*/
const mapForEach = (arr, fn) => {
    let newArr = [];
    arr.forEach(element => {
        newArr.push(fn(element));
    });
    return newArr;
};
let arr1 = mapForEach([1, 2, 3, 4], (ele) => ele * 2)
console.log(arr1);
/* Check if item passes the limit. Preset limit value with bind().   */
const checkPastLimit = (limit, item) => item > limit;
let arr2 = mapForEach([1, 2, 3, 4, 5], checkPastLimit.bind(null, 2));
console.log(arr2);

/* Take a vlue as limitor, return a function with it's first para preset which we actually use .   */
var checkPastLimitSimplified = limitor => {
    return ((limit, item) => {
        return item > limit;
    }).bind(null, limitor);
    /* same as checkPastLimit.bind(null, 2). 
    This function is being executed, just created a function object.    */
}
let arr3 = mapForEach([1, 2, 3, 4, 5], checkPastLimitSimplified(3));
console.log(arr3);

// -------------------------Section 5-------------------------
console.log('------------------Section 5------------------');
//todo Object-Oriented Js and Prototypal inheritance
/* Classical vs Prototypal Inheritance
    Inhertance: One object get access to the properties and methods of another object.
    Classical Inheritance: In C, Java, the way that's been done for a ling time. But very verbose.
    Prototypal inheritance: Much simple, flexiable, extensible and easy to understand.
*/

//? Understanding the Prototype
/* All Objects in JS (including functions) have a prototype property ==> proto:{}.
    proto is simply a reference to another Object, we call it proto, It's an object stands on its own, we could use it by itself if we wanted to.
    Prototype-chain: where we have access to a prop or method among a sequence of data.
    Objects can share all the same proto if they want to.
*/

//? Reflection
/* An Object can look at itself, listing and changing its properties and methods.
*/
var person = {
    firstName: 'Default',
    lastName: 'Default',
    getFullName: function () {
        return this.firstName + ' ' + this.lastName;
    }
};

var john = {
    firstName: 'John',
    lastName: 'Wick',
};

//! Don't do this ever, only for demo
john.__proto__ = person;
console.log(john.getFullName());
// This for in actually grabbed all the prop and method not just on the object, but also on the object's prototype.
for (let prop in john) {
    if (john.hasOwnProperty(prop))
        // Only log john's own prop, not including proto
        console.log(prop, ': ', john[prop]);
}

// -------------------------Section 6-------------------------
console.log('------------------Section 6------------------');
//todo Building Objects
//? Function constructors
// A normal fuction that used to construct objects
// The 'this' variable points a new empty object, and that object us returned from the function automatically
//! Do not forget 'new' keyword
//? Function constructors and .prototype

function PersonV1() {
    this.firstName = 'Joey';
    this.lastName = 'Doe';
};
function PersonV2(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
};

PersonV2.prototype.getFullName = function () { return this.firstName + ' ' + this.lastName };

//* An empty object is created with new keyword if no return inside the function.
//* Then it calls the function and 'this' is pointing to that new empty object created by 'new'.
var bob = new PersonV2('Bob', 'Cry');
console.log(bob.getFullName());

//* Better to put method on the prototype, save more memory space, do not have to create for every single object created using the function constructor.
//* Because there is only one prototype for all these objects.
//* The prototype is already set for me, just add properties and methods to the prototype in order to give all of my objects that I create with this function access to those props and mehods
PersonV2.prototype.getHobby = function () { return 'Gundam' };

//? Build-in Function constrctors
var n = new Number(618);
var d = new Date('3/17/1994');
// Add methods to buuld in function constructors also works
String.prototype.isLengthGreaterThan = function (limit) {
    return this.length > limit;
};
console.log('john'.isLengthGreaterThan(3));
//! new Number(3) is an object !== 3
//* By using build-in function constructors for creating perimitives, you aren't really creating primitives. And strange things can happe during comparison with operators and coercion.
var aa = 3;
var bb = new Number(3);
aa == bb;  // true
aa === bb; // false
//! Do not use for...in... with Array
Array.prototype.myOwn = 'Cool';
var arrarr = ['J', 'K', 'C'];
for (let prop in arrarr) {
    console.log(prop, ':', arrarr[prop]);
};

//? Object.create and Pure Prototypal Inheritance
// Simply make objects and then create new objects from them pointing to other objects as their prototype. If you want to define a new object, you create a new object that becomes the basis for all others. And then you simply override, hide props and methods on those created objects by setting the values of those props and methods on the new objects themselves.
//* It opens up a freer approach to constructing objects. And you are not unnecessarily creating complex layers and interactions.
//* Very straightforward, powerful, and you can mutate the prototype along the way.

//? Polyfill
// Code that adds a feature which the engine may lack.
// We can have some code that checks to see if the engine has a feature, and if it doesn't, we write some code that does the same thing that the feature would do in the newer brosers.
if (!Object.create) {
    Object.create = function (o) {
        if (arguments.length > 1) {
            throw new Error('Only accepts the first parameter.')
        }
        function F() { };
        F.prototype = o;
        return new F();
    }
};

var ren = {
    firstName: 'Unknown',
    lastName: 'Unknown',
    greet: function () {
        return 'Hi ' + this.firstName;
    },
};
//* Object.create creates an empty object with its prototype pointing at whatever you passed into Object.create.
var mandy = Object.create(ren);
//* pure prototypal inheritance. Can overwrite prop or method in its proto chain by directly adding props or methods on the object. 
mandy.firstName = 'Mandy';
console.log(mandy);

//? ES6 and Classes



/*
! basics 1
- data types
- variables and identifiers
- double quote "" vs template literals `` [ES6] and + concatenation
- arithmetic operators: + - * / ** % ++(increment) --(decrement)
- + unary plus , - unary negation , Number() convert to number
- type coercion 
- assignment operator = (+= -= /=)
- numbers types
- number methods: toString(), toFixed(), parseInt(), parseFloat(), isInteger(), isFloat(), isNan()
- Math obj methods: round(),ceil(), floor(), min(), max(), pow(), random(), trunc() [ES6]
- string methods: 
access with index[]/chart(), length, trim(), toUppercase(), toLowercase() 
indexOf(), lastindexOf(), slice(), repeat(), split()
substring(), substr() | includes(), startswith(), endswith()
part 2:
- comparison operators ( ==, ===, <=, >=, !=, !==, )
- logical operators (! not, && and, || or)
- if statement and nested conditions 
- conditional (ternary) operator: condition ? if true : if false
- nullish coalescing operator & logical or
- switch statements

! basics 2
* arrays
- create array ([], or new array), access array (index), set array elements (= assigning an element or an array inside)
- array.length, count = length - 1
- adding/removing methods: unshift(), push(), pop(), shift()
- searching methods: indexOf(), lastIndexOf(), includes()
- sorting array methods: sort(), sort().reverse()
- slicing methods: slice(), splice()
- joining methods: concat(), join(), split()
* loops
- for loop , loop on sequence, nested loop
- loop control: break, continue, label
- while loop
- do while loop
- for (character in iterable) loop
- for (key in obj) loop



! functions
- creation, call, params arguments, return
- default param and rest params (..params)
- anonymous function 
- nested function
- arrow function
- scope and local scope, if switch for scope
* high order functions
- Map => map(callBackFunction(Element, Index, Array) { }, thisArg)
a ho func and an arr method, it iterates over each item and transform each element based on the condition
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(x => x * x);        squaredNumbers is now [1, 4, 9, 16, 25]

- filter: creates a new array, and add the item that passes the condition
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(x => x % 2 === 0); even numbers are 4 and 2

let friends = ["Ahmed", "said", "Smell", "fall", "stacey", "albert"];
let aFr = friends.filter((el) => el.startsWith("A"));

- reduce: reduce an array to a single value
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, current) => acc + current, 0);          sum is now 15

const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0); // 15

console.log(sum);

- forEach: iterates over an array and execute a provided function for each element
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(x => console.log(x));

! object
- creating with object literal {}, access with dot or bracket notation
- nested object
- new Object() creation
- Object.create({}) constructor creation
- create with assign method Object.assign({})
- this keyword

! dom
- dom selectors (getElement, querySelector)
- setting elements (textContent, innerHtml, document.images[0].alt = "alternate" )
getAttribute => var elementId = myElement.getAttribute('id');
setAttribute => myElement.setAttribute('class', 'navbar')
- check attributes
( Element.attributes, Element.hasAttribute, Element.hasAttributes, Element.removeAttribute )
- createElement
createElement (img, div..), createAttribute (title, class..), createTextNode (a text), createComment (comment), appendChild(add ele or content to an element)
- children 
element.children[0], childrenNodes(even comment and text), firstChild, lastChild, firstElementChild, lastElementChild
- dom events
events on html / on js (onClick, addEventListener)
- classlist
classlist.item("0"), classlist.contains("nav"), classlist.add("") .remove(""), .toggle("")
- css styling
elem.style.color = "red", style.removeProperty("color"), style.setProperty("font-size", "40px", "important")
- deal with elements
before (outside the element), after (outside the element), append (inside the element), prepend (inside the element), remove
- dom traversing
nextSibling, previousSibling, nextElementSibling, previousElementSibling, parentElement
- dom cloning



- target vs this in event
! bom
- window, history, location...etc
window.alert, prompt, confirm ...etc
setTimeOut, clearTimeOut / setInterval, clearInterval
- window.open, close, 
- history.back, forward, go
- window.print, stop, focus, scrollTo, scrollBy, scroll
- local and session storage
* destructuring
- destructuring arrays
- destructuring objects
- destructuring objects inside functions

! advanced
* advanced array methods
- array.from()
- array.copyWithin()
- array.some()
- array.every()
- spread operator 
spread string, concatenate two arrays inside a new one , copy an array, push an array values in another array
* date&time
- new Date()
- date and time methods: getTime(), getDate(), getFullYear(), getMonth(), getDay(), getHours(), getMinutes(), getSeconds()
- control time methods: 
- formats
- delegate Generator
- modules
! async
- promises, fetch, axios, async/await, try catch finally
*/ 


/*
! oop

*/ 
// primitive types in TypeScript

// string
let nameofUser: string = "Pranav Dubey";

// number
let age: number = 30;

// boolean
let isActive: boolean = true;

// undefined
let undefinedValue: undefined = undefined;

// null
let nullValue: null = null;

// symbol
let uniqueId: symbol = Symbol("id");
let anotherUniqueId: symbol = Symbol("id");
console.log(uniqueId === anotherUniqueId); // false
// symbols are unique and cannot be compared for equality
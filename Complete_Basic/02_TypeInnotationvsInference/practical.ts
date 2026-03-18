let message = {
    you: "Hello",
    me: "Hi"
}

let id = {
    name: "Pranav",
    number: 1234,
    email: "pranav@example.com"
}

// Type Inference
type badge = {
    name: string,
    number: number,
    email: string
    experince?: number // Optional property
}

// example of type annotation
let badge1: badge = {
    name: "Pranav",
    number: 1234,
    email: "Pranav"
}

// example of type inference
let badge2: badge = {   
    name: "Pranav",
    number: 1234,
    email: "Pranav",
    experince: 5
}

type user = string | number;
let userId: user = "Pranav123"; // Valid
userId = 12345; // Also valid



// Diffrence between type annotation and interfaces
interface User {
    name: string;
    age: number;
}
interface User{
    id: number;
}
// this will work because interfaces can be merged, but type aliases cannot be merged. If we try to do the same with type aliases, it will result in an error.

type UserType = {
    name : string;
    age : number;
}
// type UserType = {
//     id : number;
// }
// This will result in an error because type aliases cannot be merged.




// function Overloading 

function greet(name: string): string;
function greet(name: string, age: number): string;
function greet(name: string, age?: number): string;

function greet(name :string | number, age?: number): string {
    if (age !== undefined) {
        return `Hello, ${name}! You are ${age} years old.`;
    } else {
        return `Hello, ${name}!`;
    }
}

console.log(greet("Pranav"));

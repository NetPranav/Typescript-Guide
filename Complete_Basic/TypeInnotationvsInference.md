# Phase 2: Core Structures

This phase is where TypeScript goes from just checking simple variables to actually shaping the data and logic of your applications. 

## 7. Object Types

In JavaScript, objects hold grouped data. In TypeScript, an **Object Type** strictly defines the "shape" of that object—what exact keys it must have, and what type of data each key holds.

### The Basic Syntax
You define the shape of an object almost exactly like you write a normal JavaScript object, but instead of values, you write types.

```typescript
// We are defining the exact shape this object MUST follow
let drone: { brand: string; model: string; price: number; isInStock: boolean } = {
    brand: "Skyrise FPV",
    model: "Cinewhoop V2",
    price: 15000,
    isInStock: true
};

// ERROR: TypeScript won't let you add properties that aren't defined in the shape
// drone.topSpeed = 120; 

// ERROR: TypeScript won't let you forget a required property
// let brokenDrone: { brand: string; model: string } = { brand: "DJI" }; // Missing 'model'
```

### Optional Properties (`?`)
Sometimes, a piece of data isn't always available. You can make a property optional by adding a question mark `?` right before the colon.

```typescript
let userProfile: { username: string; age?: number } = {
    username: "pranav_dev"
    // 'age' is optional, so TypeScript doesn't complain if we leave it out!
};
```

---

## 8. Type Aliases (`type`)

Writing out `{ brand: string; model: string; ... }` every single time you want to create a drone object is exhausting and messy. 

A **Type Alias** lets you create a custom name for a specific type or shape. Think of it like creating your own custom primitive type.

```typescript
// We define the Type Alias ONCE (Convention is to use PascalCase for custom types)
type Product = {
    name: string;
    price: number;
    category: string;
};

// Now we can reuse 'Product' anywhere!
let item1: Product = { name: "Propellers", price: 500, category: "Parts" };
let item2: Product = { name: "Goggles", price: 25000, category: "Accessories" };

// Type aliases aren't just for objects. They work for basic types too:
type ID = string | number; // An ID can be either a string or a number
let myId: ID = "USER_459";
```

---

## 9. Interfaces (`interface`)

An **Interface** is another way to name an object type. It acts as a strict contract. If an object or a class implements an interface, it *must* follow the exact rules laid out in that contract.

```typescript
// Defining an Interface
interface User {
    id: number;
    name: string;
    email: string;
    isAdmin?: boolean; // Optional
}

// Using the Interface
const newCustomer: User = {
    id: 101,
    name: "Rahul",
    email: "rahul@example.com"
};
```

Interfaces are highly preferred when defining the shape of objects, especially when working with external APIs or building large architectures.

---

## 10. Interfaces vs. Types

At a beginner level, `interface` and `type` do almost the exact same thing when defining objects. You can usually swap one for the other. However, there are subtle technical differences.



### Difference 1: What they can describe
* **`type`** is highly flexible. It can describe objects, primitives, arrays, and complex intersections/unions.
* **`interface`** is strict. It can *only* describe the shape of an object (or a class).

### Difference 2: "Declaration Merging" (The big difference)
* **Interfaces are open.** If you declare the same interface twice, TypeScript will merge them together. This is great for extending third-party libraries.
* **Types are closed.** If you try to declare the same `type` name twice, TypeScript will throw an error.

```typescript
// INTERFACE MERGING (Works perfectly)
interface Car { brand: string; }
interface Car { topSpeed: number; }
// The 'Car' interface now requires BOTH brand and topSpeed.

// TYPE RE-DECLARATION (Throws an Error)
type Bike = { brand: string; };
// type Bike = { topSpeed: number; }; // ERROR: Duplicate identifier 'Bike'.
```

**Rule of Thumb:** Use `interface` until you need a specific feature from `type` (like unions).

---

## 11. Typing Functions

Functions are the engine of your code. Typing them correctly prevents massive runtime bugs. You need to type two things: the **parameters** (what goes in) and the **return value** (what comes out).

### Basic Function Typing
```typescript
// (price: number, tax: number) -> Parameter types
// : number -> Return type
function calculateTotal(price: number, tax: number): number {
    return price + tax;
}
```

### Optional and Default Parameters
Just like objects, function parameters can be optional using `?`. You can also provide default values.

```typescript
// 'greeting' has a default value. 'lastName' is entirely optional.
function greet(firstName: string, lastName?: string, greeting: string = "Hello"): string {
    if (lastName) {
        return `${greeting}, ${firstName} ${lastName}!`;
    }
    return `${greeting}, ${firstName}!`;
}

console.log(greet("Pranav")); // "Hello, Pranav!"
console.log(greet("Pranav", "Sharma", "Welcome")); // "Welcome, Pranav Sharma!"
```

### Typing Arrow Functions
If you are building web apps (like with React or Next.js), you'll write a lot of arrow functions.

```typescript
const multiply = (a: number, b: number): number => {
    return a * b;
};
```

---

## 12. Function Overloading

If you have written C++ before, you know that function overloading allows you to write the same function multiple times with different parameters. 

TypeScript handles overloading a bit differently. Because JavaScript doesn't support overloading, you write **multiple function signatures** (the rules), but only **one actual implementation** (the logic).

### How it works in TypeScript:
1. Write all the different ways the function can be called (the signatures).
2. Write the actual function body, making sure the parameters are flexible enough (`any` or unions) to handle all the signatures.

```typescript
// 1. The Signatures (The rules)
function getSchedule(timestamp: number): string;       // Call with a number
function getSchedule(dateString: string): string;      // Call with a string
function getSchedule(year: number, month: number): string; // Call with two numbers

// 2. The Implementation (The actual logic handling all cases)
function getSchedule(param1: number | string, param2?: number): string {
    if (typeof param1 === "string") {
        return `Schedule for date string: ${param1}`;
    } else if (typeof param1 === "number" && param2 !== undefined) {
        return `Schedule for year ${param1} and month ${param2}`;
    } else {
        return `Schedule for timestamp: ${param1}`;
    }
}

// 3. Usage
getSchedule(1679000000);        // Matches signature 1
getSchedule("2024-10-12");      // Matches signature 2
getSchedule(2024, 10);          // Matches signature 3

// getSchedule(true); // ERROR: No overload matches this call.
```
This ensures your function remains strictly typed from the outside, while handling complex logic on the inside!
```
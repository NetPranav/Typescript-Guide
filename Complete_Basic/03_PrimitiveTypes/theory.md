## 3. The Primitive Types: string, number, boolean, and symbol

Before we build complex structures, we need to understand the basic building blocks. In programming, the simplest forms of data are called **Primitives**. 

TypeScript uses the exact same primitive types as JavaScript, but it forces you to be strict about how you use them. 

> **⚠️ The Beginner Trap:** Always use lowercase names (`string`, `number`, `boolean`). Never use uppercase (`String`, `Number`, `Boolean`), as those refer to special, heavy JavaScript object wrappers, not the raw, lightweight data itself!

---

### 1. `string` (Text Data)
The `string` type is used for any textual data. You can define a string using single quotes (`'`), double quotes (`"`), or backticks (`` ` ``).

Backticks (Template Literals) are especially powerful because they allow you to inject variables directly into the string without dealing with messy `+` signs.

```typescript
// Basic strings
let firstName: string = "John";
let lastName: string = 'Doe';

// Template Literals (Using backticks)
let greeting: string = `Hello, my name is ${firstName} ${lastName}!`;

console.log(greeting); // Output: "Hello, my name is John Doe!"

// TS Error Example:
// firstName = 100; // ERROR: Type 'number' is not assignable to type 'string'.
```

---

### 2. `number` (Numeric Data)
Unlike some other languages that have different types for whole numbers (`int`) and decimals (`float`), TypeScript keeps it simple. **Everything is just a `number`.**

It supports standard numbers, decimals, negatives, and even hexadecimal or binary values.

```typescript
let age: number = 20;             // Whole number (Integer)
let price: number = 99.99;        // Decimal (Float)
let temperature: number = -15;    // Negative number

// Advanced number types (Rarely used by beginners, but good to know)
let hexColor: number = 0xffffff;  // Hexadecimal
let binaryData: number = 0b1010;  // Binary

// TS Error Example:
// age = "twenty"; // ERROR: Type 'string' is not assignable to type 'number'.
```

---

### 3. `boolean` (True/False)
The `boolean` type is the simplest of them all. It can only ever be one of two values: `true` or `false`. It is heavily used in `if/else` statements, loops, and logic checks.

```typescript
let isLoggedIn: boolean = true;
let hasAdminAccess: boolean = false;

if (isLoggedIn) {
    console.log("Welcome back!");
}

// TS Error Example:
// isLoggedIn = "yes"; // ERROR: Type 'string' is not assignable to type 'boolean'.
// isLoggedIn = 1;     // ERROR: Type 'number' is not assignable to type 'boolean'.
```

---

### 4. `symbol` (Unique Identifiers)
You won't use `symbol` very often as a beginner, but it's important to know it exists. 

A `symbol` is a guaranteed **unique** value. Even if you create two symbols that look exactly the same and have the same description, JavaScript and TypeScript will treat them as completely different under the hood. They are mostly used as unique keys for advanced object properties so they never accidentally overwrite each other.

```typescript
// Creating symbols
let id1: symbol = Symbol("myId");
let id2: symbol = Symbol("myId");

// Even though they have the same description ("myId"), they are NOT equal.
console.log(id1 === id2); // Output: false
```

---

### Summary Checkpoint
* Use **`string`** for text.
* Use **`number`** for any kind of math or numeric value (integers or decimals).
* Use **`boolean`** for `true`/`false` flags.
* Use **`symbol`** when you need a globally unique identifier (rare for beginners).
* **Always use lowercase** for these primitive types!
```
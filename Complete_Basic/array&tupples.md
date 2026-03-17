## 4. Arrays and Tuples

When you are building applications, you rarely work with just a single string or a single number. You usually have lists of data: a list of users, a list of product prices, or a list of configuration settings. 

In TypeScript, there are two main ways to type these collections: **Arrays** and **Tuples**.

> **The Quick Difference:**
> * **Arrays:** You don't know *how many* items are in the list, but you know they are all the *same type* of thing. (Dynamic length, Single type).
> * **Tuples:** You know *exactly how many* items are in the list, and you know the *exact type* of each item at every specific position. (Fixed length, Mixed types).

---

### 1. Arrays (Dynamic Length)

If you have a background in C++, you are used to arrays having a fixed size in memory. In JavaScript and TypeScript, arrays are dynamic—they can grow and shrink as much as you want. TypeScript just cares about **what** you are putting inside them.

There are two ways to write array types in TypeScript, but the first one is the industry standard.

#### Syntax 1: `type[]` (Recommended)
You take the primitive type and slap square brackets `[]` on the end.

```typescript
// An array that can ONLY hold strings. 
// It can have 0 items or 10,000 items, as long as they are strings.
let droneModels: string[] = ["Cinewhoop V2", "Freestyle 5-inch", "Tinywhoop"];

// An array that can ONLY hold numbers.
let productPrices: number[] = [15000, 22000, 5000];

// TypeScript prevents you from mixing data types!
// droneModels.push(99); // ERROR: Argument of type 'number' is not assignable to parameter of type 'string'.
```

#### Syntax 2: `Array<type>` (Generic Syntax)
You will sometimes see this in older codebases or complex utility types. It does the exact same thing, but uses "Generics" (which we will cover in Phase 4).

```typescript
let activeUsers: Array<string> = ["admin_pranav", "guest_01"];
```

---

### 2. Tuples (Fixed Length, Fixed Types)

Tuples are a special TypeScript feature that doesn't actually exist in raw JavaScript. A Tuple is a very strict array where the **order** and **length** are locked in.

You use Tuples when an array represents a single, cohesive record of data, rather than just a random list of items. 

#### Common Use Cases for Tuples:
* A 2D or 3D coordinate: `[X, Y, Z]`
* A database record: `[ID, Username, isActive]`
* A React/Next.js hook return value: `[state, setState]`

#### The Syntax
You define a tuple by putting the exact types inside square brackets, separated by commas.

```typescript
// This tuple MUST have exactly 3 items, in this exact order: string, number, number.
// Perfect for defining motor specs: [Model Name, KV Rating, Cell Count]
let motorSpecs: [string, number, number] = ["Xing 2207", 2750, 4];

// ERROR 1: Order matters! You can't put the numbers first.
// motorSpecs = [2750, 4, "Xing 2207"]; 

// ERROR 2: Length matters! You can't leave out an item.
// motorSpecs = ["Xing 2207", 2750]; 

// ERROR 3: You can't add an extra item.
// motorSpecs = ["Xing 2207", 2750, 4, "Extra Data"]; 
```

#### The Tuple "Gotcha" (Pro Tip)
There is a weird quirk in TypeScript. While TS will stop you from re-assigning a tuple with the wrong length, it **does not** stop you from using the `.push()` method to sneak extra items into it!

```typescript
let coordinate: [number, number] = [23.1793, 75.2843];

// TypeScript ALLOWS this, even though it breaks the fixed length rule!
coordinate.push(100); 

console.log(coordinate); // Output: [23.1793, 75.2843, 100]
```
*Note: This is a known limitation in the TypeScript compiler. Just be aware of it and avoid pushing to tuples!*

---

### Summary Checkpoint
* **Arrays (`string[]`, `number[]`):** Use when you have a list of many items of the *same type*, and the length of the list can change.
* **Tuples (`[string, number, boolean]`):** Use when you have a specific grouping of data where you know exactly *what* is at each index and exactly *how many* items there are.

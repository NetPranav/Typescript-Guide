# Phase 2: Core Structures

This folder covers the foundational ways to shape data and logic in TypeScript. By strictly defining objects, custom aliases, contracts, and functions, we eliminate the unpredictability of standard JavaScript.

---

### [07. Object Types](./07_Object_Types.ts)
**Concept:** Instead of letting objects hold any random data, Object Types define a strict "mold." They dictate exactly what keys must exist, what data types they hold, and which properties are optional or read-only.

**Example:**
```typescript
let droneConfig: { 
    readonly id: string; // Cannot be changed later
    model: string; 
    topSpeed: number; 
    hasGPS?: boolean;    // Optional property
} = {
    id: "DRN-001",
    model: "Cinewhoop V2",
    topSpeed: 120
    // hasGPS is safely left out
};
08. Type Aliases
Concept: Writing out complex object shapes over and over is messy. The type keyword lets you create a reusable custom name (a blueprint) for any type, making your code incredibly clean and easy to read.

Example:

TypeScript
// Defining the blueprint once
type PilotProfile = {
    username: string;
    flightHours: number;
    isActive: boolean;
};

// Reusing it easily
let pilot1: PilotProfile = { username: "pranav_fpv", flightHours: 150, isActive: true };
let pilot2: PilotProfile = { username: "raja_r", flightHours: 45, isActive: false };
09. Interfaces
Concept: Interfaces act as strict contracts, primarily used in Object-Oriented Programming. They define the shape of an object or class. A major superpower of interfaces is that they can extend (inherit) from one another.

Example:

TypeScript
interface BasicComponent {
    brand: string;
    weightGrams: number;
}

// Inherits from BasicComponent and adds new rules
interface Motor extends BasicComponent {
    kvRating: number;
}

const myMotor: Motor = {
    brand: "Xing",
    weightGrams: 34,
    kvRating: 2750
};
10. Interfaces vs. Types
Concept: For 90% of basic objects, they do the exact same thing. However, type is better for Unions and primitive renaming, while interface is better for Object-Oriented classes and automatically merging declarations.

Example (When to use Type):

TypeScript
// ONLY Types can do Unions. Interfaces cannot do this!
type FlightMode = "Acro" | "Angle" | "Horizon"; 
let currentMode: FlightMode = "Acro";
Example (When to use Interface):

TypeScript
interface Flyable { takeoff(): void; }

// Classes can strictly implement interfaces
class Quadcopter implements Flyable {
    takeoff() { console.log("Taking off!"); }
}
11. Typing Functions
Concept: Functions are where bugs thrive. TypeScript locks them down by strictly defining what data is allowed to enter (Parameters) and exactly what data must be returned (Return Type).

Example:

TypeScript
// (price, tax) are locked to numbers. The function MUST return a number.
function calculateTotal(price: number, tax: number = 0.18): number {
    return price + (price * tax);
}

// Arrow function syntax for a function that returns nothing (void)
const logStatus = (message: string): void => {
    console.log(`STATUS: ${message}`);
};
12. Function Overloading
Concept: Sometimes a function needs to be called in multiple different ways (e.g., searching by a Number ID or by a String Email). Overloading lets you write multiple strict "rules" (signatures) that all route into a single underlying logic block.

Example:

TypeScript
// 1. The Rules (Signatures)
function getPart(id: number): string;
function getPart(name: string): string;

// 2. The Implementation (Handles both rules)
function getPart(query: number | string): string {
    if (typeof query === "number") {
        return `Fetching part by ID: ${query}`;
    } else {
        return `Fetching part by Name: ${query}`;
    }
}

getPart(8847);      // Valid: Matches signature 1
getPart("Propeller"); // Valid: Matches signature 2
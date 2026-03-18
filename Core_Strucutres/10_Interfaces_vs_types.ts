// 10-interfaces-vs-types.ts

/**
 * ============================================================================
 * TOPIC 10: INTERFACES vs. TYPES 
 * ============================================================================
 * THE BIG QUESTION: If `interface` and `type` both define the shape of an object,
 * which one should I use?
 * * THE SHORT ANSWER: For 90% of basic object shapes, they are completely identical.
 * You can usually swap them without any errors. However, there are 3 subtle but 
 * crucial differences that dictate when to use which, especially as your 
 * architecture grows.
 */

// ============================================================================
// 1. THE SIMILARITIES (What both can do perfectly fine)
// ============================================================================
// Both can describe objects, both support optional properties (?), and both 
// support readonly.

type TypeDrone = { brand: string; price: number };
interface InterfaceDrone { brand: string; price: number };

// You can use either one to type this object
const myDrones: InterfaceDrone = { brand: "Skyrise FPV", price: 15000 };


// ============================================================================
// DIFFERENCE 1: PRIMITIVES AND UNIONS (Type Wins 🏆)
// ============================================================================
// `type` is highly flexible. It can rename basic data types and combine multiple 
// specific values together (Unions). 
// `interface` CANNOT do this. An interface MUST be an object structure.

// ✅ ONLY Types can do this:
type UserIDs = string | number; // A union type (either string OR number)
type FlightModess = "Acro" | "Angle" | "Horizon"; // Exact literal types
type Coordinates = [number, number, number]; // Tuple (fixed array)

let currentMode: FlightModess = "Acro"; 

// ❌ Interfaces crash if you try to do this:
// interface UserID = string | number; // SYNTAX ERROR
// interface FlightMode = "Acro" | "Angle"; // SYNTAX ERROR


// ============================================================================
// DIFFERENCE 2: DECLARATION MERGING (Interface Wins 🏆)
// ============================================================================
// This is the most critical technical difference.
// * `interface` is OPEN. If you declare the same interface name twice, TypeScript 
//   will automatically merge them into one giant interface.
// * `type` is CLOSED. If you declare the same type name twice, it throws an error.

// --- INTERFACE MERGING (Open) ---
// Let's say you are using a 3rd party library for a Flight Controller.
interface FlightController {
    firmware: string;
}

// Later in your own code, you want to add a custom property to that library's type:
interface FlightController {
    customPID: boolean;
}

// TypeScript merges them! The object now requires BOTH properties.
const myFC: FlightController = {
    firmware: "Betaflight 4.4",
    customPID: true
};

// --- TYPE REDECLARATION (Closed) ---
type MotorSpecs = { kv: number };
// type MotorSpecs = { weight: number }; 
// ^ ERROR: Duplicate identifier 'MotorSpecs'. Types are strictly locked once created.


// ============================================================================
// DIFFERENCE 3: EXTENDING vs. INTERSECTIONS
// ============================================================================
// Both can inherit properties from other types, but the syntax is different.

// --- Interfaces use `extends` (Very clean, Object-Oriented style) ---
interface BaseUser {
    name: string;
}
interface AdminUser extends BaseUser {
    adminLevel: number;
}
const admin1: AdminUser = { name: "Pranav", adminLevel: 5 };

// --- Types use Intersections `&` (Math-like style) ---
type BasePlayer = { name: string };
type ProPlayer = BasePlayer & { sponsor: string };

const player1: ProPlayer = { name: "Raja", sponsor: "RedBull" };


// ============================================================================
// REAL-WORLD SCENARIOS: WHEN TO USE WHICH?
// ============================================================================

/* SCENARIO A: Next.js / React Component Props
   VERDICT: Use `type`
   Why? UI components often need complex unions or specific constraints that 
   interfaces can't handle cleanly. Types are the standard for React props.
*/
type ButtonProps = {
    label: string;
    variant: "primary" | "secondary" | "danger"; // Perfect use of union!
    onClick: () => void;
};


/* SCENARIO B: Writing a Public Library/API (like an NPM package)
   VERDICT: Use `interface`
   Why? Because interfaces auto-merge. If someone downloads your library, 
   they might want to inject their own custom properties into your objects 
   (Declaration Merging). Interfaces allow them to do this easily.
*/
interface StandardResponse {
    statusCode: number;
    payload: any;
}


/* SCENARIO C: Object-Oriented Programming (Classes)
   VERDICT: Use `interface`
   Why? If you are writing classes (like in C++ or Java), `interface` is the 
   industry standard way to enforce contracts on those classes using `implements`.
*/
interface Renderable {
    renderToScreen(): void;
}
class GameEntity implements Renderable {
    renderToScreen() {
        console.log("Drawing entity on screen...");
    }
}


/**
 * FINAL RULE OF THUMB FOR BEGINNERS:
 * 1. Default to `type`. It covers 99% of what you need right now, especially in web dev.
 * 2. Switch to `interface` ONLY when:
 * - You need to use `implements` on a Class.
 * - You need Declaration Merging (extending 3rd party library types).
 */
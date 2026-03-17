## 5. The "Avoid" Types: `any`, `unknown`, and `never` (Expanded with More Examples)

TypeScript is designed to make your code safer by locking down data types. However, there are times when you genuinely don't know what type of data you are dealing with (like fetching data from a third-party API), or you are migrating an old JavaScript codebase to TypeScript. 

For these situations, TypeScript provides three special types. You should use these sparingly, as overusing them defeats the purpose of using TypeScript in the first place!

---

### 1. `any` (The Escape Hatch)
The `any` type is exactly what it sounds like: it allows a variable to be *anything*. 

When you assign `any` to a variable, you are telling the TypeScript compiler: **"Stop checking this variable. I know what I'm doing, leave me alone."** It completely disables all type checking for that specific value, turning it back into wild, unpredictable JavaScript.

> **⚠️ Warning:** Avoid `any` at all costs. It is the number one cause of runtime crashes in TypeScript applications.

#### Example 1: The Silent Killer
Because `any` turns off the compiler, TypeScript won't warn you if you do something completely illogical.

```typescript
let mysteryBox: any = "Hello, World!";

// TypeScript allows ALL of the following without complaining:
mysteryBox = 100;           // Reassigning a string to a number? Sure.
mysteryBox = true;          // Reassigning to a boolean? Why not.

// THE DANGER: 
// A boolean doesn't have a `.map()` method (that's for arrays).
// TypeScript allows this, but it will CRASH your app when you actually run it!
mysteryBox.map((item) => console.log(item)); 
```

#### Example 2: The API Trap
When you fetch data from an API or use `JSON.parse()`, TypeScript doesn't know what the data looks like, so it often defaults to `any`.

```typescript
// Pretend we fetched this from a database
const userData: any = JSON.parse('{"name": "Pranav", "age": 20}');

// TypeScript won't stop you from guessing the wrong property names
console.log(userData.firstName); // Undefined (the key is 'name', not 'firstName')
console.log(userData.age.toUpperCase()); // CRASH! You can't uppercase a number.
```

---

### 2. `unknown` (The Safer Alternative to `any`)
`unknown` was introduced as a strict, safe replacement for `any`. 

Like `any`, a variable of type `unknown` can hold any value. However, the key difference is that **TypeScript will not let you use an `unknown` variable until you prove what type it actually is.** We do this using a process called **Type Narrowing**.

#### Example 1: Basic Type Narrowing
You must inspect the "locked package" before using it.

```typescript
let rawSensorData: unknown = "Altitude: 400ft";

// ERROR: Object is of type 'unknown'. 
// TypeScript strictly stops you from blindly using it!
// rawSensorData.toUpperCase(); 

// CORRECT WAY:
if (typeof rawSensorData === "string") {
    // Inside this block, TS knows it's a string 100%.
    console.log(rawSensorData.toUpperCase()); 
} else if (typeof rawSensorData === "number") {
    // Inside this block, TS knows it's a number.
    console.log(rawSensorData.toFixed(2));
}
```

#### Example 2: Validating Unknown Objects
If you receive a complex object that is `unknown` (like a drone configuration file), you have to verify its shape before accessing its properties.

```typescript
let incomingConfig: unknown = { protocol: "CRSF", baudRate: 400000 };

// ERROR: You can't just access .protocol on an unknown type.
// console.log(incomingConfig.protocol); 

// CORRECT WAY: Prove it's an object, not null, and has the property you want
if (
    typeof incomingConfig === "object" && 
    incomingConfig !== null && 
    "protocol" in incomingConfig
) {
    // Now TypeScript allows it!
    console.log("Protocol verified.");
}
```

---

### 3. `never` (Impossible States)
The `never` type is unique. It represents a state or a value that **should never actually happen**. 

You will almost never assign `never` to a variable yourself. Instead, you'll see it used as the return type for functions that *never finish executing* or for catching missing logic in your code.

#### Example 1: Functions that never finish
If a function always crashes or runs an infinite loop, it never actually "returns" a value to the program.

```typescript
// A function that explicitly crashes the application
function triggerCriticalFailure(errorMessage: string): never {
    throw new Error(`CRITICAL SYSTEM FAILURE: ${errorMessage}`);
    // Code stops here. It NEVER reaches the end.
}

// An infinite loop
function keepMotorsSpinning(): never {
    while (true) {
        console.log("Spinning...");
    }
    // The loop never breaks, so the function NEVER returns.
}
```

#### Example 2: The "Exhaustive Switch" (The Pro Move)
This is the most powerful use of `never`. You can use it to force the TypeScript compiler to check if you've handled every single possible scenario in a `switch` statement.

```typescript
// Let's say we have exactly two flight modes
type FlightMode = "ACRO" | "ANGLE";

function handleFlightMode(mode: FlightMode) {
    switch (mode) {
        case "ACRO":
            console.log("Full manual control");
            break;
        case "ANGLE":
            console.log("Self-leveling enabled");
            break;
        default:
            // If 'mode' gets here, it means it wasn't ACRO or ANGLE.
            // By assigning it to a variable of type 'never', we tell TS:
            // "This code should be impossible to reach."
            const _exhaustiveCheck: never = mode;
            return _exhaustiveCheck;
    }
}

// WHY IS THIS USEFUL? 
// Imagine 3 months later, you update the type to: 
// type FlightMode = "ACRO" | "ANGLE" | "TURTLE_MODE";
// 
// If you forget to add a new 'case "TURTLE_MODE":' to your switch statement,
// TypeScript will throw a massive error on the '_exhaustiveCheck' line 
// during compilation, preventing a bug before it ever happens!

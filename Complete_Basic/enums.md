## 6. Enums: Numeric and String Enumerations

When you are building software, you often run into situations where a variable can only be one of a small, specific set of values. For example:
* Days of the week (Monday, Tuesday, etc.)
* User roles on a website (Admin, Editor, Guest)
* Flight modes on a drone (Acro, Angle, Horizon)

You *could* just use standard numbers or strings to represent these, but that leads to typos and "magic numbers" (numbers in your code where nobody remembers what they mean). 

**Enums (short for Enumerations)** solve this. An Enum is a way to group related constants together under one readable, strict type. 

> **Analogy:** Imagine setting up a drone's flight controller. If the manual says "Set mode to 0 for Acro and 1 for Angle," you might easily forget what 0 and 1 mean a month later. An Enum lets you write `FlightMode.Acro` instead. The code becomes self-documenting!

---

### 1. Numeric Enums (The Default)
If you just create an Enum without assigning any values, TypeScript automatically assigns numbers to them, starting from `0` and counting up.

```typescript
// By default: Up is 0, Down is 1, Left is 2, Right is 3
enum Direction {
    Up,
    Down,
    Left,
    Right
}

let droneMovement: Direction = Direction.Up;

// If you log this, it prints the number 0, not the word "Up"
console.log(droneMovement); // Output: 0
```

#### Customizing Numeric Enums
You don't have to start at `0`. You can tell TypeScript exactly where to start, and it will auto-increment from there.

```typescript
// Start at 1 instead of 0
enum HttpResponseCode {
    NotFound = 404,
    InternalError = 500,
    // TypeScript is smart. It knows the next one should be 501!
    NotImplemented 
}

let error: HttpResponseCode = HttpResponseCode.NotImplemented;
console.log(error); // Output: 501
```

---

### 2. String Enums (Highly Recommended for Web Dev)
While numeric enums are fast, they are terrible for debugging. If you `console.log` a numeric enum and get `2`, you have to go dig through your code to remember what `2` stands for.

**String Enums** fix this. You explicitly assign a string value to every member. They don't auto-increment, but they are infinitely easier to read in your terminal or browser console.

```typescript
// A perfect use case for web development (Next.js, React, Django)
enum UserRole {
    Admin = "ADMIN_ROLE",
    Moderator = "MODERATOR_ROLE",
    Guest = "GUEST_ROLE"
}

let currentUser: UserRole = UserRole.Admin;

// This is much easier to debug than a random number!
console.log(currentUser); // Output: "ADMIN_ROLE"

// TypeScript enforces the Enum. You can't just type a random string.
// currentUser = "SUPER_ADMIN"; // ERROR: Type '"SUPER_ADMIN"' is not assignable to type 'UserRole'.
```

---

### 3. Heterogeneous Enums (Avoid These)
Technically, TypeScript allows you to mix strings and numbers in the same Enum. **Don't do this.** It is confusing, bad practice, and almost never necessary.

```typescript
// BAD PRACTICE: Mixing numbers and strings
enum MixedEnum {
    No = 0,
    Yes = "YES",
}
```

---

### 4. Enums vs. Union Types (A Quick Sneak Peek)
In Phase 3, we will learn about **Union Types** (e.g., `type Role = "Admin" | "Guest"`). 

Many modern TypeScript developers actually prefer Union Types over Enums because they write slightly cleaner code in JavaScript after compilation. However, Enums are still incredibly common, especially if you are coming from languages like C++ or Java where Enums are a core part of the language architecture.

**When to use an Enum:** When you have a massive list of constants (like 20 different configuration settings or error codes) and you want them neatly organized in an object-like structure.

---

### Summary Checkpoint
* **Enums** group related constants together to prevent typos and make code readable.
* **Numeric Enums** auto-increment starting from `0` (or a number you choose). Fast, but hard to debug.
* **String Enums** require you to type out the string for every member. Excellent for readability and debugging.
* Access them using dot notation: `EnumName.MemberName`.

# 📘 TypeScript Core Structures Guide

Welcome! This guide is designed for **quick revision + deep clarity** of core TypeScript concepts.

Each section includes:
- 🔹 Short explanation  
- 🔹 Practical example  
- 🔹 Navigation link  

---

## 📂 07 - Object Types

👉 [Go to File](./07_Object_Types.ts)

### 🔹 What are Object Types?
Object types define the **shape of an object** — what properties it must have and their types.

### 🔹 Example
```ts
let user: { name: string; age: number };

user = {
  name: "Pranav",
  age: 20
};
```

### 💡 Tip
Use object types when you want **strict structure without reuse**.

---

## 📂 08 - Type Aliases

👉 [Go to File](./08_Type_Aliases.ts)

### 🔹 What are Type Aliases?
Type aliases let you **create reusable custom types**.

### 🔹 Example
```ts
type User = {
  name: string;
  age: number;
};

let u1: User = {
  name: "Pranav",
  age: 20
};
```

### 💡 Tip
Use `type` when:
- You want unions (`string | number`)
- You want flexibility

---

## 📂 09 - Interfaces

👉 [Go to File](./09_Interfaces.ts)

### 🔹 What are Interfaces?
Interfaces define object structure **like types**, but are more extendable.

### 🔹 Example
```ts
interface User {
  name: string;
  age: number;
}

let u1: User = {
  name: "Pranav",
  age: 20
};
```

### 💡 Tip
Interfaces are best for:
- Large projects
- Extending structures

---

## 📂 10 - Interfaces vs Types

👉 [Go to File](./10_Interfaces_vs_types.ts)

### 🔹 Key Difference

| Feature        | Interface | Type |
|---------------|----------|------|
| Extendable     | ✅ Yes   | ⚠️ Limited |
| Union Support  | ❌ No    | ✅ Yes |
| Reopening      | ✅ Yes   | ❌ No |

### 🔹 Example
```ts
interface A {
  name: string;
}

interface A {
  age: number;
}

// merged automatically
```

```ts
type A = { name: string };
// type A = { age: number }; ❌ Error
```

### 💡 My Opinion
👉 Use:
- `interface` → for objects  
- `type` → for everything else  

---

## 📂 11 - Typing Functions

👉 [Go to File](./11_Typing_functions.ts)

### 🔹 Why Typing Functions?
Ensures:
- Correct parameters
- Correct return type

### 🔹 Example
```ts
function add(a: number, b: number): number {
  return a + b;
}
```

### 🔹 Arrow Function
```ts
const greet = (name: string): string => {
  return "Hello " + name;
};
```

### 💡 Tip
Always define return type in important functions → helps avoid bugs.

---

## 📂 12 - Function Overloading

👉 [Go to File](./12_function_overloading.ts)

### 🔹 What is Function Overloading?
Allows multiple function signatures for **different input types**.

### 🔹 Example
```ts
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;

function combine(a: any, b: any) {
  return a + b;
}
```

### 🔹 Usage
```ts
combine(2, 3);        // number
combine("Hi ", "JS"); // string
```

### 💡 Tip
Use overloading when:
- Behavior depends on input type
- You want better autocomplete

---

# 🚀 Final Thoughts

This repo is designed as a:
- ⚡ Quick revision guide
- 🧠 Concept clarity builder
- 💻 Practical TypeScript reference

### 🧠 Best Way to Use
1. Read explanation  
2. Run the `.ts` file  
3. Modify code yourself  

---

# ⭐ Pro Tip (Important)

Don't just read —  
👉 Break things  
👉 Change types  
👉 See errors  

That’s how TypeScript actually clicks.

---

Happy Coding 🚀
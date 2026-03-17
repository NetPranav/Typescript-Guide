## 1. How TypeScript Works

### What is TypeScript?
To understand TypeScript, you first need to understand a fundamental problem with JavaScript. JavaScript is a highly flexible, dynamic language. It lets you do almost anything, even if it doesn't make logical sense, and it won't complain until you actually run the code and it crashes. 

> **Analogy:** Imagine writing an important letter with a pen. You only find out you misspelled a word after you've mailed it and the recipient gets confused. That's JavaScript. 
> TypeScript is like typing that same letter in Microsoft Word. It puts a red squiggly line under your mistakes *while you are typing*, before you ever hit "send."

At its core, **TypeScript is simply JavaScript with a strict spell-checker for data types.**

---

### TypeScript is a "Superset" of JavaScript
You will hear the word "superset" a lot. What does it actually mean?

It means TypeScript is essentially a wrapper around JavaScript. Every single valid JavaScript code is also valid TypeScript code. TypeScript doesn't change how JavaScript works under the hood; it just adds new features (specifically, **Type Annotations**) on top of it.

* **JavaScript (`.js`):** `let age = 25;`
* **TypeScript (`.ts`):** `let age: number = 25;` *(Notice the `: number`? That's TypeScript adding strict rules).*

---

### The Harsh Truth: Browsers Don't Understand TypeScript
Here is the most important concept for a beginner: **TypeScript does not run in the browser.** Google Chrome, Safari, Firefox, and even Node.js have absolutely no idea how to read a `.ts` file. They only understand plain old `.js`. 

So, how do we use it? We use a process called **Transpilation**.

---

### Transpilation and the TypeScript Compiler (`tsc`)
Because browsers can't read TypeScript, your `.ts` files must be translated into `.js` files before they can run. This translation process is called **transpilation** (compiling from one human-readable language to another).

This heavy lifting is done by the **TypeScript Compiler**, often referred to in your terminal as `tsc`.

**The Step-by-Step Workflow:**

1. **Write:** You write your code in a file named `app.ts`.
2. **Check:** You run the TypeScript compiler (`tsc app.ts`). The compiler acts as a bouncer. It checks your code for any type errors (e.g., did you try to multiply a word by a number?).
3. **Fail or Pass:** * If there are errors, `tsc` yells at you in the terminal and stops.
    * If everything is correct, `tsc` automatically generates a brand new `app.js` file.
4. **Run:** You take that newly created `app.js` file and run it in your browser or Node.js. 

---

### Code Example: Before and After Transpilation
Here is what it looks like in practice. Notice how the TypeScript compiler strips away all the "TypeScript-specific" code to leave behind clean, standard JavaScript.

**What you write in `app.ts`:**
```typescript
// We strictly define that 'name' must be a string and 'age' must be a number
function greetUser(name: string, age: number) {
    console.log("Hello " + name + ", you are " + age + " years old.");
}

// If you try to do greetUser("John", "twenty"), TypeScript will throw an error right here!
greetUser("John", 25);


**This is what a javascript will be :**
```javascript
// Notice how the ': string' and ': number' are completely gone?
// The browser gets this clean, standard JavaScript file to run.
function greetUser(name, age) {
    console.log("Hello " + name + ", you are " + age + " years old.");
}

greetUser("John", 25);
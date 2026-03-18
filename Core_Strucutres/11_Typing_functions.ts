// 11-typing-functions.ts

/**
 * ============================================================================
 * TOPIC 11: TYPING FUNCTIONS   
 * ============================================================================
 * Functions are where bugs usually hide. You pass in the wrong data, or you 
 * expect the wrong data to come out. 
 * * In TypeScript, you strictly lock down two things in every function:
 * 1. The PARAMETERS (What goes in)
 * 2. The RETURN TYPE (What comes out)
 */

// ============================================================================
// 1. THE BASICS: Parameters and Return Types
// ============================================================================
// Syntax: function name(param: type): returnType { ... }

// A standard named function
function calculateTotal(price: number, shipping: number): number {
    return price + shipping;
}

const total = calculateTotal(1500, 50);

// ERROR DEMONSTRATION (TypeScript protects both inputs and outputs):
// calculateTotal(1500, "50"); // ERROR: Argument of type 'string' is not assignable to parameter of type 'number'.
// let myTotal: string = calculateTotal(100, 20); // ERROR: Type 'number' is not assignable to type 'string'.


// ============================================================================
// 2. TYPING ARROW FUNCTIONS (Crucial for React / Next.js)
// ============================================================================
// The syntax is slightly different but follows the exact same logic.
// Syntax: const name = (param: type): returnType => { ... }

const calculateGST = (amount: number): number => {
    return amount * 0.18; // 18% tax
};

// A one-liner arrow function
const getGreeting = (name: string): string => `Hello, ${name}!`;


// ============================================================================
// 3. OPTIONAL PARAMETERS (?)
// ============================================================================
// Just like objects, you can make function parameters optional using `?`.
// IMPORTANT RULE: Optional parameters MUST come at the END of the parameter list.

function logTelemetry(batteryVoltage: number, gpsLock?: boolean): void {
    console.log(`Battery: ${batteryVoltage}V`);
    
    // We must check if gpsLock exists before using it, because it might be undefined!
    if (gpsLock !== undefined) {
        console.log(`GPS Locked: ${gpsLock ? "Yes" : "No"}`);
    } else {
        console.log("GPS data unavailable.");
    }
}

logTelemetry(14.8, true);  // Output includes GPS
logTelemetry(15.2);        // Output says GPS unavailable

// ERROR DEMONSTRATION:
// function badFunction(param1?: string, param2: number) {} 
// ^ ERROR: A required parameter cannot follow an optional parameter.


// ============================================================================
// 4. DEFAULT PARAMETERS (=)
// ============================================================================
// If a parameter has a default value, TypeScript automatically treats it as optional 
// AND infers its type. You don't even need to use `?`.

// 'currency' defaults to "INR" if nothing is provided.
function formatPrice(amount: number, currency: string = "INR"): string {
    return `${currency} ${amount.toFixed(2)}`;
}

console.log(formatPrice(5000));           // Output: "INR 5000.00"
console.log(formatPrice(100, "USD"));     // Output: "USD 100.00"


// ============================================================================
// 5. FUNCTIONS THAT RETURN NOTHING (void) vs (never)
// ============================================================================

// Use 'void' when a function does some work (like logging or updating UI) 
// but does not use the 'return' keyword to send data back.
const printWarning = (message: string): void => {
    console.warn(`[WARNING]: ${message}`);
    // No return statement here
};

// Use 'never' ONLY when a function crashes the app or runs an infinite loop
const crashApp = (errorMsg: string): never => {
    throw new Error(errorMsg);
};


// ============================================================================
// REAL-WORLD SCENARIO: Object Destructuring in Functions
// ============================================================================
/* In web development (especially Next.js/React), you rarely pass 5 separate 
  parameters to a function. Instead, you pass ONE object containing all the data, 
  and "destructure" it. 
  
  Here is how you type a destructured object cleanly using a Type Alias.
*/

// 1. Define the blueprint for the function's arguments
type MotorTestParams = {
    motorId: string;
    targetRPM: number;
    testDurationSeconds?: number; // Optional
};

// 2. Destructure the object directly in the function signature, 
//    and assign the Type Alias right after it.
function runMotorTest({ motorId, targetRPM, testDurationSeconds = 10 }: MotorTestParams): boolean {
    console.log(`Starting test for ${motorId} at ${targetRPM} RPM.`);
    console.log(`Test will run for ${testDurationSeconds} seconds...`);
    
    // Simulate test success
    return true; 
}

// 3. Executing the function with a clean configuration object
const testResult = runMotorTest({
    motorId: "MTR-XING-01",
    targetRPM: 15000
    // testDurationSeconds is omitted, so it defaults to 10
});

console.log(`Test Passed: ${testResult}`);
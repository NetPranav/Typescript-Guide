// ==========================================
// 🚀 TypeScript Special Types Guide
// any vs unknown vs never
// ==========================================



// ==========================================
// 1. ANY (❌ Avoid this)
// ==========================================

// 'any' disables TypeScript checking completely
let mysteryBox: any = "Hello";

// You can assign anything (no safety)
mysteryBox = 100;
mysteryBox = true;

// ❌ TypeScript allows this, but it will crash at runtime
// because boolean doesn't have .map()
mysteryBox.map((item: any) => console.log(item));


// Example: API data problem
const userData: any = JSON.parse('{"name": "Pranav", "age": 20}');

// ❌ No error, but wrong key
console.log(userData.firstName);

// ❌ Runtime crash (age is number, not string)
console.log(userData.age.toUpperCase());


// 👉 Tip:
// Avoid 'any' as much as possible



// ==========================================
// 2. UNKNOWN (✅ Safe alternative)
// ==========================================

// 'unknown' can store anything,
// but you MUST check type before using it
let rawSensorData: unknown = "Altitude: 400ft";

// ❌ Not allowed directly
// rawSensorData.toUpperCase();

// ✅ Type narrowing (safe usage)
if (typeof rawSensorData === "string") {
  console.log(rawSensorData.toUpperCase());
} else if (typeof rawSensorData === "number") {
  console.log(rawSensorData.toFixed(2));
}


// Example: checking object shape
let incomingConfig: unknown = {
  protocol: "CRSF",
  baudRate: 400000
};

// ❌ Not allowed directly
// console.log(incomingConfig.protocol);

// ✅ Safe validation before use
if (
  typeof incomingConfig === "object" &&
  incomingConfig !== null &&
  "protocol" in incomingConfig
) {
  console.log("Protocol verified");
}


// 👉 Tip:
// Always prefer 'unknown' over 'any'



// ==========================================
// 3. NEVER (🧠 Advanced / Impossible states)
// ==========================================

// 'never' means this function will NEVER return

// Example: function that always throws error
function triggerCriticalFailure(msg: string): never {
  throw new Error("CRITICAL: " + msg);
}


// Example: infinite loop (never ends)
function infiniteLoop(): never {
  while (true) {
    console.log("Running...");
  }
}


// ==========================================
// 🔥 PRO USE: Exhaustive Checking
// ==========================================

// Only two possible values
type FlightMode = "ACRO" | "ANGLE";

function handleFlightMode(mode: FlightMode) {
  switch (mode) {
    case "ACRO":
      console.log("Manual control");
      break;

    case "ANGLE":
      console.log("Auto leveling");
      break;

    default:
      // This should NEVER happen
      const check: never = mode;
      return check;
  }
}


// 👉 Why this is powerful:
// If you later add a new type like "TURTLE_MODE",
// TypeScript will force you to handle it here



// ==========================================
// ✅ FINAL NOTES
// ==========================================

// any     → ❌ no safety (avoid)
// unknown → ✅ safe, requires checking
// never   → 🧠 for impossible states

// Use 'unknown' instead of 'any' in most real cases
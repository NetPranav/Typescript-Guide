// ==========================================
// 🚀 TypeScript ENUMS GUIDE
// Numeric vs String Enums
// ==========================================



// ==========================================
// 1. NUMERIC ENUM (Default)
// ==========================================

// TypeScript automatically assigns numbers starting from 0
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

// Using enum
let droneMovement: Direction = Direction.Up;

// ⚠️ Prints number, not name
console.log(droneMovement); // 0


// 👉 Problem:
// Hard to debug because "0" doesn't tell meaning



// ==========================================
// 2. CUSTOM NUMERIC ENUM
// ==========================================

// You can set starting value manually
enum HttpResponseCode {
  NotFound = 404,
  InternalError = 500,
  NotImplemented // auto = 501
}

let errorCode: HttpResponseCode = HttpResponseCode.NotImplemented;

console.log(errorCode); // 501



// ==========================================
// 3. STRING ENUM (✅ Recommended)
// ==========================================

// Each value is explicitly defined
// Much better for debugging
enum UserRole {
  Admin = "ADMIN_ROLE",
  Moderator = "MODERATOR_ROLE",
  Guest = "GUEST_ROLE"
}

let currentUser: UserRole = UserRole.Admin;

// ✅ Clear output
console.log(currentUser); // "ADMIN_ROLE"


// ❌ Not allowed (Type safety)
// currentUser = "SUPER_ADMIN";


// 👉 Why string enums are better:
// You see actual meaning in logs, not numbers



// ==========================================
// 4. HETEROGENEOUS ENUM (❌ Avoid)
// ==========================================

// Mixing number + string → confusing
enum MixedEnum {
  No = 0,
  Yes = "YES"
}

// 👉 Avoid this in real projects



// ==========================================
// 5. PRACTICAL EXAMPLE
// ==========================================

// Real-world: Drone flight modes
enum FlightModes {
  Acro = "ACRO",
  Angle = "ANGLE",
  Horizon = "HORIZON"
}

function setFlightMode(mode: FlightMode) {
  console.log("Mode set to:", mode);
}

setFlightMode(FlightModes.Acro);


// ==========================================
// 6. ENUM vs UNION (Quick idea)
// ==========================================

// Alternative to enum
type Role = "Admin" | "Guest";

let userRole: Role = "Admin";

// 👉 Union types are lighter
// 👉 Enums are better for large structured constants



// ==========================================
// ✅ FINAL NOTES
// ==========================================

// Enum = group of fixed values

// Numeric Enum → auto numbers (fast but unclear)
// String Enum  → readable & better for debugging (recommended)
// Mixed Enum   → ❌ avoid

// Access using:
// EnumName.MemberName
// Example: UserRole.Admin
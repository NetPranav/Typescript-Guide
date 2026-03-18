// 07-object-types.ts

/**
 * ============================================================================
 * TOPIC 7: OBJECT TYPES (Strictly defining the shape of an object)
 * ============================================================================
 * In JavaScript, objects are chaotic; you can add or remove properties anytime.
 * In TypeScript, an "Object Type" creates a strict mold. If an object doesn't 
 * fit the mold perfectly (missing a key, wrong data type), TS throws an error.
 */

// ============================================================================
// 1. BASIC OBJECT TYPES 
// ============================================================================
// You define the shape right after the variable name: `: { key: type }`
// This locks down exactly what properties the object MUST have.

let basicUser: { name: string; age: number; isStudent: boolean } = { 
    name: "Pranav", 
    age: 20, 
    isStudent: true 
};

// Great for hardware specs where every detail matters
let droneSpecs: { brand: string; weight: number; isFPV: boolean } = { 
    brand: "Skyrise FPV", 
    weight: 250, 
    isFPV: true 
};

// Locking down configuration objects so you don't accidentally pass a string as a port
let serverConfig: { port: number; host: string; isSecure: boolean } = { 
    port: 3000, 
    host: "localhost", 
    isSecure: false 
};

let gitCommit: { hash: string; message: string; timestamp: number } = { 
    hash: "a1b2c3d", 
    message: "Initial commit for Next.js app", 
    timestamp: 1678886400 
};

let desktopAppConfig: { windowWidth: number; windowHeight: number; theme: string } = {
    windowWidth: 1920,
    windowHeight: 1080,
    theme: "dark"
};


// ============================================================================
// 2. OPTIONAL PROPERTIES (?)
// ============================================================================
// What if a piece of data isn't always required? Add a `?` right before the colon.
// This tells TypeScript: "This property might be here, or it might be undefined."

// maxFps is optional, because some players just want unlimited frames
let gameSettings: { resolution: string; fullscreen: boolean; maxFps?: number } = { 
    resolution: "1920x1080", 
    fullscreen: true 
};

// A bio or avatar isn't strictly required to create an account
let userProfile: { username: string; bio?: string; avatarUrl?: string } = { 
    username: "pranav_dev", 
    avatarUrl: "/images/profile.png"
};

let paymentIntent: { amount: number; currency: string; discountCode?: string } = { 
    amount: 5000, 
    currency: "INR" 
};

let cssAnimation: { duration: number; delay?: number; easing: string } = {
    duration: 1.5,
    easing: "ease-in-out"
};

// You can safely add optional properties later in the code
paymentIntent.discountCode = "FESTIVAL50";
cssAnimation.delay = 0.5;


// ============================================================================
// 3. READONLY PROPERTIES (readonly)
// ============================================================================
// Use `readonly` when a property is set once and should NEVER change. 
// It prevents accidental overwrites later in your code.

// Database IDs should never be modified once fetched
let dbRecord: { readonly id: string; content: string } = { 
    id: "UUID-1234-ABCD", 
    content: "Stored user preferences" 
};

// Mathematical constants never change
let mathConstants: { readonly PI: number; readonly E: number } = { 
    PI: 3.14159, 
    E: 2.71828 
};

// System paths are usually static, but permissions might update
let linuxSystemFile: { readonly path: string; permissions: string } = {
    path: "/etc/pacman.conf",
    permissions: "rw-r--r--"
};

// Standard properties can be updated normally
dbRecord.content = "Updated preferences";
linuxSystemFile.permissions = "rwxrwxrwx";

// BUT trying to change a readonly property throws an error:
// dbRecord.id = "UUID-9999"; // TypeScript Error: Cannot assign to 'id'


// ============================================================================
// 4. NESTED OBJECT TYPES
// ============================================================================
// Objects can hold other objects. Just nest the curly braces `{}`.
// This is incredibly common when dealing with API responses.

let weatherData: { 
    city: string; 
    coords: { lat: number; lng: number }; 
    temps: { high: number; low: number } 
} = {
    city: "Dewas", 
    coords: { lat: 22.9676, lng: 76.0534 }, 
    temps: { high: 35, low: 22 }
};

let githubRepo: { 
    name: string; 
    owner: { login: string; id: number }; 
    isPrivate: boolean 
} = {
    name: "LazyLayout", 
    owner: { login: "pranav", id: 101 }, 
    isPrivate: false
};

// Great for complex 3D rendering data where materials have their own strict shapes
let blenderModel: {
    meshName: string;
    vertices: number;
    material: { colorHex: string; roughness: number; isMetallic: boolean };
} = {
    meshName: "Drone_Propeller",
    vertices: 12500,
    material: { colorHex: "#FF5733", roughness: 0.4, isMetallic: true }
};


// ============================================================================
// 5. INDEX SIGNATURES (Dynamic Keys)
// ============================================================================
// Sometimes you don't know the exact names of the keys (like dynamic usernames),
// but you know ALL keys will be strings and ALL values will be a specific type.

// [languageCode: string] means "Any string key goes here"
let errorTranslations: { [languageCode: string]: string } = { 
    "en": "Error occurred", 
    "es": "Ocurrió un error", 
    "hi": "त्रुटि हुई" 
};

// We don't know the player names ahead of time, but we know their scores are numbers
let playerScores: { [playerName: string]: number } = { 
    "Pranav": 1500, 
    "Raja": 1420,
    "Guest_99": 300
};

// A dynamic environment variable config that accepts multiple types of values
let environmentVariables: { [key: string]: string | number | boolean } = {
    "PORT": 8000,
    "NODE_ENV": "development",
    "ENABLE_CACHE": true
};

// You can dynamically add new keys later, and TS ensures the values are the right type
playerScores["NewPlayer"] = 500;
errorTranslations["fr"] = "Erreur survenue";


// ============================================================================
// 6. FUNCTIONS ACCEPTING OBJECT TYPES
// ============================================================================
// When passing objects into functions, defining the type guarantees the function 
// will always receive the exact data it needs to run safely.

function printStudentCard(student: { name: string; rollNo: number; branch: string }) {
    // Because the parameter is typed, you get perfect autocomplete here!
    console.log(`Student: ${student.name} | Roll: ${student.rollNo} | Branch: ${student.branch}`);
}

printStudentCard({ name: "Pranav", rollNo: 42, branch: "Computer Science" });

// A physics calculation where efficiency is an optional parameter
function calculateThrust(motor: { kv: number; volts: number; efficiency?: number }): number {
    const baseRPM = motor.kv * motor.volts;
    // We check if efficiency exists before doing the math
    const actualRPM = motor.efficiency ? baseRPM * motor.efficiency : baseRPM * 0.8;
    return actualRPM * 0.05; 
}

const motorA = calculateThrust({ kv: 2750, volts: 14.8 });
const motorB = calculateThrust({ kv: 2750, volts: 14.8, efficiency: 0.9 });

// A function that updates a Linux config, ensuring the path can't be accidentally altered
function updateBspwmConfig(config: { readonly configPath: string; gaps: number; borderWidth: number }) {
    console.log(`Updating ${config.configPath}: Gaps set to ${config.gaps}px`);
}

updateBspwmConfig({ configPath: "~/.config/bspwm/bspwmrc", gaps: 12, borderWidth: 2 });
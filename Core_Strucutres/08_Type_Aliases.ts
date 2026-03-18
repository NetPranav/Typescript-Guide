// 08-type-aliases.ts

/**
 * ============================================================================
 * TOPIC 8: TYPE ALIASES (`type`)
 * ============================================================================
 * THE PROBLEM: Writing out `{ brand: string; price: number; isAvailable: boolean }` 
 * every single time you want to create or pass an object is repetitive and messy.
 * * THE SOLUTION: The `type` keyword. It allows you to create a custom name 
 * (an "Alias") for any type. Think of it as creating your own reusable blueprint.
 * * Convention: Always start your custom type names with a Capital Letter (PascalCase).
 */

// ============================================================================
// 1. ALIASING PRIMITIVE TYPES (The Basics)
// ============================================================================
// You can create a custom name for standard types to make your code's intent clearer.

type UserID = string;
type Score = number;
type IsActive = boolean;

// Now, instead of just seeing 'string', another developer knows exactly what this is for.
let currentSessionId: UserID = "USR_9948_XYZ";
let highestCombo: Score = 2450;
let accountStatus: IsActive = true;


// ============================================================================
// 2. OBJECT ALIASES (The Blueprint)
// ============================================================================
// This is the most common use case. Instead of writing the object shape inline,
// we define the blueprint ONCE, and then stamp out as many objects as we need.

// The Blueprint
type FPVCamera = {
    brand: string;
    resolution: string;
    weightInGrams: number;
    hasNightVision?: boolean; // Optional
};

// Using the Blueprint
let runcam: FPVCamera = {
    brand: "RunCam",
    resolution: "1080p",
    weightInGrams: 4.5,
    hasNightVision: true
};

let caddx: FPVCamera = {
    brand: "Caddx",
    resolution: "4K",
    weightInGrams: 15.5
    // hasNightVision is safely omitted
};

// ERROR DEMONSTRATION:
// let brokenCamera: FPVCamera = { brand: "DJI" }; 
// ^ ERROR: Type is missing the following properties from type 'FPVCamera': resolution, weightInGrams


// ============================================================================
// 3. ARRAYS OF CUSTOM TYPES
// ============================================================================
// You can use your custom type to strictly define an array's contents.

// This array can ONLY hold objects that perfectly match the 'FPVCamera' blueprint.
let cameraInventory: FPVCamera[] = [runcam, caddx];

cameraInventory.push({
    brand: "Foxeer",
    resolution: "720p",
    weightInGrams: 3.2
});

// cameraInventory.push({ brand: "GoPro" }); // ERROR: Missing required properties!


// ============================================================================
// 4. COMPOSING TYPES (Building Lego Blocks)
// ============================================================================
// You can use Type Aliases INSIDE other Type Aliases to build highly readable,
// complex data structures without creating a massive, nested mess.

type GPU = {
    chipset: string;
    vram: number; // in GB
};

type CPU = {
    model: string;
    cores: number;
    baseClockGHz: number;
};

// We build the Master Type by snapping the smaller types together
type PCBuild = {
    builderName: string;
    processor: CPU;     // Reusing the CPU type
    graphicsCard: GPU;  // Reusing the GPU type
    ramGB: number;
};

let myRig: PCBuild = {
    builderName: "Pranav",
    processor: { model: "AMD Ryzen 7", cores: 8, baseClockGHz: 3.8 },
    graphicsCard: { chipset: "NVIDIA RTX 4070", vram: 12 },
    ramGB: 32
};


// ============================================================================
// 5. FUNCTIONS ACCEPTING CUSTOM TYPES
// ============================================================================
// By defining the parameter as a custom type, your function signatures become
// incredibly clean and easy to read.

// Imagine this is a Next.js UI Component that displays a user profile card
type ProfileCardProps = {
    username: string;
    avatarUrl: string;
    followerCount: number;
    isVerified?: boolean;
};

// Look how clean this function signature is compared to defining the object inline!
function renderProfileCard(props: ProfileCardProps) {
    console.log(`Rendering Card for: ${props.username}`);
    
    if (props.isVerified) {
        console.log(`[VERIFIED BADGE ACTIVE]`);
    }
    
    console.log(`Followers: ${props.followerCount}`);
    console.log(`Image source: ${props.avatarUrl}`);
}

// Executing the function
renderProfileCard({
    username: "pranav_tech",
    avatarUrl: "/assets/images/pranav.jpg",
    followerCount: 2500,
    isVerified: true
});
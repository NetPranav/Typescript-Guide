// 09-interfaces.ts

/**
 * ============================================================================
 * TOPIC 9: INTERFACES (`interface`)
 * ============================================================================
 * THE CORE IDEA: 
 * An Interface is a strict contract that defines the shape of an object or a class. 
 * If an object or class "implements" an interface, it promises to have all the 
 * properties and methods defined in that contract.
 * * At first glance, `interface` looks almost exactly like `type`. However, 
 * interfaces are specifically designed for Object-Oriented Programming (OOP) 
 * and building complex, scalable architectures.
 */

// ============================================================================
// 1. THE BASIC INTERFACE
// ============================================================================
// Notice we DO NOT use an equals sign (=) after the interface name!

interface UserProfile {
    id: number;
    username: string;
    email: string;
}

// Stamping out an object using the interface
const newPilot: UserProfile = {
    id: 101,
    username: "pranav_fpv",
    email: "pranav@skyrise.com"
};

// ERROR DEMONSTRATION:
// const badPilot: UserProfile = { id: 102, username: "guest" };
// ^ ERROR: Property 'email' is missing in type '{ id: number; username: string; }'


// ============================================================================
// 2. OPTIONAL AND READONLY PROPERTIES
// ============================================================================
// Interfaces support the exact same modifiers as Object Types.

interface DroneProduct {
    readonly productId: string; // Cannot be changed after creation
    name: string;
    price: number;
    isInStock: boolean;
    discountCode?: string;      // Optional property
}

const cinewhoop: DroneProduct = {
    productId: "DRN-884-V2",
    name: "Skyrise Cinewhoop V2",
    price: 15000,
    isInStock: true
};

cinewhoop.price = 14500; // Allowed
// cinewhoop.productId = "NEW-ID"; // ERROR: Cannot assign to 'productId' because it is a read-only property.


// ============================================================================
// 3. METHODS IN INTERFACES (Functions inside objects)
// ============================================================================
// Interfaces can also enforce that an object MUST contain specific functions!

interface ArchLinuxSystem {
    kernelVersion: string;
    isWayland: boolean;
    // Defining a method: It takes no parameters and returns a string
    getSystemInfo(): string; 
    // Defining a method with a parameter
    executeCommand(command: string): boolean;
}

const mySetup: ArchLinuxSystem = {
    kernelVersion: "6.8.1-arch1-1",
    isWayland: true,
    
    getSystemInfo() {
        return `Arch Linux (Kernel: ${this.kernelVersion})`;
    },
    
    executeCommand(command: string) {
        console.log(`[sudo] executing: ${command}`);
        return true; // Simulating success
    }
};

mySetup.executeCommand("pacman -Syu");


// ============================================================================
// 4. EXTENDING INTERFACES (Inheritance)
// ============================================================================
// This is where Interfaces shine. You can build a base interface, and then 
// create new interfaces that INHERIT everything from the base one, plus add more.
// This keeps your code DRY (Don't Repeat Yourself).

// The Base Contract
interface BaseAPIResponse {
    status: number;
    message: string;
}

// The Extended Contract (Inherits status and message, adds data)
interface UserDataResponse extends BaseAPIResponse {
    data: {
        username: string;
        token: string;
    };
}

// The object MUST have properties from BOTH interfaces
const loginSuccess: UserDataResponse = {
    status: 200,
    message: "Login successful",
    data: {
        username: "pranav_dev",
        token: "eyJhbGciOiJIUzI1NiIsIn..."
    }
};


// ============================================================================
// 5. CLASSES IMPLEMENTING INTERFACES (OOP Concepts)
// ============================================================================
// In Object-Oriented Programming, classes can "implement" an interface.
// The compiler will force the class to include everything the interface demands.

interface Flyable {
    altitude: number;
    takeoff(): void; // 'void' means the function returns nothing
    land(): void;
}

// The 'implements' keyword forces the class to obey the 'Flyable' contract
class Quadcopter implements Flyable {
    altitude: number = 0;
    model: string; // The class can have extra properties not in the interface

    constructor(model: string) {
        this.model = model;
    }

    takeoff() {
        this.altitude = 100;
        console.log(`${this.model} has taken off. Altitude: ${this.altitude}m`);
    }

    land() {
        this.altitude = 0;
        console.log(`${this.model} has landed safely.`);
    }
}

const myDrone = new Quadcopter("Custom 5-inch Freestyle");
myDrone.takeoff();

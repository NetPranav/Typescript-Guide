// ======================
// 📦 ARRAYS IN TYPESCRIPT
// ======================

// An array that can ONLY hold strings.
// It can have 0 items or 10,000 items, as long as they are strings.
let droneModels: string[] = [
  "Cinewhoop V2",
  "Freestyle 5-inch",
  "Tinywhoop"
];

// An array that can ONLY hold numbers.
let productPrices: number[] = [
  15000,
  22000,
  5000
];

// ❌ Type Safety Example
// TypeScript prevents mixing data types!
// droneModels.push(99); 
// ERROR: Argument of type 'number' is not assignable to parameter of type 'string'.



// ======================
// 📌 TUPLES IN TYPESCRIPT
// ======================

// A tuple that MUST follow a fixed structure:
// [string, number, number]
// Perfect for motor specs: [Model Name, KV Rating, Cell Count]
let motorSpecs: [string, number, number] = [
  "Xing 2207",
  2750,
  4
];

// ❌ Error Examples

// ERROR 1: Order matters!
// motorSpecs = [2750, 4, "Xing 2207"];

// ERROR 2: Length matters!
// motorSpecs = ["Xing 2207", 2750];

// ERROR 3: Extra values are NOT allowed!
// motorSpecs = ["Xing 2207", 2750, 4, "Extra Data"];
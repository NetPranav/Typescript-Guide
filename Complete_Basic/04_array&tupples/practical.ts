// An array that can ONLY hold strings. 
// It can have 0 items or 10,000 items, as long as they are strings.
let droneModels: string[] = ["Cinewhoop V2", "Freestyle 5-inch", "Tinywhoop"];

// An array that can ONLY hold numbers.
let productPrices: number[] = [15000, 22000, 5000];

// TypeScript prevents you from mixing data types!
// droneModels.push(99); // ERROR: Argument of type 'number' is not assignable to parameter of type 'string'.


// A tuple that holds a string and a number, in that order.
// This tuple MUST have exactly 3 items, in this exact order: string, number, number.
// Perfect for defining motor specs: [Model Name, KV Rating, Cell Count]
let motorSpecs: [string, number, number] = ["Xing 2207", 2750, 4];

// ERROR 1: Order matters! You can't put the numbers first.
// motorSpecs = [2750, 4, "Xing 2207"]; 

// ERROR 2: Length matters! You can't leave out an item.
// motorSpecs = ["Xing 2207", 2750]; 

// ERROR 3: You can't add an extra item.
// motorSpecs = ["Xing 2207", 2750, 4, "Extra Data"]; 
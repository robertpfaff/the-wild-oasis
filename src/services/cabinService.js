import { cabinsData } from "../data/cabins";

// Simulate a database with localStorage
const STORAGE_KEY = "cabins";

// Initialize localStorage with sample data if empty
function initializeCabins() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cabinsData));
  }
}

// Get all cabins
export function getCabins() {
  initializeCabins();
  const cabins = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(cabins);
}

// Get a single cabin by id
export function getCabin(id) {
  const cabins = getCabins();
  return cabins.find((cabin) => cabin.id === id);
}

// Update a cabin
export function updateCabin(id, updatedCabin) {
  const cabins = getCabins();
  const index = cabins.findIndex((cabin) => cabin.id === id);
  
  if (index === -1) {
    throw new Error("Cabin not found");
  }
  
  cabins[index] = { ...cabins[index], ...updatedCabin };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cabins));
  
  return cabins[index];
}

// Create a new cabin
export function createCabin(newCabin) {
  const cabins = getCabins();
  const maxId = cabins.length > 0 ? Math.max(...cabins.map((c) => c.id)) : 0;
  const newId = maxId + 1;
  const cabin = { id: newId, ...newCabin };
  
  cabins.push(cabin);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cabins));
  
  return cabin;
}

// Delete a cabin
export function deleteCabin(id) {
  const cabins = getCabins();
  const filteredCabins = cabins.filter((cabin) => cabin.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCabins));
}

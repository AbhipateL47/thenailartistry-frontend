/**
 * Generates unique dummy address data for testing/development
 * Each reload generates a new unique address to differentiate orders
 */

const firstNames = [
  'Priya', 'Ananya', 'Sneha', 'Kavya', 'Aditi', 'Riya', 'Meera', 'Aarohi',
  'Raj', 'Arjun', 'Vikram', 'Rohan', 'Karan', 'Aryan', 'Dev', 'Sahil'
];

const lastNames = [
  'Sharma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Mehta', 'Reddy', 'Nair',
  'Joshi', 'Desai', 'Shah', 'Iyer', 'Rao', 'Malhotra', 'Agarwal', 'Verma'
];

const streets = [
  'MG Road', 'Park Street', 'Church Street', 'Commercial Street', 'Brigade Road',
  'Indira Nagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'Marathahalli',
  'BTM Layout', 'Jayanagar', 'Basavanagudi', 'Malleshwaram', 'Rajajinagar'
];

const areas = [
  'Near Metro Station', 'Opposite Mall', 'Behind Park', 'Next to Hospital',
  'Adjacent to School', 'Close to Market', 'Near Temple', 'Behind Bank'
];

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata',
  'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore'
];

const states = [
  'Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu', 'Gujarat',
  'West Bengal', 'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh', 'Punjab'
];

/**
 * Generates a random element from an array
 */
const randomElement = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Generates a random number between min and max (inclusive)
 */
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates a unique 6-digit postal code
 */
const generatePostalCode = (): string => {
  return String(randomInt(100000, 999999));
};

/**
 * Generates a unique 10-digit phone number
 */
const generatePhone = (): string => {
  // Indian phone numbers start with 6-9
  const firstDigit = randomInt(6, 9);
  const remaining = String(randomInt(100000000, 999999999));
  return `${firstDigit}${remaining}`;
};

/**
 * Generates a unique email based on name and timestamp
 */
const generateEmail = (firstName: string, lastName: string): string => {
  const timestamp = Date.now();
  const random = randomInt(100, 999);
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${timestamp}${random}@example.com`;
};

/**
 * Generates unique dummy address data
 * Each call generates a completely new unique address
 */
export const generateDummyAddress = () => {
  const firstName = randomElement(firstNames);
  const lastName = randomElement(lastNames);
  const fullName = `${firstName} ${lastName}`;
  
  const street = randomElement(streets);
  const area = randomElement(areas);
  const houseNumber = randomInt(1, 999);
  
  const city = randomElement(cities);
  const state = randomElement(states);
  const postalCode = generatePostalCode();
  const phone = generatePhone();
  const email = generateEmail(firstName, lastName);

  return {
    fullName,
    phone,
    email,
    addressLine1: `${houseNumber}, ${street}`,
    addressLine2: area,
    city,
    state,
    postalCode,
    country: 'India',
  };
};


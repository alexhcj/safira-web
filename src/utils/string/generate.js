/**
 * Generates a random ID
 * @returns {string} - The generated ID
 */
export const generateID = () => Math.random().toString(36).substring(2, 9)

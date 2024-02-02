import { hash, compare } from "bcrypt";

export async function hash(data) {
  try {
    const hash = hash(data, 10);
    return hash;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
/**
 * 
 * @param {string} string 
 * @param {string} hashString 
 * @returns {boolean} - Returns true or false on the basis on 
 */
export async function compare(string, hashString) {
  try {
    const isMatched = await compare(string, hashString);
    console.log(isMatched);
    return isMatched;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
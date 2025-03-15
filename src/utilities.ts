/**
 * Calculate length for the shortened ID
 * @param {number} alphabetLength
 * @returns {number}
 */
export const calculateMaxLength = (alphabetLength:number):number => (
  Math.ceil(128 / Math.log2(alphabetLength))
);

export const checkForDuplicates = (alphabet:string):boolean => {
  const alphabetSet = new Set(alphabet);
  return alphabet.length !== alphabetSet.size;
};

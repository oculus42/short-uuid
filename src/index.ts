// Two basic actions available with v6.0.0:

import { createTranslator } from "./convertor";

import alphabets from "./constants";
import { translator } from "./types";

export { createTranslator } from './convertor'

let quickTranslate: translator;

export const generate = () => {
  if (quickTranslate === undefined) {
    quickTranslate = createTranslator();
  }
  return quickTranslate.generate();
}

export const constants = alphabets;

export default createTranslator;


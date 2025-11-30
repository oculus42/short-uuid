import { createTranslator } from "./convertor";

import { Translator } from "./types";

let quickTranslate: Translator;

export const generate = () => {
  if (quickTranslate === undefined) {
    quickTranslate = createTranslator();
  }
  return quickTranslate.generate();
}

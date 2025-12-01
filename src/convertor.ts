import anyBase from "any-base";

import type { Config, UUID, SUUID, Translator, TranslatorOptions } from "./types";

import defaultConfig from "./config";
import {calculateMaxLength, checkForDuplicates } from "./utilities";
import validate from "./validate";
import { shortenUUID, restoreUUID } from "./translate";

const createTranslatorFromOptions = (options:TranslatorOptions = {}):Translator => {
  const setup = {
    ...defaultConfig,
    ...options,
  };

  // Check for duplicate characters in the alphabet.
  if (checkForDuplicates(setup.alphabet)) {
    throw new Error('Alphabet contains duplicate characters.');
  }

  const config = {
    ...setup,
    maxLength: calculateMaxLength(setup.alphabet.length),
    // TODO Allow a padding character from options?
    paddingCharacter: setup.alphabet[0],
    hexFromAlphabet: anyBase(setup.alphabet, anyBase.HEX),
    hexToAlphabet: anyBase(anyBase.HEX, setup.alphabet),
  } as Config;

  const translator = {
    alphabet: config.alphabet,
    fromUUID: (uuid:UUID):SUUID => shortenUUID(config, uuid),
    generate: ():SUUID => shortenUUID(config, config.uuid() as UUID),
    maxLength: config.maxLength,
    toUUID: (shortUuid:SUUID):UUID => restoreUUID(config, shortUuid),
    uuid: config.uuid,
    validate: validate(config),
  } as Translator;

    Object.freeze(translator);
    return translator;
}

const createTranslatorFromAlphabet = (
  alphabet:string,
  options:Omit<TranslatorOptions, 'alphabet'> = {}
):Translator => {
  return createTranslatorFromOptions({
    ...options,
    alphabet,
  });
};

export const createTranslator = (
  arg?:string|TranslatorOptions,
  options?:Omit<TranslatorOptions, 'alphabet'>
) : Translator => {
  return typeof arg === 'string'
    ? createTranslatorFromAlphabet(arg, options)
    : createTranslatorFromOptions(arg);
}

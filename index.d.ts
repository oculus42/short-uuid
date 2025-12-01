import type { Translator, TranslatorOptions } from './src/types';

export const constants: {
  cookieBase90: string;
  flickrBase58: string;
  rfcBase32: string;
  uuid25Base36: string;
};

export function createTranslator(
  arg?: string | TranslatorOptions,
  options?: Omit<TranslatorOptions, 'alphabet'>
): Translator;

export function generate(): string; // Adjust return type if needed

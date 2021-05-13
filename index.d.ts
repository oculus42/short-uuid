declare module 'short-uuid' {
  interface Options{
    consistentLength?: boolean;
  }

  function shortUUID(alphabet?: string, options?:Options): shortUUID.Translator;

  namespace shortUUID {
    export const constants: {
      flickrBase58: string;
      cookieBase90: string;
    };

    /** Generate a new regular UUID. */
    export function uuid(): string;

    /** Generate a base 58 short uuid */
    export function generate(): string;

    export interface Translator {
      /** The alphabet used for encoding UUIDs. */
      alphabet: string;
      /** Maximum length in characters of a short ID using this Translator */
      maxLength: number;

      /** Generate a new short UUID using this translator's alphabet. */
      new: () => string;

      /** Generate a new short UUID using this translator's alphabet. */
      generate: () => string;

      /** Generate a new regular UUID. */
      uuid(): string;

      /** short -> long */
      toUUID(shortId: string): string;

      /** long -> short */
      fromUUID(regularUUID: string): string;
    }
  }

  export = shortUUID;
}

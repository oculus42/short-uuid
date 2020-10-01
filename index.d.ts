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

    export type UUID = string & { _guidBrand: 'short-uuid' };

    /** Generate a new regular UUID. */
    export function uuid(): UUID;

    /** Generate a base 58 short uuid */
    export function generate(): UUID;

    export interface Translator {
      /** The alphabet used for encoding UUIDs. */
      alphabet: string;

      /** Generate a new short UUID using this translator's alphabet. */
      new: () => UUID;

      /** Generate a new short UUID using this translator's alphabet. */
      generate: () => UUID;

      /** Generate a new regular UUID. */
      uuid(): UUID;

      /** short -> long */
      toUUID(shortId: string): UUID;

      /** long -> short */
      fromUUID(regularUUID: string): UUID;
    }
  }

  export = shortUUID;
}

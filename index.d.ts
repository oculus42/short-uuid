declare module 'short-uuid' {
  interface Options{
    consistentLength?: boolean;
  }

  function shortUUID(alphabet?: string, options?:Options): shortUUID.Translator;

  namespace shortUUID {
    export const constants: {
      cookieBase90: string;
      flickrBase58: string;
      uuid25Base36: string;
    };

    export type UUID = string & { _guidBrand: 'uuid' };
    export type SUUID = string & { _guidBrand: 'short-uuid' };

    /** Generate a new regular UUID. */
    export function uuid(): UUID;

    /** Generate a base 58 short uuid */
    export function generate(): SUUID;

    export interface Translator {
      /** The alphabet used for encoding UUIDs. */
      alphabet: string;
      /** Maximum length in characters of a short ID using this Translator */
      maxLength: number;

      /** Generate a new short UUID using this translator's alphabet. */
      new: () => SUUID;

      /** Generate a new short UUID using this translator's alphabet. */
      generate: () => SUUID;

      /** Generate a new regular UUID. */
      uuid(): UUID;

      /** short -> long */
      toUUID(shortId: string | SUUID): UUID;

      /** long -> short */
      fromUUID(regularUUID: string | UUID): SUUID;

      /** validate short */
      validate(shortId: string | SUUID, rigorous?: boolean): boolean;
    }
  }

  export = shortUUID;
}

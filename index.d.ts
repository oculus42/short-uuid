declare module 'short-uuid' {
  function shortUuid(alphabet?:string): shortUuid.Translator;

  namespace shortUuid {
    export const constants: {
      flickrBase58: string;
      cookieBase90: string;
    }

    /** Generate a new regular UUID. */
    export function uuid(): string;

    export interface Translator {
      /** The alphabet used for encoding UUIDs. */
      alphabet: string;

      /** Generate a new short UUID using this translator's alphabet. */
      new: () => string;

      /** Generate a new regular UUID. */
      uuid(): string;

      /** short -> long */
      toUUID(shortId: string): string;

      /** long -> short */
      fromUUID(regularUUID: string): string;
    }
  }

  export = shortUuid;
}

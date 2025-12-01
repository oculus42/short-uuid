export type UUID = string & { _guidBrand: 'uuid' };
export type SUUID = string & { _guidBrand: 'short-uuid' };

export interface TranslatorOptions {
  alphabet?: string;
  consistentLength?: boolean;
  uuid?: () => UUID;
}

export interface Config {
  alphabet: string;
  consistentLength: boolean;
  hexFromAlphabet: (suuid:string|SUUID) => string;
  hexToAlphabet: (uuid:string) => string;
  maxLength: number;
  paddingCharacter: string;
  uuid: () => UUID|string;
}

export interface Translator {
  /** The alphabet used for encoding UUIDs. */
  alphabet: string;
  /** Maximum length in characters of a short ID using this translator */
  maxLength: number;

  /** Generate a new short UUID using this translator's alphabet. */
  generate: () => SUUID;

  /** Generate a new regular UUID. */
  uuid(): UUID;

  /** short -> long */
  toUUID(shortUuid: string | SUUID): UUID;

  /** long -> short */
  fromUUID(uuid: string | UUID): SUUID;

  /** validate short */
  validate(shortId: string | SUUID, rigorous?: boolean): boolean;
}

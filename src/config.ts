
import { flickrBase58 } from "./constants";

export default {
  consistentLength: true,
  alphabet: flickrBase58,
  uuid: () => globalThis.crypto?.randomUUID(),
};

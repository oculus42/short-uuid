
import { flickrBase58 } from "./constants";

export default {
  consistentLength: true,
  alphabet: flickrBase58,
  uuid: () => crypto?.randomUUID(),
};

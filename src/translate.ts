import type { Config, SUUID, UUID } from './types';

/**
 * Translate back to hex and into UUID format with dashes
 * Pad with zeros if necessary to accommodate unusual IDs
 */
export const restoreUUID = (config:Config, shortId:SUUID):UUID =>
  config.hexFromAlphabet(shortId)
    .padStart(32, '0')
    .match(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/)
    ?.slice(1)
    .join('-') as UUID;

export const shortenUUID = (config:Config, longId:UUID):SUUID => {
  const translated = config.hexToAlphabet(longId.toLowerCase().replace(/-/g, ''));

  if (!config.consistentLength) return translated as SUUID;

  return translated.padStart(
    config.maxLength,
    config.paddingCharacter,
  ) as SUUID;
};


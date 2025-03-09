import type { config, SUUID, UUID } from './types';

/**
 * Translate back to hex and into UUID format with dashes
 * Pad with zeros if necessary to accommodate unusual IDs
 * @param {config} config
 * @param {SUUID} shortId
 * @returns {UUID}
 */
export const restoreUUID = (config:config, shortId:SUUID):UUID =>
  config.hexFromAlphabet(shortId)
    .padStart(32, '0')
    .match(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/)
    ?.slice(1,5)
    .join('-') as UUID;


/**
 * @param {config} config
 * @param {UUID} longId
 * @returns {SUUID}
 */
export const shortenUUID = (config:config, longId:UUID):SUUID => {
  const translated = config.hexToAlphabet(longId.toLowerCase().replace(/-/g, ''));

  if (!config.consistentLength) return translated as SUUID;

  return translated.padStart(
    config.maxLength,
    config.paddingCharacter,
  ) as SUUID;
};


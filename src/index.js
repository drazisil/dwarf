export const supportedFileTypes = new Map();
supportedFileTypes.set('obj', { name: 'obj', extension: 'obj', signature: [0x4c, 0x01] });

export function toHexString(buffer) {
  return Array.prototype.map.call(buffer, x => ('00' + x.toString(16)).slice(-2)).join('');
}

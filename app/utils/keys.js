const KEY_NAMES =    ['C',   'C#', 'D',   'D#', 'E',   'F',  'F#',  'G',  'G#',  'A',   'A#', 'B'];
const IS_BLACK_KEY = [false, true, false, true, false, false, true, false, true, false, true, false];

export function isBlackKey(key) {
  return IS_BLACK_KEY[key%12];
}

export function nameForKey(key) {
  let note = key%12;
  let octave = Math.floor(key/12) - 1;
  return `${KEY_NAMES[note]}${octave}`;
}

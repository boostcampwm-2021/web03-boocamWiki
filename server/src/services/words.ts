import * as Hangul from 'hangul-js';
export function isHangulChar(ch) {
  const c = ch.charCodeAt(0);
  if (0x1100 <= c && c <= 0x11ff) return true;
  if (0x3130 <= c && c <= 0x318f) return true;
  if (0xac00 <= c && c <= 0xd7a3) return true;
  return false;
}

export function getHangulCho(str) {
  const result = Hangul.d(str);
  return result[0];
}

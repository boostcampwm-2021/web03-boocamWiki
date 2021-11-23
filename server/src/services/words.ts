export function isHangulChar(ch) {
  const c = ch.charCodeAt(0);
  if (0x1100 <= c && c <= 0x11ff) return true;
  if (0x3130 <= c && c <= 0x318f) return true;
  if (0xac00 <= c && c <= 0xd7a3) return true;
  return false;
}

export function getHangulCho(str) {
  const cho = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i) - 44032;
    if (code > -1 && code < 11172) result += cho[Math.floor(code / 588)];
  }
  return result[0];
}

export const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/community', key: 'community' },
  { href: '/staking', key: 'staking' },
  { href: '/ecosystem', key: 'ecosystem' },
  { href: '/protocol', key: 'protocol' },
  { href: '/token', key: 'token' },
  { href: '/whitepaper', key: 'whitepaper' },
];

export const LANGUAGE_OPTIONS = [
  ['en', 'English'],
  ['en-US', 'English (US)'],
  ['en-SG', 'English (Singapore)'],
  ['en-IN', 'English (India)'],
  ['zh-CN', '简体中文'],
  ['zh-HK', '繁體中文'],
  ['ja', '日本語'],
  ['ko', '한국어'],
  ['ms', 'Bahasa Melayu'],
  ['th', 'ไทย'],
  ['ar', 'العربية'],
  ['ru', 'Русский'],
  ['ur', 'اردو'],
];

export const LANGUAGE_CODES = LANGUAGE_OPTIONS.map(([code]) => code);

export function orderNav(nav = {}) {
  return Object.fromEntries(NAV_ITEMS.map(({ key }) => [key, nav[key]]));
}

export function orderByLanguage(map = {}) {
  return Object.fromEntries(LANGUAGE_CODES.map((code) => [code, map[code]]));
}

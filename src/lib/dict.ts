export const SYMBOL_TABLE = {
  BACKQUOTE: '`',
  TILDE: '~',
  EXCLAM: '!',
  AT: '@',
  NUMBERSIGN: '#',
  DOLLAR: '$',
  PERCENT: '%',
  CARET: '^',
  AMPERSAND: '&',
  ASTERISK: '*',
  PARENLEFT: '(',
  PARENRIGHT: ')',
  MINUS: '-',
  UNDERSCORE: '_',
  EQUAL: '=',
  PLUS: '+',
  BRACKETLEFT: '[',
  BRACELEFT: '{',
  BRACKETRIGHT: ']',
  BRACERIGHT: '}',
  SEMICOLON: ';',
  COLON: ':',
  QUOTE: "'",
  DOUBLEQUOTE: '"',
  BACKSLASH: '\\',
  BAR: '|',
  COMMA: ',',
  LESS: '<',
  PERIOD: '.',
  GREATER: '>',
  SLASH: '/',
  QUESTION: '?',
  SPACE: ' ',
  DOT: '.',
  HASH: '#',
} as const;

export type SYMBOL_TABLE_TYPE = typeof SYMBOL_TABLE;

export type SYMBOL_TABLE_TYPE_VALUES =
  SYMBOL_TABLE_TYPE[keyof SYMBOL_TABLE_TYPE];

export type MappingStringDictionary = Record<
  Exclude<SYMBOL_TABLE_TYPE_VALUES, '-' | '_' | ' '>,
  string
>;

export const SimpleMappingChars2String: MappingStringDictionary = {
  '[': '_',
  ']': '_',
  '(': '_',
  ')': '_',
  '{': '_',
  '}': '_',
  '+': 'a',
  ',': 'b',
  ':': 'c',
  '.': 'd',
  '=': 'e',
  ';': 'f',
  '>': 'g',
  '#': 'h',
  '!': 'i',
  '@': 'j',
  '^': 'k',
  '<': 'l',
  '*': 'm',
  '&': 'n',
  '?': 'o',
  '%': 'p',
  "'": 'q',
  $: 'r',
  '/': 's',
  '~': 't',
  '|': 'u',
  '`': 'v',
  '\\': 'w',
  '"': 'x',
};

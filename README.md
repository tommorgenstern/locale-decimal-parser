# locale-decimal-parser
[![npm version](https://img.shields.io/npm/v/locale-decimal-parser)](https://www.npmjs.com/package/locale-decimal-parser)

Locale-aware utility for parsing and formatting decimal numbers.  
Handles thousands and decimal separators automatically based on the user's or a given locale — ideal for forms, reports, and financial data.

## Features

- Parse localized user input like `"1.234,56"` or `"1,234.56"` reliably
- Format numbers into any locale (`Intl.NumberFormat`)
- Supports manual locale override
- TypeScript-first

## Installation

```bash
npm install locale-decimal-parser
# or
yarn add locale-decimal-parser
```

## Usage

```
import { parseLocalizedDecimal, formatDecimalToLocale } from 'locale-decimal-parser';

// Parsing
parseLocalizedDecimal('1.234,56', 'de-DE'); // => 1234.56
parseLocalizedDecimal('1,234.56', 'en-US'); // => 1234.56
parseLocalizedDecimal('.75', 'en-US');      // => 0.75
parseLocalizedDecimal(',75', 'de-DE');      // => 0.75

// Formatting
formatDecimalToLocale(1234.56, 'de-DE');    // => '1.234,56'
formatDecimalToLocale(1234.56, 'en-US');    // => '1,234.56'

// With formatting options
formatDecimalToLocale(1234.56, 'en-US', {
  style: 'currency',
  currency: 'USD',
}); // => '$1,234.56'
```

## Note on Locale Support
Currently tested and verified with:
- de-DE (German)
- en-US (American English)

Support for other locales may vary depending on the browser's implementation of Intl and formatting behavior. Contributions are welcome!

## API Reference

### `parseLocalizedDecimal`

```ts
parseLocalizedDecimal(input: string, locale?: string): number | null
```

Parses a localized decimal string and returns a number or `null` if the input is invalid.

#### Parameters
- `input`: The user-entered number as a string, e.g., `"1.234,56"`.
- `locale` *(optional)*: A locale string (e.g., `"de-DE"`). Defaults to the user's browser locale.

#### Returns
- A `number` if parsing was successful
- `null` if the input could not be parsed

#### Example
```ts
parseLocalizedDecimal('1.234,56', 'de-DE'); // 1234.56
parseLocalizedDecimal('1,234.56', 'en-US'); // 1234.56
parseLocalizedDecimal('invalid');           // null
```

---

### `formatDecimalToLocale`

```ts
formatDecimalToLocale(value: number, locale?: string, options?: Intl.NumberFormatOptions): string
```

Formats a number into a localized string using `Intl.NumberFormat`.

#### Parameters
- `value`: The number to format.
- `locale` *(optional)*: A locale string (e.g., `"en-US"`). Defaults to the user's browser locale.
- `options` *(optional)*: An object following [`Intl.NumberFormatOptions`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).

#### Returns
- A localized string representation of the number

#### Example
```ts
formatDecimalToLocale(1234.56, 'de-DE'); // "1.234,56"
formatDecimalToLocale(1234.56, 'en-US'); // "1,234.56"

formatDecimalToLocale(1234.56, 'en-US', {
  style: 'currency',
  currency: 'USD',
}); // "$1,234.56"
```

## License

MIT
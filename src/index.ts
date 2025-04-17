/**
 * Parses a decimal string input while normalizing locale-specific separators.
 * Falls back to the user's browser locale if no locale is provided.
 * Returns `null` if the parsed value is not a valid number.
 */
export function parseLocalizedDecimal(
  inputValue: string,
  locale?: string
): number | null {
  const userLocale = locale || navigator.language || navigator.languages[0];

  const exampleNumber = 1000.1;
  const localeString = exampleNumber.toLocaleString(userLocale);
  const separators = localeString.match(/[^0-9]/g) || [];

  const decimalSeparator = separators.pop() || '.';
  const thousandSeparator = separators.shift() || ',';

  const inputWithoutThousandSeparator = inputValue.replace(
    new RegExp(`\\${thousandSeparator}`, 'g'),
    ''
  );
  
  const normalizedValue = inputWithoutThousandSeparator.replace(
    new RegExp(`\\${decimalSeparator}`, 'g'),
    '.'
  );

  const parsedValue = parseFloat(normalizedValue);

  return isNaN(parsedValue) ? null : parsedValue;
}

/**
 * Formats a number into a localized decimal string.
 * Allows optional configuration for style, currency, minimum/maximum fraction digits, etc.
 */
export function formatDecimalToLocale(
  value: number,
  locale?: string,
  options?: Intl.NumberFormatOptions
): string {
  return value.toLocaleString(locale || navigator.language, options);
}

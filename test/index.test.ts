import { describe, it, expect } from 'vitest';
import { parseLocalizedDecimal, formatDecimalToLocale } from '../src';

describe('parseLocalizedDecimal', () => {
  it('parses German formatted number correctly', () => {
    expect(parseLocalizedDecimal('3,8', 'de-DE')).toBeCloseTo(3.8);
  });

  it('parses German formatted number with thousand-separator correctly', () => {
    expect(parseLocalizedDecimal('1.234,56', 'de-DE')).toBeCloseTo(1234.56);
  });

  it('parses US formatted number correctly', () => {
    expect(parseLocalizedDecimal('50.75', 'en-US')).toBeCloseTo(50.75);
  });

  it('parses US formatted number with thousand-separator correctly', () => {
    expect(parseLocalizedDecimal('1,234.56', 'en-US')).toBeCloseTo(1234.56);
  });

  it('parses input with ambiguous separators correctly (e.g., 1.000)', () => {
    expect(parseLocalizedDecimal('1.000', 'de-DE')).toBeCloseTo(1000);
  });

  it('parses negative numbers correctly', () => {
    expect(parseLocalizedDecimal('-1.234,56', 'de-DE')).toBeCloseTo(-1234.56);
  });

  it('parses zero correctly', () => {
    expect(parseLocalizedDecimal('0', 'en-US')).toBe(0);
  });
  
  it('parses edge float values correctly', () => {
    expect(parseLocalizedDecimal('0.0000001', 'en-US')).toBeCloseTo(0.0000001);
  });  

  it('returns null for clearly invalid input', () => {
    expect(parseLocalizedDecimal('not-a-number')).toBeNull();
    expect(parseLocalizedDecimal('')).toBeNull();
    expect(parseLocalizedDecimal('.,.,')).toBeNull();
  });

  it('parses number with whitespace correctly', () => {
    expect(parseLocalizedDecimal(' 1.234,56 ', 'de-DE')).toBeCloseTo(1234.56);
  });

  it('parses number with multiple thousand separators', () => {
    expect(parseLocalizedDecimal('1.234.567,89', 'de-DE')).toBeCloseTo(1234567.89);
  });

  it('parses number with only decimal part', () => {
    expect(parseLocalizedDecimal(',75', 'de-DE')).toBeCloseTo(0.75);
    expect(parseLocalizedDecimal('.75', 'en-US')).toBeCloseTo(0.75);
  });

  it('uses browser locale fallback', () => {
    const result = parseLocalizedDecimal('1,234.56');
    expect(typeof result).toBe('number');
  });
});

describe('formatDecimalToLocale', () => {
  it('formats number in German locale', () => {
    const result = formatDecimalToLocale(1234.56, 'de-DE');
    expect(result).toBe('1.234,56');
  });

  it('formats number in US locale', () => {
    const result = formatDecimalToLocale(1234.56, 'en-US');
    expect(result).toBe('1,234.56');
  });

  it('formats number with max two decimal places', () => {
    const result = formatDecimalToLocale(1234.5678, 'en-US', {
      maximumFractionDigits: 2,
    });
    expect(result).toBe('1,234.57');
  });

  it('formats number with min/max fraction digits', () => {
    const result = formatDecimalToLocale(1.5, 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
    expect(result).toBe('1.50');
  });

  it('formats currency correctly', () => {
    const result = formatDecimalToLocale(1234.56, 'en-US', {
      style: 'currency',
      currency: 'USD',
    });
    expect(result).toMatch(/\$\s?1,234\.56/); // loose match depending on locale spacing
  });

  it('formats compact notation', () => {
    const result = formatDecimalToLocale(1234567, 'en-US', {
      notation: 'compact',
    });
    expect(result).toMatch(/1\.2[0-9]?M|1\.23?M/); // depending on rounding
  });
});

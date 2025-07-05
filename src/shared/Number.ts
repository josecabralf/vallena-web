export class Number {
  /**
   * Formats a number to Spanish notation:
   * - Uses dots as thousands separators (1234567 -> 1.234.567)
   * - Uses comma as decimal separator (1234.56 -> 1.234,56)
   *
   * @param value - The number to format
   *
   * Regex for thousands:
   * \B        - Match a position that's not a word boundary
   * (?=       - Positive lookahead: match only if the following pattern matches
   * (\d{3})+  - Match groups of exactly 3 digits
   * (?!\d)    - Negative lookahead: match only if not followed by another digit
   *
   * Example transformations:
   * 1234.56   -> 1.234,56
   * 1000000   -> 1.000.000
   * 123.4567  -> 123,4567
   */
  static formatCurrency(value: number): string {
    return value.toLocaleString('es-AR');
  }
}

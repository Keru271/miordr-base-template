export function formatPrice(amount: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

export function formatPriceCompact(amount: number, currency = 'USD'): string {
  if (amount >= 1000) {
    return `${currency === 'USD' ? '$' : currency}${(amount / 1000).toFixed(1)}k`;
  }
  return formatPrice(amount, currency);
}

export function discountPercent(original: number, sale: number): number {
  if (original <= 0) return 0;
  return Math.round(((original - sale) / original) * 100);
}

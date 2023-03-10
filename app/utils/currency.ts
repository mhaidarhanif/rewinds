import currency from "currency.js";

export function convertCurrencyToUSD(value: currency.Any) {
  return currency(value, {
    symbol: "USD$ ",
    precision: 0,
  });
}

export function formatCurrency(price: number | null | undefined) {
  return convertCurrencyToUSD(price as currency.Any).format();
}

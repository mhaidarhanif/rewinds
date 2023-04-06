import currency from "currency.js";

export const CurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0, // this will print 2500.10 as $2,500.1
  // maximumFractionDigits: 0, // this will print 2500.99 as $2,501
});

export function currencyToUSD(value: any) {
  return currency(value, {
    symbol: "US$ ",
  });
}

export function currencyToIDR(value: any) {
  return currency(value, {
    symbol: "Rp ",
    decimal: ",",
    separator: ".",
    precision: 0,
  });
}

export const formatValueToCurrency = (value: number | null | undefined) => {
  return currencyToUSD(value).format();
};

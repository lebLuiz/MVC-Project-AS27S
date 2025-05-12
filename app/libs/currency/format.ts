export const currencyFormatBRL = (value: number | string) => {
  const _value = parseFloat(value?.toString().replaceAll(",", ".")) || 0;
  return Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(_value);
};

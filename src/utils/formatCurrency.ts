type formatCurrencyProps = {
  value: number
  locale?: 'pt-BR' | 'en-US'
  currency?: 'BRL' | 'USD'
}

export const formatCurrency = ({ value, locale = 'pt-BR', currency = 'BRL' }: formatCurrencyProps) => {
  const valueCurrency = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value)

  return valueCurrency
}

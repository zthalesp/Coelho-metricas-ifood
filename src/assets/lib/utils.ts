// /lib/utils.ts

/**
 * Normaliza uma string de moeda para um número (float)
 * @param value A string de entrada (ex: "R$ 1.234,56")
 * @returns O valor numérico (ex: 1234.56)
 */
export function normalizeNumber(value: string | number | undefined): number {
  if (value === undefined || value === null) return 0;

  // Converte para string e remove o que não é dígito, vírgula ou ponto
  const stringValue = value.toString().replace(/[^\d.,]/g, '');

  // Substitui a vírgula por ponto para parsear corretamente
  return parseFloat(stringValue.replace(',', '.') || '0');
}

/**
 * Formata um número para o formato de moeda brasileira (R$)
 * @param amount O valor numérico
 * @returns A string formatada (ex: "R$ 1.234,56")
 */
export function formatCurrency(amount: number | undefined): string {
  if (amount === undefined || amount === null) return 'R$ 0,00';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}
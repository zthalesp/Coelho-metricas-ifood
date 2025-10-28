"use client";

import { useState, useEffect, useCallback } from 'react';
import { DollarSign } from 'lucide-react';
// IMPORTANTE: Mantenho o caminho aqui, mas certifique-se de que ele esteja mapeado corretamente no tsconfig.json
import { normalizeNumber, formatCurrency } from '@/assets/lib/utils';

// --- Interface de Props ---
interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

// --- Componente CurrencyInput ---
export default function CurrencyInput({ 
  value, 
  onChange, 
  placeholder = "0,00", 
  className = "",
  disabled = false 
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // --- Funções de Formatação ---

  // Função para formatar o valor (usada no blur e no useEffect)
  const getFormattedValue = useCallback((val: number) => {
    if (val === 0) return "";
    // Garante que o valor exibido não tenha o símbolo de moeda
    return formatCurrency(val).replace('R$', '').trim();
  }, []);

  // Função para obter a string numérica pura (usada no focus)
  const getPureNumericString = useCallback((val: number) => {
    return val.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, []);


  // --- Efeito: Mantém o displayValue sincronizado com o prop 'value' ---
  useEffect(() => {
    // Só atualiza o display se não estiver focado, evitando interrupção da digitação
    if (!isFocused) {
      setDisplayValue(getFormattedValue(value));
    }
  }, [value, isFocused, getFormattedValue]);


  // --- Handlers de Eventos ---

  const handleInputChange = (inputValue: string) => {
    setDisplayValue(inputValue);
    
    // Normaliza o valor para number (ex: "1.234,50" -> 1234.50)
    const numericValue = normalizeNumber(inputValue);
    onChange(numericValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Quando foca, mostra o valor numérico puro para edição
    if (value !== 0) {
      setDisplayValue(getPureNumericString(value));
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Quando perde o foco, formata para exibição
    setDisplayValue(getFormattedValue(value));
  };

  // --- Renderização ---

  // A **CORREÇÃO CRÍTICA** do erro anterior: uso de crases (template literals)
  // para permitir a interpolação do prop {className}.
  const inputClassNames = `
    h-full w-full 
    pl-10 sm:pl-12 pr-3 py-3 sm:py-3
    border border-gray-200 rounded-xl 
    focus:ring-2 focus:ring-red-600 focus:border-transparent 
    transition-all text-sm sm:text-base 
    ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'} 
    ${className}
  `.trim().replace(/\s+/g, ' '); // Limpa múltiplos espaços em branco

  return (
    <div className="relative">
      {/* Ícone DollarSign */}
      <DollarSign 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" 
      />
      
      {/* Input de Texto */}
      <input
        // Adicionando step="0.01" para melhorar a UX em dispositivos móveis
        type="text" 
        value={displayValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        // Aplica as classes CSS corrigidas
        className={inputClassNames}
      />
    </div>
  );
}
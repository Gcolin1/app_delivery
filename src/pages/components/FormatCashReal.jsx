import React from "react"

export const FormatCashReal = ({valor}) => {
    const formatoReal = valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    
      return <span>{formatoReal}</span>;
}
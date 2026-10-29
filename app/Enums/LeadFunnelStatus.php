<?php

namespace App\Enums;

enum LeadFunnelStatus: string
{
    case Novo = 'novo';
    case EmContato = 'em_contato';
    case AnaliseCredito = 'analise_credito';
    case Autorizado = 'autorizado';
    case ReciboEmitido = 'recibo_emitido';
    case Reembolsado = 'reembolsado';
    case Perdido = 'perdido';

    public function label(): string
    {
        return match ($this) {
            self::Novo => 'Novo',
            self::EmContato => 'Em contato',
            self::AnaliseCredito => 'Análise de crédito',
            self::Autorizado => 'Doação autorizada',
            self::ReciboEmitido => 'Recibo emitido',
            self::Reembolsado => 'Reembolsado',
            self::Perdido => 'Perdido',
        };
    }
}

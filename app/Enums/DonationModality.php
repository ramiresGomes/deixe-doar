<?php

namespace App\Enums;

enum DonationModality: string
{
    case DeixeDoarFinanciada = 'deixe_doar_financiada';
    case Tradicional = 'tradicional';

    public function label(): string
    {
        return match ($this) {
            self::DeixeDoarFinanciada => 'Deixe Doar (doação financiada)',
            self::Tradicional => 'Quero Doar Agora (doação dedutível tradicional)',
        };
    }
}

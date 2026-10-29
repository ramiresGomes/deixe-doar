<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case EmExecucao = 'em_execucao';
    case EmCaptacao = 'em_captacao';

    public function label(): string
    {
        return match ($this) {
            self::EmExecucao => 'Em execução',
            self::EmCaptacao => 'Em captação',
        };
    }
}

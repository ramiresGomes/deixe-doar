<?php

namespace App\Models;

use App\Enums\DonationModality;
use App\Enums\LeadFunnelStatus;
use Database\Factories\SimulationLeadFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'name', 'whatsapp', 'city', 'modality', 'informed_income', 'estimated_tax_due',
    'donation_potential', 'funnel_status', 'notes', 'source',
])]
class SimulationLead extends Model
{
    /** @use HasFactory<SimulationLeadFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'modality' => DonationModality::class,
            'funnel_status' => LeadFunnelStatus::class,
            'informed_income' => 'decimal:2',
            'estimated_tax_due' => 'decimal:2',
            'donation_potential' => 'decimal:2',
        ];
    }
}

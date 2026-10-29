<?php

namespace Database\Factories;

use App\Enums\DonationModality;
use App\Enums\LeadFunnelStatus;
use App\Models\SimulationLead;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SimulationLead>
 */
class SimulationLeadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $taxDue = fake()->randomFloat(2, 2_000, 60_000);

        return [
            'name' => fake()->optional()->name(),
            'whatsapp' => '349'.fake()->numerify('########'),
            'city' => fake()->randomElement(['Uberlândia', 'Patrocínio', 'Patos de Minas', 'Uberaba']),
            'modality' => fake()->randomElement(DonationModality::cases()),
            'informed_income' => fake()->randomFloat(2, 60_000, 400_000),
            'estimated_tax_due' => $taxDue,
            'donation_potential' => round($taxDue * 0.06, 2),
            'funnel_status' => LeadFunnelStatus::Novo,
            'notes' => null,
            'source' => 'simulador',
        ];
    }
}

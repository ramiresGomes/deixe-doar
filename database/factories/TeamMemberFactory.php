<?php

namespace Database\Factories;

use App\Models\TeamMember;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TeamMember>
 */
class TeamMemberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'stage_name' => fake()->firstName(),
            'real_name' => fake()->name(),
            'specialty' => fake()->jobTitle(),
            'bio' => fake()->sentence(15),
            'photo_path' => null,
            'sort_order' => 0,
        ];
    }
}

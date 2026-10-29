<?php

namespace Database\Factories;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Testimonial>
 */
class TestimonialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'quote' => fake()->sentence(14),
            'author' => fake()->name('female'),
            'role' => 'Diretora',
            'school' => 'E.E. '.fake()->lastName(),
            'city' => fake()->city(),
            'year' => fake()->numberBetween(2011, 2026),
            'source' => null,
            'sort_order' => 0,
        ];
    }
}

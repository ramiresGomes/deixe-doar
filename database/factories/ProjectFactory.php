<?php

namespace Database\Factories;

use App\Enums\ProjectStatus;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->unique()->sentence(3);

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'category' => fake()->randomElement(['Educação', 'Cultura', 'Inclusão', 'Lazer e Sustentabilidade']),
            'incentive_law' => null,
            'summary' => fake()->sentence(12),
            'description' => fake()->paragraphs(2, true),
            'image_path' => null,
            'funding_goal' => null,
            'funding_raised' => 0,
            'status' => ProjectStatus::EmExecucao,
            'started_year' => fake()->numberBetween(2006, 2026),
            'sort_order' => 0,
        ];
    }

    public function inFundraising(): static
    {
        return $this->state(fn (): array => ['status' => ProjectStatus::EmCaptacao]);
    }
}

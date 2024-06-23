<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tool>
 */
class ToolFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' =>$this->faker->randomElement(['pen', 'note', 'brochure', 'another thing']), // Adjust faker method as needed
            'description' => $this->faker->sentence,
            'type' => $this->faker->randomElement(['type1', 'type2', 'type3']),
            'user_id' => mt_rand(1, 10),
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'admin_id' => mt_rand(1, 5), // Assuming 'admin_id' relates to 'admins' table
            'user_id' => mt_rand(1, 10), // Assuming 'user_id' relates to 'users' table
            'total_units' => $this->faker->numberBetween(100, 1000),
            'unit_price' => $this->faker->randomFloat(2, 10, 100),
            'target_units' => $this->faker->numberBetween(50, 500),
            'unit_target_price' => $this->faker->randomFloat(2, 5, 50),
            'total_target_price' => $this->faker->randomFloat(2, 1000, 5000),
            'total_actual_price' => $this->faker->randomFloat(2, 1000, 5000),
            'product_name' => $this->faker->word,
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),

        ];
    }
}

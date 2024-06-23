<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Visit>
 */
class VisitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'visit_date' => $this->faker->date(),
            'visit_time' => $this->faker->time(),
            'purpose' => $this->faker->sentence(),
            'status' => $this->faker->randomElement(['ongoing', 'closed', 'done']),
            'user_id' => mt_rand(1, 10), // Adjust according to your user IDs
            'doctor_id' => mt_rand(1, 10), // Adjust according to your doctor IDs
            'location_id' => mt_rand(1, 5), // Adjust according to your location IDs
        ];
}}

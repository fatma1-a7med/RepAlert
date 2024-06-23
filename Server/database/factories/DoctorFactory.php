<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'city' => $this->faker->city,
            'state' => $this->faker->state,
            'street' => $this->faker->streetAddress,
            'territory' => $this->faker->country,
            'class_rate' => $this->faker->randomElement(['A', 'B', 'C']),
            'specialization' => $this->faker->randomElement(['Cardiology', 'Orthopedics', 'Pediatrics']),
            'phone_number' => $this->faker->phoneNumber,
        ];
    }
}

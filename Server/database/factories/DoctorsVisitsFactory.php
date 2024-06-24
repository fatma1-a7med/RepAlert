<?php

namespace Database\Factories;

use App\Models\DoctorVisit;
use Illuminate\Database\Eloquent\Factories\Factory;

class DoctorsVisitsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = DoctorVisit::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'doctor_id' => $this->faker->doctor_id,  
            'visit_id' => $this->faker->visit_id,   
            'created_at' => now(),
            'updated_at' => now(), 
        ];
    }
}

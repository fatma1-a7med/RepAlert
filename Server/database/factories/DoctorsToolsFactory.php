<?php

namespace Database\Factories;

use App\Models\DoctorTool;
use Illuminate\Database\Eloquent\Factories\Factory;

class DoctorsToolsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = DoctorTool::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'doctor_id' => $this->faker->doctor_id,  
            'tool_id' => $this->faker->tool_id,    
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

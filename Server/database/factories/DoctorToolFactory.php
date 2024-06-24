<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\DoctorTool;
use App\Models\Tool;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DoctorsTools>
 */
class DoctorToolFactory extends Factory
{
    protected $model = DoctorTool::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'doctor_id' => Doctor::factory(),
            'tool_id' => Tool::factory(),
        ];
    }
}

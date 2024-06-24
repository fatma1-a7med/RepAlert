<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\DoctorVisit;
use App\Models\Visit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DoctorsTools>
 */
class DoctorvisitFactory extends Factory
{
    protected $model = DoctorVisit::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'doctor_id' => Doctor::factory(),  // Assuming you have a Doctor factory
            'visit_id' => Visit::factory(),    // Assuming you have a Visit factory
        ];
    }
}

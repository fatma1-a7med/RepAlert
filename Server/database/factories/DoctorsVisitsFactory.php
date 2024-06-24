<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\DoctorVisit;
use App\Models\Visit;
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
            'doctor_id' => Doctor::factory(),  // Assuming you have a Doctor factory
            'visit_id' => Visit::factory(),    // Assuming you have a Visit factory
        ];
    }
}

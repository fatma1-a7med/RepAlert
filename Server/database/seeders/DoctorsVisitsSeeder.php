<?php

namespace Database\Seeders;

use App\Models\DoctorVisit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DoctorsVisitsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DoctorVisit::factory()
        ->count(10) 
        ->create();
    }
}

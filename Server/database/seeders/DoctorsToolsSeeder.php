<?php

namespace Database\Seeders;

use App\Models\DoctorTool;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DoctorsToolsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DoctorTool::factory()
        ->count(10) 
        ->create();
    }
}

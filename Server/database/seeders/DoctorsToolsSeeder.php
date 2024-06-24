<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DoctorsTools;
use App\Models\DoctorTool;

class DoctorsToolsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DoctorTool::factory()->count(10)->create();
    }
}

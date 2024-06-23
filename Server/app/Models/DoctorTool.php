<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class DoctorTool extends Pivot
{
    protected $table = 'doctors_tools';

    protected $fillable = [
        'doctor_id',
        'tool_id'
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function tool()
    {
        return $this->belongsTo(Tool::class);
    }
}

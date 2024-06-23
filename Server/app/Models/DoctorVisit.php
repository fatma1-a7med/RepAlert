<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class DoctorVisit extends Pivot
{
    protected $table = 'doctors_visits';

    protected $fillable = [
        'doctor_id',
        'visit_id'
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function visit()
    {
        return $this->belongsTo(Visit::class);
    }
}

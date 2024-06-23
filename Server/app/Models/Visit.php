<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    use HasFactory;

    protected $fillable = [
        'visit_date',
        'visit_time',
        'purpose',
        'status',
        'user_id',
        'location_id',
    ];

    public function doctors()
    {
        return $this->belongsToMany(Doctor::class, 'doctors_visits');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}

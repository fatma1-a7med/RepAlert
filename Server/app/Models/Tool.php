<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tool extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'type',
        'user_id',
    ];

    public function doctors()
    {
        return $this->belongsToMany(Doctor::class, 'doctors_tools');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

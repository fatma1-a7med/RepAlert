<?php



namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'city',
        'state',
        'street',
        'phone_number',
        'territory',
        'specialization',
        'class_rate'
    ];

    public function visits()
    {
        return $this->hasMany(Visit::class);
    }

    public function tools()
    {
        return $this->belongsToMany(Tool::class, 'doctors_tools');
    }
}

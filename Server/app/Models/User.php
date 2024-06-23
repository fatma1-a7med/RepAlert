<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Visit;
class User extends Authenticatable implements CanResetPassword
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'state',
        'city',
        'street',
        'gender',
        'birthDate',
        'location_id',
        'admin_id',
        'phone_number',
        'territory',
        'image',
        'email',
        'password',
    ];

     // Define the one-to-many relationship with Sale
     public function sales()
     {
         return $this->hasMany(Sale::class, 'user_id', 'id');
     }

     public function visits()
     {
         return $this->hasMany(Visit::class);
     }

     public function locations()
    {
        return $this->hasMany(Location::class);
    }
 
     

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

  

}

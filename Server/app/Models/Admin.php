<?php

namespace App\Models;

use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable implements CanResetPassword
{
    use HasApiTokens, HasFactory,Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'state',
        'city',
        'street',
        'phone_number',
        'territory',
        'image',
        'remember_token'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Define the one-to-many relationship with Sale
    public function sales()
    {
        return $this->hasMany(Sale::class, 'admin_id', 'id');
    }
    
    public function getEmailForPasswordReset()
    {
        return $this->email;
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new \App\Notifications\ResetAdminPassword($token));
    }
}

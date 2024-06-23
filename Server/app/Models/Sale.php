<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $primaryKey = 'sales_id';

    protected $fillable = [
        'admin_id',
        'user_id',
        'total_units',
        'unit_price',
        'target_units',
        'unit_target_price',
        'total_target_price',
        'total_actual_price',
        'product_name',
        'start_date',
        'end_date',
    ];

    // Define the inverse relationship with Admin
    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id', 'id');
    }

    // Define the inverse relationship with User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}


<?php

namespace App\Http\Controllers\Users_Controllers;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class salesController extends Controller
{
    public function index()
    {
        
        $user = Auth::user();
        $sales = Sale::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();

        return response()->json(['sales' => $sales], 200);
    }

    public function show($id)
    {
        $user = Auth::user();
        
        // Fetch sale with the given ID and user_id
        $sale = Sale::where('user_id', $user->id)->where('sales_id', $id)->first();

        if (!$sale) {
            return response()->json(['error' => 'Sale not found'], 404);
        }

        return response()->json(['sale' => $sale], 200);
    }
}

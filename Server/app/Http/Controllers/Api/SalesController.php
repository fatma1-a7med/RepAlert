<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class SalesController extends Controller
{
    // Display a listing of the resource
    public function index()
    {
        $sales = Sale::all();
        return response()->json($sales);
    }

    // Store a newly created resource in storage
    public function store(Request $request)
    {
        $request->validate([
            // 'admin_id' => 'required|exists:admins,id',
            'user_id' => 'required|exists:users,id',
            'total_units' => 'required|integer',
            'unit_price' => 'required|numeric',
            'target_units' => 'required|integer',
            'unit_target_price' => 'required|numeric',
            'total_target_price' => 'required|numeric',
            'total_actual_price' => 'required|numeric',
            'product_name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

 
    
        $sale = Sale::create([
            'admin_id' => $user->id, 
            'user_id' => $request->user_id,
            'total_units' => $request->total_units,
            'unit_price' => $request->unit_price,
            'target_units' => $request->target_units,
            'unit_target_price' => $request->unit_target_price,
            'total_target_price' => $request->total_target_price,
            'total_actual_price' => $request->total_actual_price,
            'product_name' => $request->product_name,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return response()->json($sale, 201);

    }

    // Display the specified resource
    public function show(Sale $sale)
    {
        return response()->json($sale);
    }

    // Update the specified resource in storage
    public function update(Request $request, Sale $sale)
    {
        $request->validate([
            // 'admin_id' => 'required|exists:admins,id',
            'user_id' => 'required|exists:users,id',
            'total_units' => 'required|integer',
            'unit_price' => 'required|numeric',
            'target_units' => 'required|integer',
            'unit_target_price' => 'required|numeric',
            'total_target_price' => 'required|numeric',
            'total_actual_price' => 'required|numeric',
            'product_name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $sale->update([
            'admin_id' => $user->id, 
            'user_id' => $request->user_id,
            'total_units' => $request->total_units,
            'unit_price' => $request->unit_price,
            'target_units' => $request->target_units,
            'unit_target_price' => $request->unit_target_price,
            'total_target_price' => $request->total_target_price,
            'total_actual_price' => $request->total_actual_price,
            'product_name' => $request->product_name,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return response()->json($sale);
    }

    // Remove the specified resource from storage
    public function destroy(Sale $sale)
    {
        $sale->delete();

        return response()->json(null, 204);
    }
    public function user_sales($userId)
{
    $sales = Sale::where('user_id', $userId)->get();

    return response()->json($sales);
}

// Fetch all users
public function getUsers()
{
   $user = Auth::guard('sanctum')->user();

    if (!$user) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Assuming that the 'users' table has an 'admin_id' column
    $users = User::where('admin_id', $user->id)->get();

    return response()->json($users);
}

public function getUserInfo($userId)
{
    $user = User::find($userId);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Optionally, you can return specific user fields as needed
    $userData = [
        'id' => $user->id,
        'first_name' => $user->first_name,
        'last_name' => $user->last_name,
        'email' => $user->email,
        // Add more fields as required
    ];

    return response()->json($userData);
}

}


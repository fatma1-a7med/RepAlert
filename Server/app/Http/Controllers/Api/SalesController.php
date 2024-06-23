<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;

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
            'admin_id' => 'required|exists:admins,id',
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

        $sale = Sale::create($request->all());

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
            'admin_id' => 'required|exists:admins,id',
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

        $sale->update($request->all());

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
}


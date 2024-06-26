<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LocationRequest;
use App\Models\Location;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoctionController extends Controller
{
  
public function index()
{
    // Retrieve the authenticated admin
    $admin = Auth::guard('sanctum')->user();

    if (!$admin) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Retrieve locations associated with the authenticated admin
    $locations = Location::where('admin_id', $admin->id)
                    ->latest()
                    ->get();

    // Retrieve users to map user names
    $users = User::all()->keyBy('id');

    // Map locations to include admin and user names
    $locations = $locations->map(function ($location) use ($users) {
        $location['first_name'] = $users[$location->user_id]->first_name;
        $location['last_name'] = $users[$location->user_id]->last_name;
        return $location;
    });

    return response()->json($locations);
}


    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);
        $user = Auth::guard('sanctum')->user();

        // Check if the authenticated user is an admin
        if (!$user ) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $adminId = $user->admin_id;

        // Remove old location for the user
        Location::where('user_id', $request->user_id)->delete();

        // Save the new location
        $location = Location::create(array_merge($request->all(), ['admin_id' => $adminId]));

        return response()->json($location, 201);
    }
}

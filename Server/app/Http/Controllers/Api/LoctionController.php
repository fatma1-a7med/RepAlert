<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LocationRequest;
use App\Models\Location;
use App\Models\User;
use Illuminate\Http\Request;

class LoctionController extends Controller
{
    public function index()
    {
        $locations = Location::latest()->get(); 
        $users = User::all()->keyBy('id'); 
        // Map locations to include user name
        $locations = $locations->map(function ($location) use ($users) {
            $location['first_name'] = $users[$location->user_id]->first_name;
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

        $location = Location::create($request->all());

        return response()->json($location, 201);
    }
}

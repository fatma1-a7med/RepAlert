<?php

namespace App\Http\Controllers\Users_Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Visit;
use App\Models\Doctor;
use App\Models\Tool;
use Illuminate\Support\Facades\Auth;

class UserVisitController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $visits = Visit::with(['doctor', 'tools', 'user'])->where('user_id', $user->id)->get();
        return response()->json($visits);
    }

    public function show($id)
    {
        $user = Auth::user();
        $visit = Visit::with(['doctor', 'tools', 'user'])->where('user_id', $user->id)->find($id);
        if ($visit) {
            return response()->json($visit);
        } else {
            return response()->json(['message' => 'Visit not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $validatedData = $request->validate([
            //'user_id' => 'required|integer|exists:users,id',
            'doctor_id' => 'required|integer|exists:doctors,id',
            'visit_date' => 'required|date',
            'visit_time' => 'required',
            'purpose' => 'required|string',
            'location_id' => 'nullable',
            'status' => 'required|string|in:ongoing,closed,done',
            'tools' => 'nullable|array',
            'tools.*' => 'integer|exists:tools,id',
        ]);
        $validatedData['user_id'] = $user->id;  
        $visit = Visit::create($validatedData);
        $visit->tools()->attach($request->tools);

        return response()->json($visit->load('doctor', 'tools', 'user'), 201);
    }

    public function update(Request $request, $id)
    {
        $visit = Visit::findOrFail($id);

        $validatedData = $request->validate([
           // 'user_id' => 'integer|exists:users,id',
            'doctor_id' => 'integer|exists:doctors,id',
            'visit_date' => 'required|date',
            'visit_time' => 'required',
            'purpose' => 'required|string',
            'status' => 'required|string|in:ongoing,closed,done',
            'tools' => 'array',
            'tools.*' => 'integer|exists:tools,id',
        ]);

        $visit->update($validatedData);

        if ($request->has('tools')) {
            $visit->tools()->sync($request->tools);
        }

        return response()->json($visit->load('doctor', 'tools', 'user'), 200);
    }

    public function delete($id)
    {
        $visit = Visit::findOrFail($id);
        $visit->delete();

        return response()->json(null, 204);
    }
}

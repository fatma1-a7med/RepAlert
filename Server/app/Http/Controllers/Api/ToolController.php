<?php

namespace App\Http\Controllers;

use App\Models\Tool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ToolController extends Controller
{
    /**
     * Display a listing of the tools.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
       // Get all tools
       $tools = Tool::all();
       return response()->json($tools);
    }

    /**
     * Store a newly created tool in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate and create a new tool
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|max:255',
        ]);

        $tool = Tool::create([
            'user_id' => Auth::id(),
            'name' => $validatedData['name'],
            'description' => $validatedData['description'] ?? null,
            'type' => $validatedData['type'],
        ]);

        return response()->json($tool, 201);
    }

    /**
     * Display the specified tool.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        // Get a single tool by ID
        $tool = Tool::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        return response()->json($tool);
    }

    /**
     * Update the specified tool in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        // Validate and update the tool
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'sometimes|required|string|max:255',
        ]);

        $tool = Tool::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        $tool->update($validatedData);

        return response()->json($tool);
    }

    /**
     * Remove the specified tool from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        // Find and delete the tool
        $tool = Tool::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        $tool->delete();

        return response()->json(['message' => 'Tool deleted successfully']);
    }
}


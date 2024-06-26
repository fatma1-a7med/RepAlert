<?php
// AdminProfileController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Admin;

class AdminProfileController extends Controller
{

    function index() {
        $admin = Admin::all();
        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Admin profile not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $admin
        ]);
        
    }

    
    public function show($id)
    {
        // Example: Fetching admin profile without authentication
        $admin = Admin::find($id); // Fetch the admin profile based on the provided ID

        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Admin profile not found'
            ], 404);
        }

        return response()->json($admin);
    }

    public function update(Request $request, $id)
    {
        // Fetch the first admin
        $admin = Admin::find($id);
        // Check if admin exists
        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Admin profile not found'
            ], 404);
        }

        // Validation rules
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15',
            'territory' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email,' . $admin->id,
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validation rule for image
        ]);

        // If validation fails
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 400);
        }

        // Initialize validated data
        $validatedData = $request->all();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Get the uploaded image file
            $image = $request->file('image');

            // Generate a unique name for the image
            $imageName = time() . '.' . $image->getClientOriginalExtension();
 
            // Store the image file in the public/images directory
            $image->move(public_path('images'), $imageName);

            // Store the image path in the validated data array
            $validatedData['image'] = $imageName;

            // Delete the old image if it exists
            if ($admin->image) {
                $oldImagePath = public_path($admin->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }
        }

        // Update the admin profile with the validated data
        $admin->update($validatedData);

        return response()->json([
            'success' => true,
            'data' => $admin
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\consol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserCreated;
use App\Http\Controllers\Admin;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Get all users
        $users = User::all();
        return response()->json($users);

        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate and create a new user
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'gender' => 'nullable|string|in:Male,Female|max:50',
            'birthDate' => 'nullable|date',
            'admin_id' => 'nullable|integer',
            'phone_number' => 'required|string|max:20',
            'territory' => 'required|string|max:255',
            'image' => 'nullable|file|max:1024',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
    
// Check if the request contains an image file
if ($request->hasFile('image')) {
    // Get the uploaded image file
    $image = $request->file('image');

        // Generate a unique name for the image
           $imageName = time() . '.' . $image->getClientOriginalExtension();

         // Store the image file in the public/images directory
        $image->move(public_path('images'), $imageName);

      // Store the image path in the validated data array
       $validatedData['image'] = $imageName;
    }
    
        // Create the user with the validated data
        $user = User::create($validatedData);


         // Send email to the newly created user
         Mail::to($user->email)->send(new UserCreated($user));
    
         return response()->json([
             'status' => true,
             'message' => 'User Created Successfully',
             'user' => $user,
             'token' => $user->createToken("API_TOKEN")->plainTextToken
         ], 200);
    
        // Append the full URL of the image to the response
        // $user->image_url = asset('storage/images/' . $imageName);
    
        // Return a JSON response with a success message
        // return response()->json(['message' => 'User created successfully', 'data' => $user], 201);
    }
    
    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        // Get a single user by ID
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function update(Request $request, $id)
{
    // Validate the data
    $validatedData = $request->validate([
        'first_name' => 'sometimes|required|string|max:255',
        'last_name' => 'sometimes|required|string|max:255',
        'state' => 'sometimes|required|string|max:255',
        'city' => 'sometimes|required|string|max:255',
        'street' => 'sometimes|required|string|max:255',
        'gender' => 'nullable|string|in:Male,Female|max:50',
        'birthDate' => 'nullable|date',
        'admin_id' => 'nullable|integer',
        'phone_number' => 'sometimes|required|string|max:20',
        'territory' => 'sometimes|required|string|max:255',
        'image' => 'nullable|file|max:1024',
        'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
        'password' => 'sometimes|required|string|min:8',
    ]);

    // Find the user by ID
    $user = User::findOrFail($id);

// Check if the request contains an image file
if ($request->hasFile('image')) {
    // Get the uploaded image file
    $image = $request->file('image');

    // Generate a unique name for the image
    $imageName = time() . '.' . $image->getClientOriginalExtension();

    // Store the image file in the public/images directory
    $image->move(public_path('images'), $imageName);

    // Store the image path in the validated data array
    $validatedData['image'] = $imageName;
}

    // Update the user with the validated data
    $user->update($validatedData);
   // Retrieve the updated user instance
   $updatedUser = User::findOrFail($id);




    // Return the updated user
    return response()->json($updatedUser, 200);
}


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        // Find the user
        $user = User::find($id);
            // Check if the user exists
    if (!$user) {
        // Return a JSON response indicating the user has already been deleted
        return response()->json(['message' => 'User has already been deleted'], 200);
    }
        // Delete the user
        $user->delete();
        // Return a JSON response with a success message
        return response()->json(['message' => 'User has been deleted successfully'], 200);
    }
    
}
